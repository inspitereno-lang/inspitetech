import React from 'react';

const ServicesHero = () => {
    return (
        <section className="page-hero">
            <div className="page-hero-bg">
                <img fetchPriority="high" src="/images/ab2.jpg" alt="Our Services" />
            </div>
            <div className="page-hero-overlay"></div>
            <div className="page-hero-content">
                <div className="page-hero-badge">
                    <i className="fas fa-star"></i>
                    <span>World Class Services</span>
                </div>
                <h1>Experience <span className="highlight">Seamless Travel</span></h1>
                <p>
                    From flight bookings to luxury accommodations, we handle every detail
                    so you can focus on making memories.
                </p>
            </div>
        </section>
    );
};

export default ServicesHero;
