import React from 'react';

const ContactHero = () => {
    return (
        <section className="page-hero">
            <div className="page-hero-bg">
                <img id="contactHeroImg" fetchPriority="high" src="/images/contactus.jpg" alt="Contact Us" />
            </div>
            <div className="page-hero-overlay"></div>
            <div className="page-hero-content" data-aos="fade-up" data-aos-duration="1000">
                <div className="page-hero-badge">
                    <i className="fas fa-comments"></i>
                    <span>We'd Love to Hear From You</span>
                </div>
                <h1>Get In <span className="highlight">Touch</span></h1>
                <p>Ready to plan your next adventure? Our team is here to answer your questions and create the perfect
                    itinerary for you.</p>
            </div>
        </section>
    );
};

export default ContactHero;
