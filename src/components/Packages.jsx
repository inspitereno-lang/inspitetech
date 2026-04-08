import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../api';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                // Fetch curated home content
                const response = await api.get('/home/content');
                if (response.data.packages) {
                    setPackages(response.data.packages);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching packages:', error);
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) return null;
    if (packages.length === 0) return null;

    return (
        <section className="section packages" id="packages">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">PACKAGES</div>
                    <h2 className="section-title">
                        Tour <span className="highlight">Packages</span>
                    </h2>
                    <p className="section-subtitle">
                        Specially designed travel packages for unforgettable experiences
                    </p>
                </div>

                <div className="services-grid">
                    {packages.map((pkg, index) => (
                        <Link 
                            key={pkg._id || index} 
                            to={`/packages/${pkg.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="service-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay={(index % 3) * 200}>
                                <div className="service-image">
                                    <img 
                                        loading="lazy" 
                                        src={pkg.image} 
                                        alt={pkg.title} 
                                    />
                                    {/* Small badge for category if needed, but keeping it clean for homepage consistency */}
                                    <div className="service-overlay">
                                        <i className="fas fa-suitcase-rolling"></i>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>{pkg.title}</h3>
                                    <p>{pkg.description ? pkg.description.substring(0, 100) + '...' : ''}</p>
                                    <div className="service-arrow">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                                <div className="service-glow"></div>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '50px' }} data-aos="fade-up">
                    <Link to="/packages" className="btn btn-primary">
                        View All Packages
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Packages;
