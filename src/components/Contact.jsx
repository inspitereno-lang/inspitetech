import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useToast } from '../context/ToastContext';

const Contact = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'general', // Added subject
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        
        const templateParams = {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
        };

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            
            toast.success('Your message has been sent successfully. We will get back to you soon!', 'Message Sent');
            setStatus('success');
            
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: 'general',
                message: ''
            });

            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            toast.error('Failed to send message. Please check your connection and try again.', 'Send Failed');
            setStatus('error');
        }
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
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input type="text" name="firstName" id="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input type="text" name="lastName" id="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="400">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} required />
                                </div>

                                <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="500">
                                    <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                                    <input type="tel" name="phone" id="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                                </div>

                                <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="550">
                                    <label htmlFor="subject" className="form-label">Inquiry Type</label>
                                    <select 
                                        name="subject" 
                                        id="subject"
                                        className="form-control form-select"
                                        style={{ width: '100%', padding: '12px 16px' }}
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="booking">Flight Booking</option>
                                        <option value="visa">Visa Assistance</option>
                                        <option value="holiday">Holiday Package</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group" data-aos="fade-up" data-aos-duration="600" data-aos-delay="600">
                                    <label htmlFor="message" className="form-label">Your Message</label>
                                    <textarea name="message" id="message" className="form-control" rows="5" value={formData.message} onChange={handleChange} required></textarea>
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
