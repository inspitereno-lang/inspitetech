import React from 'react';
import ServicesHero from './ServicesPage/ServicesHero';
import ServicesGrid from './ServicesPage/ServicesGrid';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
    return (
        <div className="services-page">
            <ServicesHero />
            <ServicesGrid />

            {/* Call to Action */}
            <section className="section about-cta">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in" data-aos-duration="1000">
                        <h2>Ready for Your Next Trip?</h2>
                        <p>
                            Contact our experts to get the best deals on flights, hotels, and
                            more.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary" style={{ background: 'white', color: '#009af0' }}>
                                <span>Get a Quote</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
