import React from 'react';

const PackagesHero = () => {
    return (
        <section className="page-hero">
            <div className="page-hero-bg">
                <img fetchpriority="high" src="/images/packages.jpg" alt="Tour Packages" />
            </div>
            <div className="page-hero-overlay"></div>
            <div className="page-hero-content">
                <div className="page-hero-badge">
                    <i className="fas fa-suitcase-rolling"></i>
                    <span>All Inclusive Packages</span>
                </div>
                <h1>
                    Journeys <span className="highlight">Designed For You</span>
                </h1>
                <p>
                    Choose from our range of meticulously planned holiday packages. Whether you seek adventure, relaxation,
                    or culture, we have it all.
                </p>
            </div>
        </section>
    );
};

export default PackagesHero;
