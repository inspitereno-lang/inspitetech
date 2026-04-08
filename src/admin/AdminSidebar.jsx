import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ activePath, user, onLogout, isOpen, setIsOpen }) => {
    const mainNavItems = [
        { path: '/admin/home', icon: 'fas fa-house', label: 'Home Page' },
        { path: '/admin/destinations', icon: 'fas fa-location-dot', label: 'Destinations' },
        { path: '/admin/packages', icon: 'fas fa-suitcase-rolling', label: 'Packages' },
        { path: '/admin/services', icon: 'fas fa-bell-concierge', label: 'Services' },
        { path: '/admin/visa', icon: 'fas fa-passport', label: 'Visa Requirements' },
        { path: '/admin/team', icon: 'fas fa-user-group', label: 'Team' },
    ];

    const settingsNavItems = [
        { path: '/admin/contact', icon: 'fas fa-gear', label: 'Settings' },
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            {/* Logo & Mobile Close */}
            <div className="admin-sidebar-logo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <img 
                    src="/images/logo-white.png" 
                    alt="Almoued Travel" 
                    onError={(e) => e.target.src='https://placehold.co/160x50/1a1a2e/ff8c00?text=Almoued'} 
                    style={{ height: '50px', width: 'auto' }}
                />
                <button 
                    className="admin-sidebar-close" 
                    onClick={() => setIsOpen(false)}
                >
                    <i className="fas fa-xmark"></i>
                </button>
            </div>
            
            {/* Main Navigation */}
            <nav className="admin-nav">
                <div className="admin-nav-label">Main Menu</div>
                {mainNavItems.map((item) => (
                    <NavLink 
                        key={item.path} 
                        to={item.path} 
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    >
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                    </NavLink>
                ))}

                <div className="admin-nav-label">Configuration</div>
                {settingsNavItems.map((item) => (
                    <NavLink 
                        key={item.path} 
                        to={item.path} 
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    >
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            
            {/* Sidebar Footer - User Info */}
            <div className="admin-sidebar-footer">
                <div className="footer-avatar">
                    <i className="fas fa-user"></i>
                </div>
                <div className="footer-info">
                    <div className="footer-name">{user?.username || 'Admin'}</div>
                    <div className="footer-role">Administrator</div>
                </div>
                <button 
                    onClick={onLogout} 
                    title="Logout"
                    style={{ 
                        background: 'rgba(239, 68, 68, 0.15)', 
                        border: 'none', 
                        color: '#ef4444',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                    }}
                >
                    <i className="fas fa-right-from-bracket" style={{ fontSize: '0.8rem' }}></i>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
