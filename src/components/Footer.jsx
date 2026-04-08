import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Footer = () => {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await api.get('/contact');
                setContact(response.data);
            } catch (error) {
                console.error('Error fetching contact info for footer:', error);
            }
        };
        fetchContact();
    }, []);

    const contactInfo = contact || {
        phone: '+971 4 123 4567',
        email: 'info@almouedtravel.com',
        address: 'Musaffah - Shabiya ME-11, Abu Dhabi, UAE',
        facebook: 'https://www.facebook.com/almouedtravel',
        instagram: 'https://www.instagram.com/almouedtravel',
        whatsapp: 'https://wa.me/97125522238'
    };

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        {/* Logo Section */}
                        <div className="footer-section footer-logo-section">
                            <div className="footer-logo">
                                <img 
                                    loading="lazy" 
                                    src="/images/logo.png" 
                                    alt="Almoued Travel Logo"
                                    className="footer-logo-image"
                                    style={{ background: 'white', padding: '10px', borderRadius: '10px' }}
                                />
                            </div>

                            <div className="social-links">
                                {contactInfo.facebook && (
                                    <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                )}
                                {contactInfo.instagram && (
                                    <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                )}
                                <a href="https://twitter.com/almouedtravel" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/almouedtravel" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://www.youtube.com/@almouedtravel" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/services">Services</Link></li>
                                <li><Link to="/destinations">Destinations</Link></li>
                                <li><Link to="/packages">Packages</Link></li>
                                <li><Link to="/team">Core Team</Link></li>
                            </ul>
                        </div>

                        {/* Our Services */}
                        <div className="footer-section">
                            <h4>Our Services</h4>
                            <ul>
                                <li><Link to="/services">Air Tickets</Link></li>
                                <li><Link to="/services">Global Visa Services</Link></li>
                                <li><Link to="/services">Hotel Bookings</Link></li>
                                <li><Link to="/packages">Holiday Packages</Link></li>
                                <li><Link to="/services">Umrah Assistance</Link></li>
                                <li><Link to="/services">Corporate Travel</Link></li>
                            </ul>
                        </div>

                        {/* Legal & Support */}
                        <div className="footer-section">
                            <h4>Legal & Support</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms and Conditions</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-section footer-contact">
                            <h4>Contact Info</h4>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <p>{contactInfo.address}</p>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <p>{contactInfo.phone}</p>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <p>{contactInfo.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="footer-bottom-content">
                            <p className="footer-copyright">&copy; {new Date().getFullYear()} Almoued Travel. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <div className="back-to-top" id="backToTop" onClick={handleBackToTop}>
                <i className="fas fa-arrow-up"></i>
                <div className="back-to-top-ripple"></div>
            </div>

            {/* WhatsApp Floating Button */}
            <a 
                href={contactInfo.whatsapp || "https://wa.me/97125522238"} 
                className="whatsapp-float" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chat on WhatsApp"
            >
                <i className="fab fa-whatsapp"></i>
                <span className="whatsapp-tooltip">Chat with us!</span>
                <div className="whatsapp-pulse"></div>
            </a>
        </>
    );
};

export default Footer;
