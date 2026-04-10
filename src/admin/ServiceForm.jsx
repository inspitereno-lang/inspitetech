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

    const isVisaService = item._id === 'visa' || (item.title && item.title.toLowerCase().includes('visa'));

    return (
        <div className="admin-form-container">
            {isVisaService && (
                <div style={{ 
                    background: '#fef2f2', 
                    border: '1px solid #fee2e2', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    color: '#991b1b',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <i className="fas fa-circle-info" style={{ color: '#ef4444' }}></i>
                    <span> This is a <strong>System Service</strong>. Deletion is protected because it manages the Country Visa Requirements section on the public site.</span>
                </div>
            )}
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
                    <label>Display Priority (Lower = First)</label>
                    <input 
                        type="number"
                        className="admin-input"
                        name="priority"
                        value={item.priority || 0}
                        onChange={onChange}
                        placeholder="0"
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
                        src={item.image || 'https://placehold.co/120x70/e8ecf1/94a3b8?text=Placeholder'} 
                        alt="Preview" 
                        style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                        onError={(e) => e.target.src='https://placehold.co/120x70/e8ecf1/94a3b8?text=Placeholder'}
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
            
        </div>
    );
};

export default ServiceForm;
