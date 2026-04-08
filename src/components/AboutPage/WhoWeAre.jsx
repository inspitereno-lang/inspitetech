import React, { useState, useEffect, useRef } from 'react';

const StatItem = ({ target, icon, label, delay }) => {
    const [count, setCount] = useState(0);
    const observerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const duration = 2000;
                const increment = Math.ceil(target / (duration / 16));
                
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) {
                        setCount(target);
                        clearInterval(timer);
                    } else {
                        setCount(start);
                    }
                }, 16);
                
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [target]);

    return (
        <div className="stat-item" ref={observerRef}>
            <div className="stat-icon">
                <i className={`fas ${icon}`}></i>
            </div>
            <div className="stat-content">
                <h3 className="counter">{count}</h3>
                <p>{label}</p>
            </div>
        </div>
    );
};

const WhoWeAre = () => {
    return (
        <section className="section about-overview">
            <div className="container">
                <div className="about-grid">
                    <div className="about-overview-left" data-aos="fade-right" data-aos-duration="1000">
                        <div className="section-header">
                            <div className="section-label">WHO WE ARE</div>
                            <h2 className="section-title">
                                Welcome To <span className="highlight">Almoued Travel</span>
                            </h2>
                        </div>
                        <p className="about-text">
                            Almoued Travel is the leading travel company with a strong
                            presence in GCC and India. We offer complete travel management,
                            everything from planning to execution of tours. Almoued has carved
                            a niche for itself within a short span of time through
                            uncompromising standards in quality of services and selection of
                            associates.
                        </p>
                        <p className="about-text">
                            Implementation of innovative strategies, strong commitment, and an
                            insatiable quest for success coupled with a highly motivated
                            professional team, helped Almoued to seek new horizons in the
                            travel industry and beyond. Our core strength is our well-trained,
                            qualified, and experienced team efficient to meet the complexities
                            of travel and tour services and management.
                        </p>
                        <div className="about-stats" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                            <StatItem target={15000} icon="fa-users" label="Happy Customers" />
                            <StatItem target={100} icon="fa-globe-americas" label="Countries Covered" />
                            <StatItem target={10} icon="fa-award" label="Years Experience" />
                        </div>
                    </div>
                    <div className="about-overview-right" data-aos="fade-left" data-aos-duration="1000">
                        <div className="about-image-grid">
                            <div className="about-img about-img-1">
                                <img loading="lazy" src="/images/ab2.jpg" alt="Our Office" />
                                <div className="img-overlay">
                                    <i className="fas fa-building"></i>
                                    <span>Our Office</span>
                                </div>
                            </div>
                            <div className="about-img about-img-2">
                                <img loading="lazy" src="/images/ab3.jpg" alt="Our Team" />
                                <div className="img-overlay">
                                    <i className="fas fa-users"></i>
                                    <span>Our Team</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
