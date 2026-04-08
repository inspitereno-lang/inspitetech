import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminEditor from './AdminEditor';
import HomeEditor from './HomeEditor';
import ContactEditor from './ContactEditor';
import Login from './Login';
import VisaEditor from './VisaEditor';
import VisaForm from './VisaForm';
import './Admin.css';

// Import data using named imports
import { destinationsList } from '../data/destinations';
import { packagesList } from '../data/packages';
import { servicesList } from '../data/services';

const pageTitles = {
    '/admin/home': { title: 'Home Page', subtitle: 'Manage your homepage content and sections', icon: 'fas fa-house' },
    '/admin/destinations': { title: 'Destinations', subtitle: 'Manage travel destinations and places', icon: 'fas fa-location-dot' },
    '/admin/packages': { title: 'Packages', subtitle: 'Manage tour packages and pricing', icon: 'fas fa-suitcase-rolling' },
    '/admin/services': { title: 'Services', subtitle: 'Manage service offerings', icon: 'fas fa-bell-concierge' },
    '/admin/visa': { title: 'Visa Requirements', subtitle: 'Manage country-specific visa requirements', icon: 'fas fa-passport' },
    '/admin/team': { title: 'Team', subtitle: 'Manage core team members', icon: 'fas fa-user-group' },
    '/admin/contact': { title: 'Settings', subtitle: 'Company information and social links', icon: 'fas fa-gear' },
};

const Admin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Auth state initialized from localStorage
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminUser') || 'null'));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogin = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setToken(null);
        setUser(null);
        navigate('/admin');
    };

    if (!token) {
        return <Login onLogin={handleLogin} />;
    }

    const currentPage = pageTitles[location.pathname] || pageTitles['/admin/home'];

    return (
        <div className="admin-container">
            {/* Mobile Overlay */}
            <div 
                className={`admin-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <AdminSidebar 
                activePath={location.pathname} 
                user={user} 
                onLogout={handleLogout} 
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            
            <main className="admin-main">
                {/* Top Header */}
                <header className="admin-header">
                    <button 
                        className="admin-hamburger" 
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="admin-header-left">
                        <div className="admin-breadcrumb">
                            <i className="fas fa-house"></i>
                            <span>Admin</span>
                            <i className="fas fa-chevron-right"></i>
                            <span className="current">{currentPage.title}</span>
                        </div>
                        <h2>
                            <i className={currentPage.icon} style={{ color: 'var(--admin-primary)', marginRight: '10px', fontSize: '1.1rem' }}></i>
                            {currentPage.title}
                        </h2>
                    </div>
                    
                </header>

                {/* Page Content */}
                <div className="admin-content-area">
                    <Routes>
                        {/* Default redirect to Home Page Management */}
                        <Route index element={<Navigate to="home" replace />} />
                        
                        <Route path="home" element={<HomeEditor />} />

                        <Route path="destinations" element={
                            <AdminEditor 
                                type="destinations" 
                                initialData={destinationsList} 
                                title="Destinations"
                            />
                        } />
                        
                        <Route path="packages" element={
                            <AdminEditor 
                                type="packages" 
                                initialData={packagesList} 
                                title="Packages"
                            />
                        } />
                        
                        <Route path="services" element={
                            <AdminEditor 
                                type="services" 
                                initialData={servicesList} 
                                title="Services"
                            />
                        } />

                        <Route path="visa" element={<VisaEditor />} />
                        <Route path="visa/new" element={<VisaForm />} />
                        <Route path="visa/edit/:id" element={<VisaForm />} />

                        <Route path="team" element={
                            <AdminEditor 
                                type="team" 
                                title="Team"
                            />
                        } />

                        <Route path="contact" element={<ContactEditor />} />
                        
                        {/* Fallback to Home Management */}
                        <Route path="*" element={<Navigate to="home" replace />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Admin;
