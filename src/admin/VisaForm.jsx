import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVisaCountry, createVisaCountry, updateVisaCountry, uploadImage } from '../api';
import { useToast } from '../context/ToastContext';

const VisaForm = () => {
    const { toast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const fileInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        flag: '',
        brief: '',
        requirements: [''],
        images: [''],
        status: 'active'
    });
    
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [uploadingFlag, setUploadingFlag] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchCountryDetails();
        }
    }, [id]);

    const fetchCountryDetails = async () => {
        try {
            setLoading(false); // Optimistic, but actually we set it true initially
            const response = await getVisaCountry(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching country:', error);
            toast.error('Failed to load country details.');
        } finally {
            setLoading(false);
        }
    };

    const slugify = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            // Auto-generate slug (id) from name if we're creating a new entry
            if (name === 'name' && !isEdit) {
                updated.id = slugify(value);
            }
            return updated;
        });
    };

    const handleArrayChange = (index, value, field) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeArrayItem = (index, field) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const handleFlagUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingFlag(true);
            const data = await uploadImage(file);
            setFormData(prev => ({ ...prev, flag: data.url }));
            toast.success('Flag uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Image upload failed. Please try again.');
        } finally {
            setUploadingFlag(false);
        }
    };

    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            setUploadingGallery(true);
            const uploadPromises = files.map(file => uploadImage(file));
            const results = await Promise.all(uploadPromises);
            const newUrls = results.map(res => res.url);
            
            setFormData(prev => ({
                ...prev,
                images: [...prev.images.filter(url => url !== ''), ...newUrls]
            }));
            toast.success(`Successfully uploaded ${newUrls.length} images.`);
        } catch (error) {
            console.error('Gallery upload failed:', error);
            toast.error('Some images failed to upload.');
        } finally {
            setUploadingGallery(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a copy of data for submission to ensure latest values and avoid state mutation issues
        const submissionData = {
            ...formData,
            requirements: formData.requirements.filter(r => r.trim() !== ''),
            images: formData.images.filter(i => i.trim() !== '')
        };

        // Validation
        if (!submissionData.name || !submissionData.flag) {
            return toast.error('Please fill in Country Name and Flag Image.', 'Missing Fields');
        }

        // Ensure ID (slug) is present
        // If it's a new entry OR if the existing entry somehow has an empty/null ID
        if (!submissionData.id || submissionData.id.trim() === '') {
            submissionData.id = slugify(submissionData.name);
        }

        // Final Slug Validation
        if (!submissionData.id) {
            return toast.error('Could not generate a valid URL slug from the Country Name.', 'Slug Error');
        }

        try {
            setSaving(true);
            if (isEdit) {
                await updateVisaCountry(id, submissionData);
                toast.success('Visa requirements updated successfully!');
            } else {
                await createVisaCountry(submissionData);
                toast.success('New country added successfully!');
            }
            setTimeout(() => navigate('/admin/visa'), 1500);
        } catch (error) {
            console.error('Error saving country:', error);
            const serverMessage = error.response?.data?.message || '';
            
            if (serverMessage.includes('E11000') || serverMessage.includes('duplicate key')) {
                toast.error('A country with this name or slug already exists.', 'Duplicate Error');
            } else {
                toast.error(serverMessage || 'Failed to save requirements.', 'Save Error');
            }
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <div className="admin-loading">Loading...</div>;

    return (
        <div className="admin-page-content">
            <div className="admin-card">
                <div className="admin-card-header">
                    <div className="admin-card-title">
                        <i className={isEdit ? "fas fa-edit" : "fas fa-plus"}></i>
                        <h3>{isEdit ? `Edit ${formData.name} Requirements` : 'Add New Country Requirements'}</h3>
                    </div>
                    <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/visa')}>
                        <i className="fas fa-arrow-left"></i> Back to List
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Display Priority (Lower = First)</label>
                            <input 
                                type="number" 
                                name="priority" 
                                value={formData.priority || 0} 
                                onChange={handleChange} 
                                className="admin-input"
                                placeholder="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Country Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                className="admin-input"
                                placeholder="e.g. United Kingdom"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Flag / Representative Image</label>
                        <div className="image-upload-wrapper">
                            <div className="image-preview-circle">
                                {formData.flag ? (
                                    <img src={formData.flag} alt="Flag" />
                                ) : (
                                    <i className="fas fa-flag"></i>
                                )}
                            </div>
                            <div className="upload-controls">
                                <input 
                                    type="text" 
                                    name="flag" 
                                    value={formData.flag} 
                                    onChange={handleChange} 
                                    required 
                                    className="admin-input"
                                    placeholder="Upload or enter URL"
                                />
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    style={{ display: 'none' }} 
                                    onChange={handleFlagUpload}
                                    accept="image/*"
                                />
                                <button 
                                    type="button" 
                                    className="admin-btn admin-btn-outline" 
                                    onClick={() => fileInputRef.current.click()}
                                    disabled={uploadingFlag}
                                >
                                    {uploadingFlag ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-upload"></i>}
                                    {uploadingFlag ? ' Uploading...' : ' Upload Image'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Brief Overview</label>
                        <textarea 
                            name="brief" 
                            value={formData.brief} 
                            onChange={handleChange} 
                            rows="3" 
                            className="admin-textarea"
                            placeholder="A short description specifically for this country's visa page..."
                        ></textarea>
                    </div>

                    <div className="form-section">
                        <div className="section-header-compact">
                            <h4><i className="fas fa-list-check"></i> Visa Requirements</h4>
                            <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => addArrayItem('requirements')}>
                                <i className="fas fa-plus"></i> Add Item
                            </button>
                        </div>
                        <div className="array-list">
                            {formData.requirements.map((req, index) => (
                                <div key={index} className="array-item">
                                    <div className="item-index">{index + 1}</div>
                                    <input 
                                        type="text" 
                                        value={req} 
                                        onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')} 
                                        className="admin-input"
                                        placeholder={`Requirement ${index + 1}`}
                                    />
                                    <button 
                                        type="button" 
                                        className="item-delete-btn" 
                                        onClick={() => removeArrayItem(index, 'requirements')}
                                        disabled={formData.requirements.length === 1}
                                    >
                                        <i className="fas fa-trash-can"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-header-compact">
                            <h4><i className="fas fa-images"></i> Image Gallery</h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input 
                                    type="file" 
                                    ref={galleryInputRef}
                                    multiple
                                    style={{ display: 'none' }} 
                                    onChange={handleGalleryUpload}
                                    accept="image/*"
                                />
                                <button 
                                    type="button" 
                                    className="admin-btn admin-btn-sm admin-btn-outline" 
                                    onClick={() => galleryInputRef.current.click()}
                                    disabled={uploadingGallery}
                                >
                                    {uploadingGallery ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-upload"></i>}
                                    {uploadingGallery ? ' Uploading...' : ' Multi Upload'}
                                </button>
                                <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => addArrayItem('images')}>
                                    <i className="fas fa-plus"></i> Add URL
                                </button>
                            </div>
                        </div>
                        <div className="gallery-grid-editor">
                            {formData.images.map((img, index) => (
                                <div key={index} className="gallery-item-editor">
                                    <div className="gallery-preview">
                                        {img ? (
                                            <img src={img} alt={`Gallery ${index}`} onError={(e) => e.target.src='https://placehold.co/100x100?text=Invalid'} />
                                        ) : (
                                            <div className="no-image-placeholder"><i className="fas fa-image"></i></div>
                                        )}
                                        <button 
                                            type="button" 
                                            className="gallery-remove-btn"
                                            onClick={() => removeArrayItem(index, 'images')}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        value={img} 
                                        onChange={(e) => handleArrayChange(index, e.target.value, 'images')} 
                                        className="admin-input admin-input-sm"
                                        placeholder="Image URL"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Visibility Status</label>
                        <select 
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} 
                            className="admin-select"
                        >
                            <option value="active">Active (Visible to Clients)</option>
                            <option value="hidden">Hidden from Web</option>
                        </select>
                    </div>

                    <div className="admin-form-actions">
                        <button type="submit" className="admin-btn admin-btn-primary admin-btn-lg" disabled={saving}>
                            {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                            {saving ? ' Saving...' : (isEdit ? ' Update Visa Requirements' : ' Save Visa Requirements')}
                        </button>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default VisaForm;
