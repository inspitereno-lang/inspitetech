import React, { useEffect, useRef } from 'react';

const TeamHero = () => {
    const heroImgRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroImgRef.current) {
                const scrolled = window.pageYOffset;
                heroImgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="page-hero">
            <div className="page-hero-bg">
                <img
                    ref={heroImgRef}
                    loading="lazy"
                    src="/images/coreteam.jpg"
                    alt="Our Core Team"
                    style={{ transition: 'transform 0.1s ease-out' }}
                />
            </div>
            <div className="page-hero-overlay"></div>
            <div className="page-hero-content">
                <div className="page-hero-badge" data-aos="fade-down" data-aos-duration="1000">
                    <i className="fas fa-users"></i>
                    <span>Meet Our Experts</span>
                </div>
                <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    The Minds Behind <br /><span className="highlight">Your Adventures</span>
                </h1>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    A dedicated team of travel enthusiasts, industry veterans, and
                    destination specialists working together to make your dream journeys
                    a reality.
                </p>
            </div>
        </section>
    );
};

export default TeamHero;
