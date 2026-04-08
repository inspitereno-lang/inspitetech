import React from 'react';

const WhatsAppFloat = () => {
    return (
        <a href="https://wa.me/97125522238?text=Hello%20Almoued%20Travel!%20I%20would%20like%20to%20inquire%20about%20your%20services."
            className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
            data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1000">
            <i className="fab fa-whatsapp"></i>
            <span className="whatsapp-tooltip">Chat with us!</span>
            <div className="whatsapp-pulse"></div>
        </a>
    );
};

export default WhatsAppFloat;
