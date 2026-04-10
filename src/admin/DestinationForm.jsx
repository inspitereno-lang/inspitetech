import React from 'react';
import { uploadImage } from '../api';

const DestinationForm = ({ item, onChange, onFileChange, uploading }) => {
    const handleHighlightChange = (index, value) => {
        const newHighlights = [...(item.highlights || [])];
        newHighlights[index] = value;
        onChange({ target: { name: 'highlights', value: newHighlights } });
    };

    const addHighlight = () => {
        const newHighlights = [...(item.highlights || []), ''];
        onChange({ target: { name: 'highlights', value: newHighlights } });
    };

    const removeHighlight = (index) => {
        const newHighlights = (item.highlights || []).filter((_, i) => i !== index);
        onChange({ target: { name: 'highlights', value: newHighlights } });
    };

    return (
        <div className="admin-form-container">
            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Destination Name</label>
                    <input 
                        className="admin-input"
                        name="name"
                        value={item.name || ''}
                        onChange={onChange}
                        required
                        placeholder="e.g. Dubai"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Country</label>
                    <input 
                        className="admin-input"
                        name="country"
                        value={item.country || ''}
                        onChange={onChange}
                        required
                        placeholder="e.g. UAE"
                    />
                </div>
            </div>

            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Tagline</label>
                    <input 
                        className="admin-input"
                        name="tagline"
                        value={item.tagline || ''}
                        onChange={onChange}
                        placeholder="e.g. Adventure meets Luxury"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Status</label>
                    <select 
                        className="admin-input"
                        name="status"
                        value={item.status || 'active'}
                        onChange={onChange}
                    >
                        <option value="active">Active (Visible on Site)</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </div>
            </div>

            <div className="admin-form-group">
                <label>Hero Image</label>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                    <img 
                        src={item.image} 
                        alt="Preview" 
                        style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                        onError={(e) => e.target.src='https://placehold.co/120x70/lightgray/gray?text=No+Img'}
                    />
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={onFileChange}
                        disabled={uploading}
                    />
                </div>
                {uploading && <p style={{ color: 'var(--blue)', fontSize: '0.8rem' }}>Uploading to Cloudinary...</p>}
            </div>

            <div className="admin-form-group">
                <label>Description (Rich Text / HTML supported)</label>
                <textarea 
                    className="admin-textarea"
                    name="description"
                    value={item.description || ''}
                    onChange={onChange}
                    required
                    style={{ minHeight: '150px' }}
                    placeholder="Enter destination details..."
                />
            </div>

            <div className="admin-form-group">
                <label>Highlights (Featured Attractions)</label>
                {(item.highlights || []).map((hl, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input 
                            className="admin-input"
                            value={hl}
                            onChange={(e) => handleHighlightChange(index, e.target.value)}
                            placeholder="e.g. Burj Khalifa"
                        />
                        <button 
                            type="button" 
                            className="admin-btn admin-btn-danger"
                            onClick={() => removeHighlight(index)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <button 
                    type="button" 
                    className="admin-btn admin-btn-secondary"
                    onClick={addHighlight}
                    style={{ width: '100%', marginTop: '5px' }}
                >
                    + Add Highlight
                </button>
            </div>
            
            <div className="admin-form-group">
                <label>URL Slug / ID (Unique)</label>
                <input 
                    className="admin-input"
                    name="id"
                    value={item.id || ''}
                    onChange={onChange}
                    required
                    placeholder="e.g. dubai-tour"
                    disabled={item._id} // Disable if editing existing item
                />
                <small style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginTop: '4px' }}>
                    <i className="fas fa-magic" style={{ marginRight: '4px', color: '#ff8c00' }}></i>
                    {item._id ? 'The slug is permanent once created.' : 'Auto-generated from name. Edit only if needed.'}
                </small>
            </div>
        </div>
    );
};

export default DestinationForm;
