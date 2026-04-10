import React, { useState, useEffect } from 'react';
import api, { uploadImage } from '../api';
import DestinationForm from './DestinationForm';
import PackageForm from './PackageForm';
import ServiceForm from './ServiceForm';
import TeamForm from './TeamForm';
import { useToast } from '../context/ToastContext';

const AdminEditor = ({ type, title }) => {
    const { toast } = useToast();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchData();
    }, [type]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/${type}`);
            setItems(response.data);
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
            toast.error(`Failed to load ${title}. Please refresh.`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        let newItem = {};
        if (type === 'destinations') {
            newItem = {
                name: '',
                country: '',
                image: '',
                tagline: '',
                description: '',
                highlights: [],
                status: 'active'
            };
        } else if (type === 'packages') {
            newItem = {
                title: '',
                duration: '',
                image: '',
                description: '',
                price: '',
                isEnquiryOnly: false,
                inclusions: [],
                categoryTag: '',
                status: 'active'
            };
        } else if (type === 'services') {
            newItem = {
                title: '',
                subtitle: '',
                image: '',
                description: '',
                features: [],
                icon: 'fa-concierge-bell',
                status: 'active'
            };
        } else if (type === 'team') {
            newItem = {
                name: '',
                role: '',
                image: '',
                bio: '',
                order: 0,
                facebook: '',
                instagram: ''
            };
        } else {
            newItem = {
                title: '',
                name: '',
                description: '',
                content: '',
                image: '',
                img: '',
                location: '',
                price: ''
            };
        }
        setEditingItem(newItem);
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        
        // --- 1. Client Side Validation Check ---
        const titleOrName = editingItem.title || editingItem.name;
        const hasImage = editingItem.image || editingItem.img;
        const hasDescription = editingItem.description || editingItem.content;

        if (!titleOrName || !hasImage || !hasDescription) {
            let missing = [];
            if (!titleOrName) missing.push(type === 'destinations' || type === 'team' ? 'Name' : 'Title');
            if (!hasImage) missing.push('Image');
            if (!hasDescription) missing.push('Description');
            
            return toast.error(`Missing Required Fields: ${missing.join(', ')}`, 'Validation Error');
        }

        try {
            const isNew = !editingItem._id;
            
            if (isNew) {
                await api.post(`/${type}`, editingItem);
                toast.success(`${title} item created successfully!`);
            } else {
                await api.put(`/${type}/${editingItem._id}`, editingItem);
                toast.success(`${title} item updated successfully!`);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            fetchData();
        } catch (error) {
            console.error(`Error saving ${type}:`, error);
            
            // --- 2. Improved Server Error Reporting ---
            const serverMessage = error.response?.data?.message || '';
            const status = error.response?.status;
            
            if (status === 400) {
                toast.error(serverMessage || 'Please check that all fields are correct.', 'Validation Error');
            } else {
                toast.error(serverMessage || 'Failed to save changes.', 'Server Error');
            }
        }
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        
        try {
            setIsDeleting(true);
            await api.delete(`/${type}/${itemToDelete._id}`);
            setItemToDelete(null);
            toast.success('Item deleted successfully!');
            fetchData();
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            toast.error('Failed to delete item. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const data = await uploadImage(file);
            setEditingItem(prev => ({
                ...prev,
                image: data.url,
                img: data.url
            }));
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Image upload failed. Check Cloudinary settings.');
        } finally {
            setUploading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingItem(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div className="admin-loading">Loading {title}...</div>;

    return (
        <div className="admin-editor">
            <div className="admin-card">
                <div className="admin-card-header">
                    <div className="admin-card-header-main">
                        <h3>
                            <i className="fas fa-list"></i>
                            Manage {title}
                        </h3>
                        {type === 'destinations' && (
                            <p className="admin-header-help">Create and edit travel destinations that appear on the Destinations page. You can add highlights and specific gallery images.</p>
                        )}
                        {type === 'packages' && (
                            <p className="admin-header-help">Configure travel packages with pricing, duration, and inclusions. Tag them appropriately for easy filtering.</p>
                        )}
                        {type === 'services' && (
                            <p className="admin-header-help">Manage various travel services offered. You can set icons and detailed descriptions for each service.</p>
                        )}
                        {type === 'team' && (
                            <p className="admin-header-help">Maintain your core team profiles. These appear in the About Us and Team sections.</p>
                        )}
                    </div>
                    <button className="admin-btn admin-btn-primary" onClick={handleAddNew}>
                        <i className="fas fa-plus"></i> Add New
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="admin-empty-state">
                        <i className="fas fa-inbox"></i>
                        <p>No {title.toLowerCase()} found. Click "Add New" to get started.</p>
                    </div>
                ) : (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>{type === 'team' ? 'Name / Role' : 'Title / Name'}</th>
                                    <th>Priority</th>
                                    {(type === 'destinations' || type === 'packages' || type === 'services') && <th>Status</th>}
                                    {type === 'packages' && <th>Duration</th>}
                                    {type === 'packages' && <th>Price</th>}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item._id || item._id}>
                                        <td>
                                            <img 
                                                src={item.image || item.img || item.photoUrl} 
                                                alt="" 
                                                className="admin-cell-img"
                                                onError={(e) => e.target.src='https://placehold.co/60x40/f4f6fb/94a3b8?text=No+Img'}
                                            />
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600', color: '#1e293b' }}>{item.title || item.name}</div>
                                            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                                                {(item.subtitle || item.categoryTag || item.tagline || item.country || item.role || item.location || '')}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="priority-badge">{item.priority || 0}</span>
                                        </td>
                                        {(type === 'destinations' || type === 'packages' || type === 'services') && (
                                            <td>
                                                <span className={`admin-status-badge ${item.status || 'active'}`}>
                                                    {item.status || 'active'}
                                                </span>
                                            </td>
                                        )}
                                        {type === 'packages' && <td style={{ color: '#64748b' }}>{item.duration || 'N/A'}</td>}
                                        {type === 'packages' && (
                                            <td style={{ fontWeight: '600' }}>
                                                {item.isEnquiryOnly ? (
                                                    <span style={{ color: '#f59e0b', fontSize: '0.82rem' }}>Enquiry</span>
                                                ) : (
                                                    item.price || 'N/A'
                                                )}
                                            </td>
                                        )}
                                        <td>
                                            <div className="admin-actions">
                                                <button 
                                                    className="admin-btn admin-btn-secondary"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <i className="fas fa-pen-to-square"></i> Edit
                                                </button>
                                                <button 
                                                    className="admin-btn admin-btn-danger"
                                                    onClick={() => handleDeleteClick(item)}
                                                    disabled={type === 'services' && (item._id === 'visa' || (item.title && item.title.toLowerCase().includes('visa')))}
                                                    title={type === 'services' && (item._id === 'visa' || (item.title && item.title.toLowerCase().includes('visa'))) ? "System Service: This service manages Country Visa Requirements and cannot be deleted." : "Delete"}
                                                    style={type === 'services' && (item._id === 'visa' || (item.title && item.title.toLowerCase().includes('visa'))) ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                                >
                                                    <i className="fas fa-trash-can"></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
                    <div className="admin-modal" style={{ maxWidth: '720px', width: '90%' }}>
                        <div className="admin-modal-header">
                            <h3>
                                <i className={`fas ${editingItem._id ? 'fa-pen-to-square' : 'fa-plus-circle'}`}></i>
                                {editingItem._id ? 'Edit' : 'Add'} {title} Item
                            </h3>
                            <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                                <i className="fas fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="admin-modal-body">
                                {type === 'destinations' ? (
                                    <DestinationForm 
                                        item={editingItem}
                                        onChange={handleInputChange}
                                        onFileChange={handleFileChange}
                                        uploading={uploading}
                                    />
                                ) : type === 'packages' ? (
                                    <PackageForm 
                                        item={editingItem}
                                        onChange={handleInputChange}
                                        onFileChange={handleFileChange}
                                        uploading={uploading}
                                    />
                                ) : type === 'services' ? (
                                    <ServiceForm 
                                        item={editingItem}
                                        onChange={handleInputChange}
                                        onFileChange={handleFileChange}
                                        uploading={uploading}
                                    />
                                ) : type === 'team' ? (
                                    <TeamForm 
                                        item={editingItem}
                                        onChange={handleInputChange}
                                        onFileChange={handleFileChange}
                                        uploading={uploading}
                                    />
                                ) : (
                                    <>
                                        {/* Default Form for other types */}
                                        <div className="admin-form-group">
                                            <label><i className="fas fa-heading"></i> Title / Name</label>
                                            <input 
                                                className="admin-input"
                                                name={editingItem.hasOwnProperty('title') ? 'title' : 'name'}
                                                value={editingItem.title || editingItem.name || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="admin-form-group">
                                            <label><i className="fas fa-align-left"></i> Description</label>
                                            <textarea 
                                                className="admin-textarea"
                                                name={editingItem.hasOwnProperty('description') ? 'description' : 'content'}
                                                value={editingItem.description || editingItem.content || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="admin-form-group">
                                            <label><i className="fas fa-image"></i> Photo</label>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                                                <img 
                                                    src={editingItem.image || editingItem.img} 
                                                    alt="Preview" 
                                                    style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e8ecf1' }}
                                                    onError={(e) => e.target.src='https://placehold.co/80x50/f4f6fb/94a3b8?text=No+Img'}
                                                />
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    disabled={uploading}
                                                    style={{ fontSize: '0.82rem' }}
                                                />
                                            </div>
                                            <input 
                                                className="admin-input"
                                                name={editingItem.hasOwnProperty('image') ? 'image' : 'img'}
                                                value={editingItem.image || editingItem.img || ''}
                                                onChange={handleInputChange}
                                                placeholder="Or paste image URL"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsModalOpen(false)}>
                                    <i className="fas fa-xmark"></i> Cancel
                                </button>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                                    {uploading ? (
                                        <><i className="fas fa-circle-notch fa-spin"></i> Uploading...</>
                                    ) : (
                                        <><i className="fas fa-check"></i> Save Changes</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {itemToDelete && (
                <div className="admin-modal-overlay" onClick={() => setItemToDelete(null)}>
                    <div className="admin-modal" style={{ maxWidth: '450px', width: '90%', animation: 'modalSlideIn 0.3s ease-out' }}>
                        <div className="admin-modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
                            <div style={{ 
                                width: '70px', 
                                height: '70px', 
                                background: '#fee2e2', 
                                color: '#ef4444', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                margin: '0 auto 20px',
                                fontSize: '1.8rem'
                            }}>
                                <i className="fas fa-trash-can"></i>
                            </div>
                            
                            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '10px' }}>
                                Confirm Deletion
                            </h3>
                            
                            <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '30px' }}>
                                Are you sure you want to delete <strong style={{ color: '#1e293b' }}>"{itemToDelete.title || itemToDelete.name}"</strong>? 
                                <br />
                                <span style={{ color: '#f59e0b', fontSize: '0.82rem', fontWeight: '500' }}>
                                    <i className="fas fa-triangle-exclamation" style={{ marginRight: '6px' }}></i>
                                    This action cannot be undone.
                                </span>
                            </p>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button 
                                    className="admin-btn admin-btn-secondary" 
                                    onClick={() => setItemToDelete(null)}
                                    disabled={isDeleting}
                                    style={{ padding: '12px 24px', flex: 1 }}
                                >
                                    No, Keep it
                                </button>
                                <button 
                                    className="admin-btn admin-btn-danger" 
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    style={{ padding: '12px 24px', flex: 1 }}
                                >
                                    {isDeleting ? (
                                        <><i className="fas fa-circle-notch fa-spin"></i> Deleting...</>
                                    ) : (
                                        'Yes, Delete It'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminEditor;
