import React from 'react';

const DestinationsHero = () => {
    return (
        <section className="page-hero">
            <div className="page-hero-bg">
                <img fetchpriority="high" src="/images/ab4.jpeg" alt="Destinations" />
            </div>
            <div className="page-hero-overlay"></div>
            <div className="page-hero-content">
                <div className="page-hero-badge">
                    <i className="fas fa-globe-americas"></i>
                    <span>Explore The World</span>
                </div>
                <h1>
                    Your Next <span className="highlight">Adventure Awaits</span>
                </h1>
                <p>
                    Discover breathtaking destinations, hidden gems, and unforgettable experiences curated just for you.
                </p>
            </div>
        </section>
    );
};

export default DestinationsHero;
