import React, { useState, useEffect } from 'react';
import api, { uploadImage } from '../api';
import DestinationForm from './DestinationForm';
import PackageForm from './PackageForm';
import ServiceForm from './ServiceForm';
import TeamForm from './TeamForm';

const AdminEditor = ({ type, title }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

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
        } finally {
            setLoading(false);
        }
    };

    const getItemId = (item) => item.id || item._id;

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        let newItem = {};
        if (type === 'destinations') {
            newItem = {
                id: '',
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
                id: '',
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
                id: '',
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
                id: Date.now().toString(),
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
        try {
            const isNew = !editingItem._id;
            
            if (isNew) {
                await api.post(`/${type}`, editingItem);
            } else {
                // Use _id for models that don't have a custom slug 'id'
                const updateId = editingItem.id || editingItem._id;
                await api.put(`/${type}/${updateId}`, editingItem);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            fetchData();
        } catch (error) {
            console.error(`Error saving ${type}:`, error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to save changes.';
            alert(`Error saving ${type}: ${errorMessage}`);
        }
    };

    const handleDelete = async (item) => {
        const id = getItemId(item);
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/${type}/${id}`);
                fetchData();
            } catch (error) {
                console.error(`Error deleting ${type}:`, error);
            }
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
            alert('Image upload failed. Check Cloudinary settings.');
        } finally {
            setUploading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setEditingItem(prev => {
            const updated = { ...prev, [name]: value };
            
            // Auto-slugify for new items
            if (!prev._id && (name === 'name' || name === 'title')) {
                // If id is empty or was previously auto-generated from the old name/title
                const oldSlug = slugify(prev.name || prev.title || '');
                if (!prev.id || prev.id === oldSlug) {
                    updated.id = slugify(value);
                }
            }
            
            return updated;
        });
    };

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')     // Replace spaces with -
            .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
            .replace(/\-\-+/g, '-');   // Replace multiple - with single -
    };

    if (loading) return <div className="admin-loading">Loading {title}...</div>;

    return (
        <div className="admin-editor">
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3>
                        <i className="fas fa-list"></i>
                        Manage {title}
                    </h3>
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
                                    {(type === 'destinations' || type === 'packages' || type === 'services') && <th>Status</th>}
                                    {type === 'packages' && <th>Duration</th>}
                                    {type === 'packages' && <th>Price</th>}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item._id || item.id}>
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
                                                    onClick={() => handleDelete(item)}
                                                    disabled={type === 'services' && item.id === 'visa'}
                                                    title={type === 'services' && item.id === 'visa' ? "Global Visa Services cannot be deleted" : "Delete"}
                                                    style={type === 'services' && item.id === 'visa' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
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
        </div>
    );
};

export default AdminEditor;
