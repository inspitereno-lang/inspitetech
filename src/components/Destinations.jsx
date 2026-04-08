import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../api';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                // Fetch curated home content
                const response = await api.get('/home/content');
                if (response.data.destinations) {
                    setDestinations(response.data.destinations);
                }
                // Check if we should show this section (handled by backend returning empty array if hidden, 
                // but we can also handle it explicitly if we add a settings check here)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching destinations:', error);
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    if (loading) return null; // No loader on homepage for secondary sections
    if (destinations.length === 0) return null; // Hide section if no items or toggled off

    return (
        <section className="section destinations" id="destinations">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">DESTINATIONS</div>
                    <h2 className="section-title">
                        Popular <span className="highlight">Destinations</span>
                    </h2>
                    <p className="section-subtitle">
                        Explore the world's most beautiful and exciting destinations
                    </p>
                </div>

                <div className="services-grid">
                    {destinations.map((dest, index) => (
                        <Link 
                            key={dest.id || index} 
                            to={`/destinations/${dest.id}`} 
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="service-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay={(index % 3) * 200}>
                                <div className="service-image">
                                    <img 
                                        loading="lazy" 
                                        src={dest.image} 
                                        alt={dest.name} 
                                    />
                                    <div className="service-overlay">
                                        <i className={`fas ${dest.icon || 'fa-map-marker-alt'}`}></i>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>{dest.name}</h3>
                                    <p>{dest.tagline || (dest.description ? dest.description.substring(0, 100) + '...' : '')}</p>
                                    <div className="service-arrow">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                                <div className="service-glow"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
