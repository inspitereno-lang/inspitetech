import React from 'react';
import { Link } from 'react-router-dom';

const JoinUs = () => {
    return (
        <section className="join-us-section" data-aos="fade-up">
            <div className="join-us-bg"></div>
            <div className="join-us-content">
                <h2 data-aos="fade-up" data-aos-duration="1000">Passion for Travel?</h2>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    We are always looking for talented individuals to join our growing team.
                </p>
                <Link 
                    to="/contact" 
                    className="btn-white-outline"
                    data-aos="fade-up" 
                    data-aos-duration="1000" 
                    data-aos-delay="400"
                >
                    Join Our Team <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </section>
    );
};

export default JoinUs;
