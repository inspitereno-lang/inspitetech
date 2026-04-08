import React from 'react';
import { Link } from 'react-router-dom';

const AboutHero = () => {
    return (
        <section className="page-hero">
            <div className="page-hero-bg">
                <img loading="lazy" src="/images/ab3.jpg" alt="About Almoued Travel" />
            </div>
            <div className="page-hero-overlay"></div>

            <div className="page-hero-content">
                <div className="page-hero-badge">
                    <i className="fas fa-info-circle"></i>
                    <span>About Almoued Travel</span>
                </div>
                <h1>Your Journey, <span className="highlight">Our Passion</span></h1>
                <p>
                    Leading the travel industry with excellence, innovation, and unmatched
                    dedication to creating unforgettable travel experiences across the globe.
                </p>
            </div>
        </section>
    );
};

export default AboutHero;

