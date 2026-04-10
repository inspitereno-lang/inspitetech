import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../api';

const defaultServices = [
    { title: 'Air Tickets', icon: 'fa-plane' },
    { title: 'Global Visa Services', icon: 'fa-passport' },
    { title: 'Hotel Bookings', icon: 'fa-hotel' },
    { title: 'Euro Rail Bookings', icon: 'fa-train' },
    { title: 'Group Departures', icon: 'fa-users' },
    { title: 'Inside Airport Assistance', icon: 'fa-concierge-bell' },
    { title: 'MICE', icon: 'fa-handshake' },
    { title: 'Travel Medical Insurance', icon: 'fa-shield-alt' },
    { title: 'Passport Assistance', icon: 'fa-id-card' },
    { title: 'Umrah Assistance', icon: 'fa-pray' },
    { title: 'Car Rental Services', icon: 'fa-car' },
    { title: 'Airport Transfers', icon: 'fa-shuttle-van' },
    { title: 'Holiday Packages', icon: 'fa-umbrella-beach' },
    { title: 'Corporate Travel', icon: 'fa-briefcase' },
    { title: 'Document Attestation', icon: 'fa-certificate' },
    { title: 'Private Jet Booking', icon: 'fa-plane-departure' },
    { title: 'Student Tours', icon: 'fa-graduation-cap' },
    { title: 'Medical Tourism', icon: 'fa-stethoscope' }
];

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/home/content');
                if (response.data.services) {
                    setServices(response.data.services);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
                setServices(defaultServices);
                setLoading(false);
            }
        };
        fetchServices();
        AOS.init();
    }, []);

    if (loading) return null;
    if (services.length === 0) return null;

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
                        <div 
                            key={service._id || index} 
                            className="service-stat-card" 
                            data-aos="slide-right" 
                            data-aos-duration="800" 
                            data-aos-delay={(index % 4) * 100}
                        >
                            <div className="service-icon">
                                <i className={`fas ${service.icon || 'fa-concierge-bell'}`}></i>
                            </div>
                            <span>{service.title}</span>
                            <div className="service-hover-effect"></div>
                            <Link to={service._id ? `/services/${service._id}` : "/services"} className="service-card-link" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }} aria-label={service.title}></Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
