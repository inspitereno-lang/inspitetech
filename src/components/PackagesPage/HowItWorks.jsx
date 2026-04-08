import React from 'react';

const HowItWorks = () => {
    const steps = [
        { id: '01', title: 'Choose Package', icon: 'fas fa-search' },
        { id: '02', title: 'Customize', icon: 'fas fa-user-edit' },
        { id: '03', title: 'Book & Pay', icon: 'fas fa-file-invoice-dollar' },
        { id: '04', title: 'Travel', icon: 'fas fa-plane-departure' }
    ];

    return (
        <section className="section about-overview">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <div className="section-label">HOW IT WORKS</div>
                    <h2 className="section-title">Simple <span class="highlight">Process</span></h2>
                </div>
                <div className="about-stats four-col">
                    {steps.map((step, index) => (
                        <div key={index} className="stat-item" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                            <div className="stat-icon"><i className={step.icon}></i></div>
                            <div className="stat-content">
                                <h3>{step.id}</h3>
                                <p>{step.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
