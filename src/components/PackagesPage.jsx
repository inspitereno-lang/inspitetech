import React from 'react';
import PackagesHero from './PackagesPage/PackagesHero';
import HowItWorks from './PackagesPage/HowItWorks';
import PackagesGrid from './PackagesPage/PackagesGrid';
import { Link } from 'react-router-dom';

const PackagesPage = () => {
    return (
        <div className="packages-page">
            <PackagesHero />
            <HowItWorks />
            <PackagesGrid />
            
            {/* Call to Action */}
            <section className="section about-cta">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in" data-aos-duration="1000">
                        <h2>Tailor Your Experience</h2>
                        <p>Want something different? We can customize any package to your liking.</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary" style={{ background: 'white', color: '#009af0' }}>
                                <span>Customize Now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PackagesPage;
