import React, { useState } from 'react';
import api from '../api';

const ContactEditor = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ text: 'Please fill in all fields', type: 'error' });
            return;
        }

        if (newPassword.length < 4) {
            setMessage({ text: 'New password must be at least 4 characters', type: 'error' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ text: 'New passwords do not match', type: 'error' });
            return;
        }

        if (currentPassword === newPassword) {
            setMessage({ text: 'New password must be different from current password', type: 'error' });
            return;
        }

        try {
            setSaving(true);
            const token = localStorage.getItem('adminToken');
            await api.put('/auth/change-password', 
                { currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setMessage({ text: 'Password changed successfully!', type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage({ 
                text: error.response?.data?.message || 'Failed to change password', 
                type: 'error' 
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-editor">
            <div className="admin-card" style={{ maxWidth: '560px' }}>
                <div className="admin-card-header">
                    <h3>
                        <i className="fas fa-shield-halved"></i>
                        Change Password
                    </h3>
                </div>
                
                <form onSubmit={handleChangePassword} style={{ padding: '28px' }}>
                    {/* Status Message */}
                    {message.text && (
                        <div style={{ 
                            padding: '12px 16px',
                            borderRadius: '10px',
                            marginBottom: '24px',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
                            color: message.type === 'success' ? '#059669' : '#dc2626',
                            border: `1px solid ${message.type === 'success' ? '#d1fae5' : '#fee2e2'}`
                        }}>
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                            {message.text}
                        </div>
                    )}

                    {/* Current Password */}
                    <div className="admin-form-group">
                        <label>
                            <i className="fas fa-lock"></i>
                            Current Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className="admin-input"
                                type={showCurrent ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                style={{ paddingRight: '44px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <i className={`fas ${showCurrent ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="admin-form-group">
                        <label>
                            <i className="fas fa-key"></i>
                            New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className="admin-input"
                                type={showNew ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                style={{ paddingRight: '44px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <i className={`fas ${showNew ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="admin-form-group">
                        <label>
                            <i className="fas fa-check-double"></i>
                            Confirm New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className="admin-input"
                                type={showConfirm ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                style={{ paddingRight: '44px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {confirmPassword && newPassword !== confirmPassword && (
                            <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <i className="fas fa-circle-xmark"></i> Passwords do not match
                            </div>
                        )}
                        {confirmPassword && newPassword === confirmPassword && newPassword.length >= 4 && (
                            <div style={{ color: '#10b981', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <i className="fas fa-circle-check"></i> Passwords match
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="admin-btn admin-btn-primary" 
                        disabled={saving || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                        style={{ 
                            width: '100%', 
                            padding: '13px', 
                            justifyContent: 'center',
                            marginTop: '8px',
                            fontSize: '0.9rem',
                            opacity: (saving || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword) ? 0.5 : 1
                        }}
                    >
                        {saving ? (
                            <><i className="fas fa-circle-notch fa-spin"></i> Updating Password...</>
                        ) : (
                            <><i className="fas fa-shield-halved"></i> Update Password</>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactEditor;
