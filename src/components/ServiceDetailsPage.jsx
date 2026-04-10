import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import api, { getVisaCountries } from '../api';
import './ServiceDetailsPage/ServiceDetails.css';

const ServiceDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [others, setOthers] = useState([]);

    // Visa specific states
    const [visaCountries, setVisaCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [detailView, setDetailView] = useState(false);

    useEffect(() => {
        // Default slug if none provided (though route usually handles this)
        const currentSlug = slug || 'visa';

        const fetchService = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/services/${currentSlug}`);
                setData(response.data);

                // Fetch other services for sidebar
                const othersResponse = await api.get('/services/active');
                setOthers(othersResponse.data.filter(s => s.slug !== currentSlug && s._id !== data?._id));

                // Fetch visa countries if this is the visa service
                // Robust check: slug contains visa, OR title contains 'Visa'
                const isVisaService = currentSlug.includes('visa') || 
                                     (response.data?.title && response.data.title.toLowerCase().includes('visa'));

                if (isVisaService) {
                    const visaResponse = await getVisaCountries();
                    setVisaCountries(visaResponse.data);
                }
            } catch (error) {
                console.error('Error fetching service:', error);
                if (currentSlug.includes('visa')) {
                    // Critical fallback if visa service is missing from DB
                    setData({
                        title: 'Global Visa Services',
                        slug: 'visa',
                        description: 'Navigating visa requirements can be complex. Our experts provide end-to-end assistance.',
                        image: '/images/ab2.jpg',
                        icon: 'fa-passport'
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchService();
        setSelectedCountry(null);
        setDetailView(false);
        window.scrollTo(0, 0);

        // Update URL if we defaulted (rare with current routes)
        if (!slug) {
            navigate('/services/visa', { replace: true });
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (!loading) {
            AOS.refresh();
        }
    }, [loading, detailView]);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        setDetailView(true);
        // Smooth scroll to the content section
        const contentEl = document.querySelector('.service-main');
        if (contentEl) {
            window.scrollTo({
                top: contentEl.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return (
        <div className="premium-loader-container">
            <div className="loader"></div>
            <p>Loading premium travel services...</p>
        </div>
    );

    if (!data) {
        return (
            <div className="container" style={{ paddingTop: '200px', paddingBottom: '100px', textAlign: 'center' }}>
                <div className="section-header">
                    <h2 className="section-title">Service <span className="highlight">Not Found</span></h2>
                    <p className="section-subtitle">Please check the URL or return to our services page.</p>
                    <Link to="/services" className="btn-primary" style={{ display: 'inline-flex', marginTop: '30px', padding: '15px 30px', textDecoration: 'none', borderRadius: '30px' }}>
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="service-details-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <img src={data.image} alt={data.title} />
                </div>
                <div className="page-hero-overlay"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <div className="page-hero-badge">
                        <i className={`fas ${data.icon || 'fa-concierge-bell'}`}></i>
                        <span>{data.subtitle || 'Premium Service'}</span>
                    </div>
                    <h1>{data.title}</h1>
                </div>
            </section>

            <section className="service-body">
                <div className="container">
                    <div className="service-layout">
                        <main className="service-main" data-aos="fade-up">
                            <div className="back-btn-wrapper">
                                <Link to="/services" className="back-btn">
                                    <i className="fas fa-arrow-left"></i>
                                    <span>Back to Services</span>
                                </Link>
                            </div>
                            <h2>{data.title} <span className="highlight">Overview</span></h2>

                            {!detailView && (
                                <div className="description">
                                    <p>{data.description}</p>
                                </div>
                            )}

                            {slug === 'visa' || slug === 'visa-services' || (data && data.title && data.title.toLowerCase().includes('visa')) ? (
                                <div className="visa-section-container">
                                    {!detailView ? (
                                        <div className="visa-grid-view">
                                            <h3 className="section-small-title">Select a Country for Visa Requirements</h3>
                                            <div className="visa-country-grid">
                                                {visaCountries.map((country, index) => (
                                                    <div
                                                        key={country._id}
                                                        className="visa-country-card"
                                                        data-aos="fade-up"
                                                        data-aos-delay={index * 50}
                                                        onClick={() => handleCountryClick(country)}
                                                    >
                                                        <div className="flag-wrapper">
                                                            <img src={country.flag} alt={country.name} className="visa-country-flag" />
                                                        </div>
                                                        <div className="visa-country-name">{country.name}</div>
                                                        <div className="visa-card-hover-icon">
                                                            <i className="fas fa-arrow-right"></i>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="visa-detail-view active slide-in">
                                            <div className="visa-detail-header">
                                                <div className="visa-title-group">
                                                    <img src={selectedCountry.flag} alt="" className="mini-flag" />
                                                    <h3>{selectedCountry.name} Visa Requirements</h3>
                                                </div>
                                                <button className="visa-back-btn" onClick={() => setDetailView(false)}>
                                                    <i className="fas fa-arrow-left"></i> Back to Countries
                                                </button>
                                            </div>

                                            <div className="visa-content-card">
                                                <p className="visa-brief">
                                                    {selectedCountry.brief || `Get your ${selectedCountry.name} visa approved quickly with our expert assistance. We handle all documentation and submission processes.`}
                                                </p>

                                                <div className="requirements-box">
                                                    <h4>Required Documents</h4>
                                                    <ul className="visa-requirements-list">
                                                        {selectedCountry.requirements.map((req, i) => (
                                                            <li
                                                                key={i}
                                                                className="visa-requirement-item"
                                                            >
                                                                <i className="fas fa-circle-check visa-requirement-icon"></i>
                                                                <span>{req}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {selectedCountry.images && selectedCountry.images.length > 0 && (
                                                    <div className="visa-images-section">
                                                        <h4>Destination Highlights</h4>
                                                        <div className="visa-images-grid">
                                                            {selectedCountry.images.map((img, index) => (
                                                                <div key={index} className="visa-image-item">
                                                                    <img src={img} alt={`${selectedCountry.name} Highlight ${index + 1}`} loading="lazy" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="visa-action-box">
                                                    <Link to="/contact" className="btn-primary premium-btn">
                                                        <span>Apply for {selectedCountry.name} Visa</span>
                                                        <i className="fas fa-passport"></i>
                                                    </Link>
                                                    <p className="helper-text">Our experts will contact you within 24 hours.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="standard-service-content">
                                    {data.features && data.features.length > 0 && (
                                        <div className="features-section">
                                            <h3 className="section-small-title">Key Features & Benefits</h3>
                                            <div className="feature-list">
                                                {data.features.map((feature, index) => (
                                                    <div key={index} className="feature-item" data-aos="fade-up" data-aos-delay={index * 100}>
                                                        <div className="feature-icon-wrapper">
                                                            <i className="fas fa-check-double feature-icon"></i>
                                                        </div>
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {data.conclusion && (
                                        <div className="conclusion-box" data-aos="fade-up">
                                            <p className="conclusion">{data.conclusion}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </main>

                        <aside className="sidebar">
                            <div className="sidebar-widget contact-widget" data-aos="fade-left">
                                <div className="widget-icon">
                                    <i className="fas fa-headset"></i>
                                </div>
                                <h3>Need Professional Assistance?</h3>
                                <p>Our travel experts are ready to help you with <strong>{data.title}</strong> and other requirements.</p>
                                <Link to="/contact" className="btn-primary white-btn">
                                    Enquire Now
                                </Link>
                            </div>

                            <div className="sidebar-widget" data-aos="fade-left" data-aos-delay="100">
                                <h4 className="widget-title">Explore Other Services</h4>
                                <ul className="other-services-list">
                                    {others.slice(0, 6).map(svc => (
                                        <li key={svc._id}>
                                            <Link to={`/services/${svc.slug || svc._id}`}>
                                                <span>{svc.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                {others.length > 6 && (
                                    <Link to="/services" className="view-all-link">
                                        View All Services <i className="fas fa-arrow-right"></i>
                                    </Link>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailsPage;
