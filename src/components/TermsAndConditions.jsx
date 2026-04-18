import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

const TermsAndConditions = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init();
    }, []);

    return (
        <div className="legal-page terms-conditions">
            <section className="section page-header" style={{ background: 'linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)), url("/images/destinations-hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h1 data-aos="fade-up">Terms and Conditions</h1>
                    <p data-aos="fade-up" data-aos-delay="100">Please read these terms carefully before using our services.</p>
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
                        <h2>1. Agreement to Terms</h2>
                        <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Almoued Travel (“we,” “us” or “our”), concerning your access to and use of our website and services.</p>

                        <h2>2. Services Provided</h2>
                        <p>Almoued Travel acts as an agent for third-party suppliers, such as airlines, hotels, and tour operators. We are not responsible for the acts or omissions of these suppliers or their failure to provide services or adhere to their own schedules.</p>

                        <h2>3. Booking and Payment</h2>
                        <p>All bookings are subject to availability at the time of reservation. A booking is only confirmed once full payment or the required deposit has been received and we have issued a confirmation invoice. Prices are subject to change until the booking is confirmed.</p>

                        <h2>4. Cancellation and Refund Policy</h2>
                        <p>Cancellations by the customer must be made in writing. Cancellation fees depend on the specific supplier (airline, hotel, etc.) and the timing of the cancellation. Refunds, if applicable, will be processed back to the original mode of payment and may take several business days.</p>

                        <h2>5. Travel Documents</h2>
                        <p>It is the customer's responsibility to ensure they possess valid travel documents, including passports (valid for at least 6 months), visas, and health certificates. Almoued Travel is not liable for any consequences resulting from invalid or missing documentation.</p>

                        <h2>6. Travel Insurance</h2>
                        <p>We strongly recommend that all customers purchase comprehensive travel insurance at the time of booking to cover potential losses due to cancellation, medical emergencies, or baggage loss.</p>

                        <h2>7. Limitation of Liability</h2>
                        <p>To the maximum extent permitted by law, Almoued Travel shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of our services or any travel arrangements made through us.</p>

                        <h2>8. Governing Law</h2>
                        <p>These terms shall be governed by and defined following the laws of the United Arab Emirates. Almoued Travel and yourself irrevocably consent that the courts of Abu Dhabi shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>

                        <h2>9. Contact Us</h2>
                        <p>In order to resolve a complaint regarding our services or to receive further information regarding use of our services, please contact us at:</p>
                        <p>Almoued Travel<br />Musaffah - Shabiya ME-11<br />Abu Dhabi, UAE<br />Phone: +971 2 552 2238<br />Email: info@almouedtravel.com</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;
