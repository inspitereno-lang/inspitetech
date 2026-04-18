import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init();
    }, []);

    return (
        <div className="legal-page privacy-policy">
            <section className="section page-header" style={{ background: 'linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)), url("/images/about-hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h1 data-aos="fade-up">Privacy Policy</h1>
                    <p data-aos="fade-up" data-aos-delay="100">Your privacy is important to us. Learn how we handle your data.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="back-btn" 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            marginBottom: '30px', 
                            background: 'none', 
                            border: 'none', 
                            color: 'var(--blue)', 
                            fontWeight: '600', 
                            cursor: 'pointer',
                            fontSize: '1.1rem'
                        }}
                    >
                        <i className="fas fa-arrow-left"></i> Back
                    </button>
                    <div className="legal-content" data-aos="fade-up" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                        <h2>1. Introduction</h2>
                        <p>Welcome to Almoued Travel. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at info@almouedtravel.com.</p>

                        <h2>2. Information We Collect</h2>
                        <p>We collect personal information that you provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on our website or otherwise contact us.</p>
                        <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect can include the following:</p>
                        <ul>
                            <li>Name and Contact Data (Email address, phone number, etc.)</li>
                            <li>Credentials (Passwords and similar security information)</li>
                            <li>Payment Data (Data necessary to process your payment if you make purchases)</li>
                            <li>Travel Documents (Passport details for visa and booking services)</li>
                        </ul>

                        <h2>3. How We Use Your Information</h2>
                        <p>We use personal information collected via our website for a variety of business purposes described below:</p>
                        <ul>
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send you marketing and promotional communications.</li>
                            <li>To fulfill and manage your bookings.</li>
                            <li>To request feedback.</li>
                            <li>To protect our services.</li>
                        </ul>

                        <h2>4. Sharing Your Information</h2>
                        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. This may include sharing with airlines, hotels, and visa authorities.</p>

                        <h2>5. Data Security</h2>
                        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

                        <h2>6. Your Privacy Rights</h2>
                        <p>In some regions, such as the UAE, you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.</p>

                        <h2>7. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may email us at info@almouedtravel.com or by post to:</p>
                        <p>Almoued Travel<br />Musaffah - Shabiya ME-11<br />Abu Dhabi, UAE</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
