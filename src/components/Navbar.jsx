import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (!mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="nav-container">
                <div className="logo-container" data-aos="fade-right" data-aos-duration="200" data-aos-delay="0">
                    <Link to="/" onClick={handleLinkClick}>
                        <img loading="lazy" src="/images/logo.png" alt="Almoued Travel - The Destination Expertz" className="logo-image" />
                    </Link>
                </div>

                <ul className="nav-menu" data-aos="fade-down" data-aos-duration="200" data-aos-delay="200">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>About</NavLink></li>
                    <li><NavLink to="/destinations" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>Destinations</NavLink></li>
                    <li><NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>Services</NavLink></li>
                    <li><NavLink to="/packages" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>Packages</NavLink></li>
                    <li><NavLink to="/team" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>Core Team</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>Contact</NavLink></li>
                </ul>

                <Link to="/contact" className="cta-btn" data-aos="fade-left" data-aos-duration="200" data-aos-delay="400" onClick={handleLinkClick}>
                    <span>Get Started</span>
                    <i className="fas fa-arrow-right"></i>
                </Link>

                <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} id="mobile-menu" onClick={toggleMobileMenu}>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                </div>
            </div>

            {/* Mobile Nav Menu Overlay */}
            {mobileMenuOpen && (
                <div className="mobile-nav-menu" style={{ display: 'flex' }}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>About</NavLink>
                    <NavLink to="/destinations" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>Destinations</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>Services</NavLink>
                    <NavLink to="/packages" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>Packages</NavLink>
                    <NavLink to="/team" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>Core Team</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>Contact</NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
