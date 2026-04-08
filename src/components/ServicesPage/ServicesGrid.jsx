import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const ServicesGrid = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services/active');
                setServices(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return (
        <section className="section services">
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="loader"></div>
            </div>
        </section>
    );

    return (
        <section className="section services" id="services">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">SERVICES</div>
                    <h2 className="section-title">
                        Our <span className="highlight">Services</span>
                    </h2>
                    <p className="section-subtitle">
                        Comprehensive travel solutions tailored to your unique needs
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <Link 
                            key={service.id || index} 
                            to={`/services/${service.id}`}
                            className="service-card-premium"
                            data-aos="fade-up" 
                            data-aos-duration="800" 
                            data-aos-delay={(index % 3) * 200}
                        >
                            <div className="service-card-image">
                                <img 
                                    loading="lazy" 
                                    src={service.image} 
                                    alt={service.title} 
                                />
                            </div>
                            <div className="service-card-overlay"></div>
                            <div className="service-card-content">
                                <div className="service-card-icon">
                                    <i className={`fas ${service.icon || 'fa-concierge-bell'}`}></i>
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.subtitle || (service.description ? service.description.substring(0, 100) + '...' : '')}</p>
                                <div className="service-card-action">
                                    <span>View Details</span>
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

export default ServicesGrid;
