import React from 'react';

const TeamForm = ({ item, onChange, onFileChange, uploading }) => {
    return (
        <div className="admin-form-container">
            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Full Name</label>
                    <input 
                        className="admin-input"
                        name="name"
                        value={item.name || ''}
                        onChange={onChange}
                        required
                        placeholder="e.g. John Doe"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Role / Position</label>
                    <input 
                        className="admin-input"
                        name="role"
                        value={item.role || ''}
                        onChange={onChange}
                        required
                        placeholder="e.g. Travel Consultant"
                    />
                </div>
            </div>

            <div className="admin-form-group">
                <label>Profile Photo</label>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                    <img 
                        src={item.image || item.photoUrl} 
                        alt="Preview" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--blue)' }}
                        onError={(e) => e.target.src='https://ui-avatars.com/api/?name=Team&background=ddd'}
                    />
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={onFileChange}
                        disabled={uploading}
                    />
                </div>
                {uploading && <p style={{ color: 'var(--blue)', fontSize: '0.8rem' }}>Uploading...</p>}
            </div>

            <div className="admin-form-group">
                <label>Bio / Short Description</label>
                <textarea 
                    className="admin-textarea"
                    name="bio"
                    value={item.bio || ''}
                    onChange={onChange}
                    style={{ minHeight: '80px' }}
                    placeholder="Brief intro about the team member..."
                />
            </div>

            <div className="admin-form-row">
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
            </div>

            <div className="admin-form-row">
                <div className="admin-form-group">
                    <label>Facebook Profile</label>
                    <input 
                        className="admin-input"
                        name="facebook"
                        value={item.facebook || ''}
                        onChange={onChange}
                        placeholder="URL"
                    />
                </div>
                <div className="admin-form-group">
                    <label>Instagram Handle</label>
                    <input 
                        className="admin-input"
                        name="instagram"
                        value={item.instagram || ''}
                        onChange={onChange}
                        placeholder="Handle or URL"
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamForm;
