import React from 'react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
    return (
        <section className="section about-cta">
            <div className="container">
                <div className="cta-content" data-aos="zoom-in" data-aos-duration="1000">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>
                        Let our expert team help you plan the perfect travel experience.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn-primary">
                            <span>Contact Us Today</span>
                            <div className="btn-shine"></div>
                        </Link>
                        <Link to="/packages" className="btn-secondary">
                            <span>View Packages</span>
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
