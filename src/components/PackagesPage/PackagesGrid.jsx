import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const PackagesGrid = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.get('/packages/active');
                setPackages(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching packages:', error);
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) return (
        <section className="section packages">
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="loader"></div>
            </div>
        </section>
    );

    return (
        <section className="section packages">
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
                            to={`/packages/${pkg.slug || pkg._id}`}
                            className="service-card-premium"
                            data-aos="fade-up" 
                            data-aos-duration="800" 
                            data-aos-delay={(index % 3) * 200}
                        >
                            <div className="service-card-image">
                                <img 
                                    loading="lazy" 
                                    src={pkg.image} 
                                    alt={pkg.title} 
                                />
                                {/* Package Overlays */}
                                <div className="package-badge" style={{ zIndex: 10 }}>{pkg.categoryTag || 'Adventure'}</div>
                                <div className="package-price" style={{ zIndex: 10 }}>{pkg.price || 'Enquire'}</div>
                            </div>
                            <div className="service-card-overlay"></div>
                            <div className="service-card-content">
                                <div className="service-card-icon">
                                    <i className="fas fa-suitcase-rolling"></i>
                                </div>
                                
                                <div className="package-meta" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                                    <span><i className="far fa-clock"></i> {pkg.duration}</span>
                                </div>
                                
                                <h3>{pkg.title}</h3>
                                <p>{pkg.description ? pkg.description.substring(0, 100) + '...' : ''}</p>
                                
                                <div className="service-card-action">
                                    <span>View Itinerary</span>
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

export default PackagesGrid;
