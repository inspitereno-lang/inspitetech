import React from 'react';

const values = [
    { title: 'Trust & Integrity', desc: 'Building lasting relationships through transparency, honesty, and ethical practices in every interaction.', icon: 'fa-shield-alt', delay: 200 },
    { title: 'Excellence', desc: 'Committed to delivering exceptional quality in every service, exceeding customer expectations consistently.', icon: 'fa-star', delay: 300 },
    { title: 'Innovation', desc: 'Embracing new technologies and creative solutions to enhance travel experiences and streamline services.', icon: 'fa-lightbulb', delay: 400 },
    { title: 'Customer First', desc: 'Placing our customers at the heart of everything we do, ensuring personalized and attentive service.', icon: 'fa-heart', delay: 500 },
    { title: 'Partnership', desc: 'Collaborating with the best global partners to provide seamless and comprehensive travel solutions.', icon: 'fa-handshake', delay: 600 },
    { title: 'Sustainability', desc: 'Promoting responsible tourism practices that protect our planet for future generations.', icon: 'fa-leaf', delay: 700 },
];

const CoreValues = () => {
    return (
        <section className="section core-values">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">OUR VALUES</div>
                    <h2 className="section-title">
                        What <span className="highlight">Drives Us</span>
                    </h2>
                    <p className="section-subtitle">
                        The principles that guide everything we do at Almoued Travel
                    </p>
                </div>

                <div className="values-grid">
                    {values.map((v, i) => (
                        <div key={i} className="value-card" data-aos="zoom-in" data-aos-duration="600" data-aos-delay={v.delay}>
                            <div className="value-icon">
                                <i className={`fas ${v.icon}`}></i>
                            </div>
                            <h3>{v.title}</h3>
                            <p>{v.desc}</p>
                            <div className="value-ripple"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;
