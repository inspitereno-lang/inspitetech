import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });

        // Simple counter animation logic if needed, 
        // but since we are making it static, we just show the numbers or use a simple useEffect
    }, []);

    return (
        <section className="section about" id="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-left" data-aos="fade-right" data-aos-duration="1000">
                        <div className="reviews-section" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="200">
                            <div className="stars">
                                <i className="fas fa-star" data-aos="zoom-in" data-aos-delay="300"></i>
                                <i className="fas fa-star" data-aos="zoom-in" data-aos-delay="400"></i>
                                <i className="fas fa-star" data-aos="zoom-in" data-aos-delay="500"></i>
                                <i className="fas fa-star" data-aos="zoom-in" data-aos-delay="600"></i>
                                <i className="fas fa-star" data-aos="zoom-in" data-aos-delay="700"></i>
                            </div>
                            <p className="review-text">Customer Reviews <strong className="counter">15000+</strong></p>
                            <div className="avatars">
                                <div className="avatar" data-aos="flip-left" data-aos-delay="800"></div>
                                <div className="avatar" data-aos="flip-left" data-aos-delay="900"></div>
                                <div className="avatar" data-aos="flip-left" data-aos-delay="1000"></div>
                                <div className="avatar" data-aos="flip-left" data-aos-delay="1100"></div>
                                <div className="avatar plus" data-aos="flip-left" data-aos-delay="1200">15k+</div>
                            </div>
                        </div>

                        <div className="therapy-images">
                            <div className="therapy-image-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <img loading="lazy" src="/images/ab2.jpg" alt="Office Building" />
                                <div className="image-overlay">
                                    <i className="fas fa-building"></i>
                                    <span>Our Office</span>
                                </div>
                            </div>
                            <div className="therapy-image-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                <img loading="lazy" src="/images/ab3.jpg" alt="Team Working" />
                                <div className="image-overlay">
                                    <i className="fas fa-users"></i>
                                    <span>Our Team</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-right" data-aos="fade-left" data-aos-duration="1000">
                        <div className="section-header">
                            <div className="section-label" data-aos="fade-up" data-aos-duration="600">ABOUT US</div>
                            <h2 className="section-title" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                                Welcome To <span className="highlight">Al Moued Travel </span>
                            </h2>
                        </div>

                        <p className="about-description" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                            Almoued Travel is the leading travel company with strong presence in GCC and India. We offer a
                            complete travel management, everything from planning to execution of tours. Almoued has carved a
                            niche for itself within a short span of time through uncompromising standards in quality of
                            services and selection of associates.
                        </p>
                        <p className="about-description" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                            Implementation of innovative strategies, strong commitment, and an insatiable quest for success
                            coupled with highly motivated professional team, helped Almoued to seek new horizons in the
                            travel industry and beyond. Our core strength is our well trained qualified and experienced team
                            efficient to meet the complexities of the travel and tour services and managements.
                        </p>
                        <p className="about-description" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                            Our strong mission to offer quality and standard services to our customer fulfilled by our team
                            has earned a niche brand name for our products and services.
                        </p>

                        <div className="mission-section">
                            <h3 data-aos="fade-up" data-aos-duration="600" data-aos-delay="800">We are a community-driven
                                initiative on a mission to:</h3>
                            <div className="mission-items">
                                <div className="mission-item" data-aos="slide-right" data-aos-duration="800" data-aos-delay="1000">
                                    <div className="mission-icon">
                                        <i className="fas fa-globe-americas"></i>
                                    </div>
                                    <span>Spread travel awareness through accessible experiences</span>
                                    <div className="mission-hover-effect"></div>
                                </div>
                                <div className="mission-item" data-aos="slide-right" data-aos-duration="800" data-aos-delay="1200">
                                    <div className="mission-icon">
                                        <i className="fas fa-users"></i>
                                    </div>
                                    <span>Provide world-class service through certified travel professionals</span>
                                    <div className="mission-hover-effect"></div>
                                </div>
                                <div className="mission-item" data-aos="slide-right" data-aos-duration="800" data-aos-delay="1400">
                                    <div className="mission-icon">
                                        <i className="fas fa-heart"></i>
                                    </div>
                                    <span>Create memorable experiences that enhance life's beauty for everyone</span>
                                    <div className="mission-hover-effect"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
