import React from 'react';
import DestinationsHero from './DestinationsPage/DestinationsHero';
import DestinationsGrid from './DestinationsPage/DestinationsGrid';
import { Link } from 'react-router-dom';

const DestinationsPage = () => {
    return (
        <div className="destinations-page">
            <DestinationsHero />

            {/* Travel Stats Section */}
            <section className="section about-overview">
                <div className="container">
                    <div className="about-stats" data-aos="fade-up" data-aos-duration="800">
                        <div className="stat-item">
                            <div className="stat-icon"><i className="fas fa-map-marked-alt"></i></div>
                            <div className="stat-content">
                                <h3>100+</h3>
                                <p>Global Destinations</p>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><i className="fas fa-concierge-bell"></i></div>
                            <div className="stat-content">
                                <h3>24/7</h3>
                                <p>Travel Support</p>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><i className="fas fa-smile"></i></div>
                            <div className="stat-content">
                                <h3>98%</h3>
                                <p>Client Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DestinationsGrid />

            {/* Call to Action */}
            <section className="section about-cta">
                <div className="container">
                    <div className="cta-content" data-aos="zoom-in" data-aos-duration="1000">
                        <h2>Plan Your Dream Vacation</h2>
                        <p>Not sure where to go? Let our experts help you craft the perfect itinerary.</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary" style={{ background: 'white', color: '#009af0' }}>
                                <span>Contact Us Now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DestinationsPage;
