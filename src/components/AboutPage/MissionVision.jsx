import React from 'react';

const MissionVision = () => {
    return (
        <section className="section mission-vision">
            <div className="container">
                <div className="mv-grid">
                    <div className="mv-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                        <div className="mv-icon">
                            <i className="fas fa-bullseye"></i>
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To provide world-class travel services through innovative
                            solutions, exceptional customer care, and sustainable practices.
                            We strive to make every journey memorable by offering personalized
                            experiences that exceed expectations and create lasting memories
                            for our clients.
                        </p>
                        <div className="mv-glow"></div>
                    </div>
                    <div className="mv-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                        <div className="mv-icon">
                            <i className="fas fa-eye"></i>
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            To become the most trusted and preferred travel partner globally,
                            recognized for excellence in service delivery, innovation in
                            travel solutions, and commitment to sustainable tourism. We
                            envision a world where travel enriches lives and connects
                            cultures.
                        </p>
                        <div className="mv-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
