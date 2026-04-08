import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'general',
        message: ''
    });
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        
        // Show success toast
        setShowToast(true);
        
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: 'general',
            message: ''
        });

        // Hide toast after 5 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    return (
        <div className="contact-form-wrapper" data-aos="fade-up" data-aos-duration="800">
            <h2>Send us a Message</h2>
            <form id="contact-form" onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="firstName" 
                            className="form-control" 
                            placeholder=" " 
                            required 
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <label htmlFor="firstName" className="form-label">First Name</label>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="lastName" 
                            className="form-control" 
                            placeholder=" " 
                            required 
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                    </div>
                </div>

                <div className="form-group">
                    <input 
                        type="email" 
                        id="email" 
                        className="form-control" 
                        placeholder=" " 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="email" className="form-label">Email Address</label>
                </div>

                <div className="form-group">
                    <select 
                        id="subject" 
                        className="form-control form-select"
                        value={formData.subject}
                        onChange={handleChange}
                    >
                        <option value="general">General Inquiry</option>
                        <option value="booking">Flight Booking</option>
                        <option value="visa">Visa Assistance</option>
                        <option value="holiday">Holiday Package</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <textarea 
                        id="message" 
                        className="form-control" 
                        placeholder=" " 
                        required
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    <label htmlFor="message" className="form-label">Your Message</label>
                </div>

                <button type="submit" className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '18px' }}>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>

            {/* Success Toast Notification */}
            <div id="successToast" className={`toast-notification ${showToast ? 'show' : ''}`} style={{ display: showToast ? 'block' : 'none' }}>
                <div className="toast-content">
                    <i className="fas fa-check-circle toast-icon"></i>
                    <div className="toast-message">
                        <h4>Message Sent!</h4>
                        <p>Thanks! We'll be in touch soon.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
