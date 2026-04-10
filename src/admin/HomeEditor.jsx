import React, { useState, useEffect } from 'react';
import api from '../api';

const HomeEditor = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // Lists of all available items
    const [allData, setAllData] = useState({
        destinations: [],
        packages: [],
        services: []
    });

    useEffect(() => {
        const loadAll = async () => {
            try {
                setLoading(true);
                const [sRes, dRes, pRes, svRes] = await Promise.all([
                    api.get('/home/settings'),
                    api.get('/destinations'),
                    api.get('/packages'),
                    api.get('/services')
                ]);
                
                setSettings(sRes.data);
                setAllData({
                    destinations: dRes.data,
                    packages: pRes.data,
                    services: svRes.data
                });
            } catch (error) {
                console.error('Error loading home editor data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.put('/home/settings', settings);
            setShowSuccess(true);
            // Auto hide after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    const updateSection = (section, key, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const toggleItem = (section, id) => {
        const currentItems = settings[section].items || [];
        
        // Find if this specific ID (or its legacy slug equivalent) is selected
        const item = allData[section].find(it => it._id === id);
        const legacySlug = item?.id;
        
        const isSelected = currentItems.some(i => i === id || (legacySlug && i === legacySlug));
        
        let newItems;
        if (isSelected) {
            // Remove both the ID and the legacy slug to be sure
            newItems = currentItems.filter(i => i !== id && i !== legacySlug);
        } else {
            // Add the new ID
            newItems = [...currentItems, id];
        }
            
        updateSection(section, 'items', newItems);
    };

    const moveItem = (section, index, direction) => {
        const items = [...settings[section].items];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (newIndex >= 0 && newIndex < items.length) {
            [items[index], items[newIndex]] = [items[newIndex], items[index]];
            updateSection(section, 'items', items);
        }
    };

    const removeItem = (section, id) => {
        const items = [...settings[section].items];
        // Filter out both the ID and its legacy slug just to be safe
        const item = allData[section].find(it => it._id === id);
        const legacySlug = item?.id;
        
        const newItems = items.filter(i => i !== id && i !== legacySlug);
        updateSection(section, 'items', newItems);
    };

    if (loading) return <div className="admin-loading">Loading Home Page Manager...</div>;

    const sectionIcons = {
        destinations: 'fa-location-dot',
        packages: 'fa-suitcase-rolling',
        services: 'fa-bell-concierge'
    };

    const renderSection = (title, key, data) => {
        const sectionSettings = settings[key] || { items: [], limit: 6, show: true };
        const selectedIds = sectionSettings.items || [];
        
        return (
            <div className="admin-card" style={{ marginBottom: '20px' }}>
                <div className="admin-card-header">
                    <h3>
                        <i className={`fas ${sectionIcons[key] || 'fa-cube'}`}></i>
                        {title} Section
                    </h3>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        {/* Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>Show</span>
                            <label className="admin-toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={sectionSettings.show}
                                    onChange={(e) => updateSection(key, 'show', e.target.checked)}
                                />
                                <span className="admin-toggle-slider"></span>
                            </label>
                        </div>
                        {/* Limit */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>Limit</span>
                            <input 
                                type="number" 
                                className="admin-input" 
                                style={{ width: '65px', margin: 0, padding: '6px 10px', textAlign: 'center', fontSize: '0.82rem' }}
                                value={sectionSettings.limit}
                                onChange={(e) => updateSection(key, 'limit', parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Available Items Column */}
                    <div>
                        <h4 style={{ 
                            marginBottom: '12px', 
                            color: '#64748b', 
                            fontSize: '0.78rem', 
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <i className="fas fa-list-check"></i>
                            Available {title}
                        </h4>
                        <div style={{ maxHeight: '360px', overflowY: 'auto', borderRadius: '10px', border: '1px solid #e8ecf1', padding: '8px' }}>
                            {data.map(item => {
                                const itemId = item._id;
                                const isSelected = selectedIds.some(id => id === itemId || id === item.id);
                                return (
                                    <div 
                                        key={itemId} 
                                        className={`picker-item ${isSelected ? 'selected' : ''}`}
                                        onClick={() => toggleItem(key, itemId)}
                                    >
                                        <div style={{ flex: 1, fontWeight: '500' }}>{item.name || item.title}</div>
                                        {isSelected ? (
                                            <i className="fas fa-circle-check" style={{ color: '#ff8c00', fontSize: '0.9rem' }}></i>
                                        ) : (
                                            <i className="far fa-circle" style={{ color: '#d1d5db', fontSize: '0.9rem' }}></i>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reorder Column */}
                    <div>
                        <h4 style={{ 
                            marginBottom: '12px', 
                            color: '#64748b', 
                            fontSize: '0.78rem', 
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <i className="fas fa-arrow-down-up-across-line"></i>
                            Display Order
                        </h4>
                        <div style={{ maxHeight: '360px', overflowY: 'auto', borderRadius: '10px', border: '1px solid #e8ecf1', padding: '8px' }}>
                            {selectedIds.length === 0 ? (
                                <div className="admin-empty-state" style={{ padding: '40px 20px' }}>
                                    <i className="fas fa-hand-pointer" style={{ fontSize: '1.5rem' }}></i>
                                    <p style={{ fontSize: '0.82rem' }}>Select items from the left to feature them on the homepage</p>
                                </div>
                            ) : (
                                selectedIds.map((id, index) => {
                                    // Try matching by _id first, then by legacy slug 'id'
                                    const item = data.find(it => it._id === id || it.id === id);
                                    
                                    // If we find an item but the ID in the list was a slug, 
                                    // we still show it, but clicking Save will eventually 
                                    // migrate the list to pure _ids.
                                    return (
                                        <div 
                                            key={id + index} 
                                            style={{ 
                                                padding: '10px 12px', 
                                                marginBottom: '6px', 
                                                borderRadius: '8px', 
                                                background: '#fafbfc',
                                                border: '1px solid #e8ecf1',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                transition: 'all 0.15s ease'
                                            }}
                                        >
                                            <div style={{ 
                                                color: '#94a3b8', 
                                                fontWeight: '700', 
                                                width: '22px',
                                                height: '22px',
                                                background: '#f1f5f9',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.72rem',
                                                flexShrink: 0
                                            }}>
                                                {index + 1}
                                            </div>
                                            <div style={{ flex: 1, fontWeight: '500', fontSize: '0.88rem' }}>
                                                {item?.name || item?.title || 'Unknown Item'}
                                            </div>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button 
                                                    className="admin-btn-icon" 
                                                    style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}
                                                    onClick={() => moveItem(key, index, 'up')}
                                                    disabled={index === 0}
                                                    title="Move Up"
                                                >
                                                    <i className="fas fa-chevron-up"></i>
                                                </button>
                                                <button 
                                                    className="admin-btn-icon" 
                                                    style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}
                                                    onClick={() => moveItem(key, index, 'down')}
                                                    disabled={index === selectedIds.length - 1}
                                                    title="Move Down"
                                                >
                                                    <i className="fas fa-chevron-down"></i>
                                                </button>
                                                <button 
                                                    className="admin-btn-icon" 
                                                    style={{ width: '28px', height: '28px', fontSize: '0.7rem', color: '#ef4444', backgroundColor: '#fee2e2' }}
                                                    onClick={() => removeItem(key, id)}
                                                    title="Remove from Homepage"
                                                >
                                                    <i className="fas fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="admin-editor">
            {/* Save Bar */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '24px',
                background: '#fff',
                padding: '16px 20px',
                borderRadius: '14px',
                border: '1px solid #e8ecf1'
            }}>
                <div>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                        <i className="fas fa-circle-info" style={{ marginRight: '6px', color: '#ff8c00' }}></i>
                        Pick which items appear on your homepage and set their display order
                    </p>
                </div>
                <button 
                    className="admin-btn admin-btn-primary" 
                    onClick={handleSave}
                    disabled={saving}
                    style={{ padding: '10px 24px' }}
                >
                    {saving ? (
                        <><i className="fas fa-circle-notch fa-spin"></i> Saving...</>
                    ) : (
                        <><i className="fas fa-floppy-disk"></i> Save All Changes</>
                    )}
                </button>
            </div>

            {renderSection('Destinations', 'destinations', allData.destinations)}
            {renderSection('Packages', 'packages', allData.packages)}
            {renderSection('Services', 'services', allData.services)}

            {/* Success Modal */}
            {showSuccess && (
                <div className="admin-modal-overlay" style={{ zIndex: 1100 }} onClick={() => setShowSuccess(false)}>
                    <div className="admin-modal" style={{ 
                        maxWidth: '400px', 
                        width: '90%', 
                        textAlign: 'center', 
                        padding: '40px 30px',
                        animation: 'modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>
                        <div style={{ 
                            width: '70px', 
                            height: '70px', 
                            background: '#dcfce7', 
                            color: '#22c55e', 
                            borderRadius: '20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto 20px',
                            fontSize: '2rem'
                        }}>
                            <i className="fas fa-circle-check"></i>
                        </div>
                        
                        <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '10px' }}>
                            Settings Saved!
                        </h3>
                        
                        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '25px', lineHeight: '1.6' }}>
                            Your homepage has been successfully updated with the new order and featured items.
                        </p>

                        <button 
                            className="admin-btn admin-btn-primary" 
                            onClick={() => setShowSuccess(false)}
                            style={{ width: '100%', padding: '12px' }}
                        >
                            Awesome!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeEditor;
