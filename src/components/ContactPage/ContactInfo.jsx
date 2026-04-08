import React from 'react';

const ContactInfo = () => {
    return (
        <div className="contact-info-cards">
            <div className="contact-card-premium" data-aos="fade-left" data-aos-delay="200">
                <div className="card-icon">
                    <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="card-content">
                    <h3>Visit Us</h3>
                    <p>Musaffah - Shabiya ME-11,</p>
                    <p>Abu Dhabi, UAE</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '5px', opacity: 0.7 }}>P.O Box: 57049</p>
                </div>
            </div>

            <div className="contact-card-premium" data-aos="fade-left" data-aos-delay="300">
                <div className="card-icon">
                    <i className="fas fa-phone-alt"></i>
                </div>
                <div className="card-content">
                    <h3>Call Us</h3>
                    <p>+971 2 552 2238</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '5px', opacity: 0.7 }}>Available 24/7 Support</p>
                </div>
            </div>

            <div className="contact-card-premium" data-aos="fade-left" data-aos-delay="400">
                <div className="card-icon">
                    <i className="fas fa-envelope"></i>
                </div>
                <div className="card-content">
                    <h3>Email Us</h3>
                    <p>info@almouedtravel.com</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '5px', opacity: 0.7 }}>Response within 24 hours</p>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
