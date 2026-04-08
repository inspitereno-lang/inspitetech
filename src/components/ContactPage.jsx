import React, { useEffect } from 'react';
import ContactHero from './ContactPage/ContactHero';
import ContactForm from './ContactPage/ContactForm';
import ContactInfo from './ContactPage/ContactInfo';
import BranchesSection from './ContactPage/BranchesSection';
import FAQSection from './ContactPage/FAQSection';
import AOS from 'aos';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();

        // Parallax Effect
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const heroBg = document.querySelector('#contactHeroImg');
            if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="contact-page">
            <ContactHero />
            
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <ContactForm />
                        <ContactInfo />
                    </div>
                    
                    <BranchesSection />
                    <FAQSection />
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
