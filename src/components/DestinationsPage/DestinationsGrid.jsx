import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const DestinationsGrid = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await api.get('/destinations/active');
                setDestinations(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching destinations:', error);
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    if (loading) return (
        <section className="section destinations">
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="loader"></div>
            </div>
        </section>
    );

    return (
        <section className="section destinations" id="destinations">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
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
                            className="service-card-premium"
                            data-aos="fade-up" 
                            data-aos-duration="800" 
                            data-aos-delay={(index % 3) * 200}
                        >
                            <div className="service-card-image">
                                <img 
                                    loading="lazy" 
                                    src={dest.image} 
                                    alt={dest.name} 
                                />
                            </div>
                            <div className="service-card-overlay"></div>
                            <div className="service-card-content">
                                <div className="service-card-icon">
                                    <i className={`fas ${dest.icon || 'fa-map-marker-alt'}`}></i>
                                </div>
                                <h3>{dest.name}</h3>
                                <p>{dest.tagline || (dest.description ? dest.description.substring(0, 100) + '...' : '')}</p>
                                <div className="service-card-action">
                                    <span>Explore Tips</span>
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DestinationsGrid;
