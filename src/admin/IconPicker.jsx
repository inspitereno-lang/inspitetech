import React, { useState } from 'react';

const icons = [
    // Travel Specific
    'fa-plane', 'fa-passport', 'fa-hotel', 'fa-train', 'fa-users', 'fa-concierge-bell',
    'fa-handshake', 'fa-shield-alt', 'fa-id-card', 'fa-pray', 'fa-car', 'fa-shuttle-van',
    'fa-umbrella-beach', 'fa-briefcase', 'fa-certificate', 'fa-plane-departure',
    'fa-graduation-cap', 'fa-stethoscope', 'fa-globe', 'fa-map-marker-alt',
    
    // UI & Action
    'fa-search', 'fa-star', 'fa-heart', 'fa-clock', 'fa-calendar-alt', 'fa-bell',
    'fa-info-circle', 'fa-check-circle', 'fa-exclamation-triangle', 'fa-question-circle',
    'fa-phone', 'fa-envelope', 'fa-map', 'fa-location-dot', 'fa-compass',
    
    // Transport & Activities
    'fa-ship', 'fa-bus', 'fa-bicycle', 'fa-walking', 'fa-mountain', 'fa-tree',
    'fa-camera', 'fa-utensils', 'fa-wine-glass', 'fa-shopping-cart', 'fa-ticket-alt',
    
    // Business & Finance
    'fa-chart-line', 'fa-laptop', 'fa-money-bill-wave', 'fa-credit-card', 'fa-wallet',
    'fa-building', 'fa-city', 'fa-landmark'
];

const IconPicker = ({ selectedIcon, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIcons = icons.filter(icon => 
        icon.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="icon-picker">
            <div className="icon-picker-search">
                <i className="fas fa-search"></i>
                <input 
                    type="text" 
                    placeholder="Search icons (e.g. plane, passport)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="icon-picker-grid">
                {filteredIcons.map(icon => (
                    <div 
                        key={icon} 
                        className={`icon-item ${selectedIcon === icon ? 'active' : ''}`}
                        onClick={() => onSelect(icon)}
                        title={icon}
                    >
                        <i className={`fas ${icon}`}></i>
                    </div>
                ))}
            </div>
            <div className="icon-picker-footer" style={{ marginTop: '10px', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                Selected: <code style={{ color: '#3b82f6' }}>{selectedIcon || 'None'}</code>
            </div>
        </div>
    );
};

export default IconPicker;
