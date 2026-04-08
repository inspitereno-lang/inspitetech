import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ activePath }) => {
    const menuItems = [
        { path: '/admin', icon: 'fa-home', label: 'Dashboard' },
        { path: '/admin/destinations', icon: 'fa-map-marker-alt', label: 'Destinations' },
        { path: '/admin/packages', icon: 'fa-suitcase', label: 'Tour Packages' },
        { path: '/admin/services', icon: 'fa-concierge-bell', label: 'Services' },
        { path: '/admin/team', icon: 'fa-users', label: 'Team Members' },
        { path: '/admin/contact', icon: 'fa-address-book', label: 'Settings / Contact' }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <div className="admin-logo">
                    AL<span>MOUED</span>
                    <small>ADMIN PANEL</small>
                </div>
            </div>
            
            <nav className="admin-nav">
                {menuItems.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path} 
                        className={`admin-nav-item ${activePath === item.path ? 'active' : ''}`}
                    >
                        <i className={`fas ${item.icon}`}></i>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            
            <div className="admin-sidebar-footer">
                <div className="admin-user-info">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=009af0&color=fff" alt="User" />
                    <div>
                        <strong>Site Manager</strong>
                        <span>Active</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
