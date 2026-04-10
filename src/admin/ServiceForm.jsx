import React from 'react';
import IconPicker from './IconPicker';

const ServiceForm = ({ item, onChange, onFileChange, uploading }) => {
    const handleFeatureChange = (index, value) => {
        const newFeatures = [...(item.features || [])];
        newFeatures[index] = value;
        onChange({ target: { name: 'features', value: newFeatures } });
    };

    const addFeature = () => {
        const newFeatures = [...(item.features || []), ''];
        onChange({ target: { name: 'features', value: newFeatures } });
    };

    const removeFeature = (index) => {
        const newFeatures = (item.features || []).filter((_, i) => i !== index);
        onChange({ target: { name: 'features', value: newFeatures } });
    };

    const handleIconSelect = (icon) => {
        onChange({ target: { name: 'icon', value: icon } });
    };

    return (
        <div className="admin-form-container">
            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Service Title</label>
                    <input 
                        className="admin-input"
                        name="title"
                        value={item.title || ''}
                        onChange={onChange}
                        required
                        placeholder="e.g. Global Visa Services"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Select Service Icon</label>
                    <IconPicker 
                        selectedIcon={item.icon} 
                        onSelect={handleIconSelect} 
                    />
                </div>
            </div>

            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Subtitle / Category</label>
                    <input 
                        className="admin-input"
                        name="subtitle"
                        value={item.subtitle || ''}
                        onChange={onChange}
                        placeholder="e.g. Travel Documentation"
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
                        <option value="active">Active</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </div>
            </div>

            <div className="admin-form-group">
                <label>Service Feature Image</label>
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
                <label>Long Description</label>
                <textarea 
                    className="admin-textarea"
                    name="description"
                    value={item.description || ''}
                    onChange={onChange}
                    required
                    style={{ minHeight: '120px' }}
                    placeholder="Describe this service in detail..."
                />
            </div>

            <div className="admin-form-group">
                <label>Key Features / Benefits (Dynamic List)</label>
                {(item.features || []).map((feat, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input 
                            className="admin-input"
                            value={feat}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            placeholder="e.g. 24/7 Support"
                        />
                        <button 
                            type="button" 
                            className="admin-btn admin-btn-danger"
                            onClick={() => removeFeature(index)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <button 
                    type="button" 
                    className="admin-btn admin-btn-secondary"
                    onClick={addFeature}
                    style={{ width: '100%', marginTop: '5px' }}
                >
                    + Add Feature item
                </button>
            </div>
            
            <div className="admin-form-group">
                <label>Service ID / URL Slug</label>
                <input 
                    className="admin-input"
                    name="id"
                    value={item.id || ''}
                    onChange={onChange}
                    required
                    placeholder="e.g. visa-assistance"
                    disabled={item._id}
                />
                <small style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginTop: '4px' }}>
                    <i className="fas fa-magic" style={{ marginRight: '4px', color: '#ff8c00' }}></i>
                    {item._id ? 'The slug is permanent once created.' : 'Auto-generated from title. Edit only if needed.'}
                </small>
            </div>
        </div>
    );
};

export default ServiceForm;
