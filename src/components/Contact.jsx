import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        
        // Mocking form submission for now
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: ''
            });
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    return (
        <section className="section contact" id="contact">
            <div className="container">
                <div className="contact-content">
                    <div className="contact-left" data-aos="fade-right" data-aos-duration="1000">
                        <div className="contact-form-container">
                            <form id="contact-form" className="appointment-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
                                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                                        <div className="input-highlight"></div>
                                    </div>
                                    <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
                                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                                        <div className="input-highlight"></div>
                                    </div>
                                </div>

                                <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="400">
                                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                                    <div className="input-highlight"></div>
                                </div>

                                <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="500">
                                    <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={formData.phone} onChange={handleChange} />
                                    <div className="input-highlight"></div>
                                </div>

                                <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="600">
                                    <textarea name="message" rows="5" placeholder="How can we help you? Tell us about your travel needs or any questions you have..." value={formData.message} onChange={handleChange} required></textarea>
                                    <div className="input-highlight"></div>
                                </div>

                                <button type="submit" className="submit-btn" data-aos="fade-up" data-aos-duration="600" data-aos-delay="700" disabled={status === 'sending'}>
                                    <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                    <div className="submit-ripple"></div>
                                </button>

                                {status === 'success' && (
                                    <div className="form-message success" style={{ background: '#dcfce7', color: '#16a34a', padding: '1rem', marginTop: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                                        Thank you! Your message has been sent successfully.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    <div className="contact-right" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                        <div className="section-header text-left">
                            <div className="section-label">CONTACT US</div>
                            <h2 className="section-title">Contact Us</h2>
                            <p className="contact-description">
                                Ready to take the first step? We're here to support you on your travel journey.
                            </p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-item" data-aos="slide-left" data-aos-duration="600" data-aos-delay="400">
                                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                                <div className="contact-details">
                                    <h4>Address</h4>
                                    <p>Musaffah - Shabiya ME-11,<br />Abu Dhabi, UAE</p>
                                </div>
                                <div className="contact-ripple"></div>
                            </div>
                            <div className="contact-item" data-aos="slide-left" data-aos-duration="600" data-aos-delay="500">
                                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                                <div className="contact-details">
                                    <h4>Phone</h4>
                                    <p>+971 4 123 4567</p>
                                </div>
                                <div className="contact-ripple"></div>
                            </div>
                            <div className="contact-item" data-aos="slide-left" data-aos-duration="600" data-aos-delay="600">
                                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                                <div className="contact-details">
                                    <h4>Email</h4>
                                    <p>info@almouedtravel.com</p>
                                </div>
                                <div className="contact-ripple"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
