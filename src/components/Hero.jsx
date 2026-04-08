import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-video">
        <video autoPlay muted loop playsInline>
          <source 
            src="/images/freepik__cinematic-4k-aerial-drone-footage-transitioning-th__80630.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="800">
            <i className="fas fa-sparkles"></i>
            <span>Welcome to Almoued Travel</span>
          </div>

          <h1 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="1000">
            A Journey Has The Potential To <span className="highlight">Enhance The Beauty</span> Of Our Life
          </h1>

          <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1200">
            At Almoued Travel, we believe that every journey creates lasting memories. Connect with our
            experienced travel professionals who understand your unique travel needs and make your dreams come
            true.
          </p>

          <div className="hero-buttons" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1400">
            <Link to="/destinations" className="btn-primary">
              <span>Discover Destinations</span>
              <div className="btn-shine"></div>
            </Link>
            <Link to="/contact" className="btn-secondary">
              <span>Book Your Trip</span>
              <i className="fas fa-play-circle"></i>
            </Link>
          </div>

          <div className="floating-elements">
            <div className="floating-element" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1600">
              <i className="fas fa-plane"></i>
            </div>
            <div className="floating-element" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1800">
              <i className="fas fa-globe-americas"></i>
            </div>
            <div className="floating-element" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="2000">
              <i className="fas fa-suitcase-rolling"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="2200">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
