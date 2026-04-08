import React from 'react';

const PackageForm = ({ item, onChange, onFileChange, uploading }) => {
    const handleInclusionChange = (index, value) => {
        const newInclusions = [...(item.inclusions || [])];
        newInclusions[index] = value;
        onChange({ target: { name: 'inclusions', value: newInclusions } });
    };

    const addInclusion = () => {
        const newInclusions = [...(item.inclusions || []), ''];
        onChange({ target: { name: 'inclusions', value: newInclusions } });
    };

    const removeInclusion = (index) => {
        const newInclusions = (item.inclusions || []).filter((_, i) => i !== index);
        onChange({ target: { name: 'inclusions', value: newInclusions } });
    };

    const handleToggleEnquiry = (e) => {
        onChange({ target: { name: 'isEnquiryOnly', value: e.target.checked } });
    };

    return (
        <div className="admin-form-container">
            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Package Title</label>
                    <input 
                        className="admin-input"
                        name="title"
                        value={item.title || ''}
                        onChange={onChange}
                        required
                        placeholder="e.g. European Discovery"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Duration</label>
                    <input 
                        className="admin-input"
                        name="duration"
                        value={item.duration || ''}
                        onChange={onChange}
                        placeholder="e.g. 14 Days / 13 Nights"
                    />
                </div>
            </div>

            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Category Tag</label>
                    <input 
                        className="admin-input"
                        name="categoryTag"
                        value={item.categoryTag || ''}
                        onChange={onChange}
                        placeholder="e.g. Luxury, Family, Spiritual"
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

            <div className="admin-form-row" style={{ alignItems: 'center', gap: '20px' }}>
                <div className="admin-form-group" style={{ flex: item.isEnquiryOnly ? '0 0 auto' : '1' }}>
                    <label>Price Display</label>
                    <input 
                        className="admin-input"
                        name="price"
                        value={item.price || ''}
                        onChange={onChange}
                        placeholder="e.g. From $2,499"
                        disabled={item.isEnquiryOnly}
                        required={!item.isEnquiryOnly}
                    />
                </div>
                <div className="admin-form-group" style={{ flex: '0 0 auto', marginTop: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input 
                            type="checkbox" 
                            name="isEnquiryOnly" 
                            checked={item.isEnquiryOnly || false}
                            onChange={handleToggleEnquiry}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <span>Enquiry Only (Price on Request)</span>
                    </label>
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
                <label>Description (Main Story)</label>
                <textarea 
                    className="admin-textarea"
                    name="description"
                    value={item.description || ''}
                    onChange={onChange}
                    required
                    style={{ minHeight: '120px' }}
                    placeholder="Describe the journey..."
                />
            </div>

            <div className="admin-form-group">
                <label>Package Inclusions (Dynamic List)</label>
                {(item.inclusions || []).map((inc, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input 
                            className="admin-input"
                            value={inc}
                            onChange={(e) => handleInclusionChange(index, e.target.value)}
                            placeholder="e.g. 5-star Hotel Accommodation"
                        />
                        <button 
                            type="button" 
                            className="admin-btn admin-btn-danger"
                            onClick={() => removeInclusion(index)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <button 
                    type="button" 
                    className="admin-btn admin-btn-secondary"
                    onClick={addInclusion}
                    style={{ width: '100%', marginTop: '5px' }}
                >
                    + Add Inclusion
                </button>
            </div>
            
            <div className="admin-form-group">
                <label>Package ID / URL Slug</label>
                <input 
                    className="admin-input"
                    name="id"
                    value={item.id || ''}
                    onChange={onChange}
                    required
                    placeholder="e.g. european-discovery"
                    disabled={item._id}
                />
            </div>
        </div>
    );
};

export default PackageForm;
