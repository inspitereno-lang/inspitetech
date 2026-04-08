import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import api from '../api';
import './ServiceDetailsPage/ServiceDetails.css';

const PackageDetailsPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [others, setOthers] = useState([]);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/packages/${id}`);
                setData(response.data);
                
                // Fetch other packages for sidebar
                const othersResponse = await api.get('/packages/active');
                setOthers(othersResponse.data.filter(p => p.id !== id));
            } catch (error) {
                console.error('Error fetching package:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackage();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (!loading) {
            AOS.refresh();
        }
    }, [loading]);

    if (loading) return (
        <div style={{ paddingTop: '150px', textAlign: 'center', height: '100vh' }}>
            <div className="loader"></div>
            <p>Preparing your journey to {id}...</p>
        </div>
    );

    if (!data) {
        return (
            <div className="container" style={{ paddingTop: '200px', paddingBottom: '100px', textAlign: 'center' }}>
                <div className="section-header">
                    <h2 className="section-title">Package <span className="highlight">Not Found</span></h2>
                    <p className="section-subtitle">Please check the URL or return to our packages page.</p>
                    <Link to="/packages" className="btn-primary" style={{ display: 'inline-block', marginTop: '30px' }}>
                        Back to Packages
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="service-details-page">
            <section className="page-hero">
                <div className="page-hero-bg">
                    <img src={data.image} alt={data.title} style={{ transition: 'opacity 0.5s ease' }} />
                </div>
                <div className="page-hero-overlay"></div>
                <div className="page-hero-content">
                    <div className="page-hero-badge">
                        <i className={data.icon || 'fas fa-suitcase'}></i>
                        <span>{data.duration || data.categoryTag || 'Special Offer'}</span>
                    </div>
                    <h1>{data.title}</h1>
                </div>
            </section>

            <section className="service-body">
                <div className="container">
                    <div className="service-layout">
                        <main className="service-main" data-aos="fade-up">
                            <div className="back-btn-wrapper">
                                <Link to="/packages" className="back-btn">
                                    <i className="fas fa-arrow-left"></i>
                                    <span>Back to Packages</span>
                                </Link>
                            </div>
                            <h2>{data.title} Details</h2>
                            <div className="package-meta" style={{ display: 'flex', gap: '20px', marginBottom: '30px', color: '#666' }}>
                                <span><i className="far fa-calendar-alt"></i> {data.duration}</span>
                                {!data.isEnquiryOnly && <span><i className="fas fa-tag"></i> {data.price}</span>}
                                {data.categoryTag && <span><i className="fas fa-folder"></i> {data.categoryTag}</span>}
                            </div>
                            
                            <div className="description">
                                <p>{data.description}</p>
                            </div>

                            {data.inclusions && data.inclusions.length > 0 && (
                                <>
                                    <h3>Package Inclusions</h3>
                                    <div className="feature-list">
                                        {data.inclusions.map((inclusion, index) => (
                                            <div key={index} className="feature-item">
                                                <i className="fas fa-check-circle feature-icon"></i>
                                                <span>{inclusion}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {data.conclusion && <p className="conclusion">{data.conclusion}</p>}
                        </main>

                        <aside className="sidebar" data-aos="fade-left" data-aos-delay="200">
                            <div className="sidebar-widget contact-widget">
                                <h3>{data.isEnquiryOnly ? 'Enquire Now' : 'Interested in this Package?'}</h3>
                                <p>{data.isEnquiryOnly ? 'Contact us for a personalized quote for this journey.' : 'Book now to secure your spot for this amazing journey.'}</p>
                                <div className="package-price-box" style={{ margin: '20px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    {data.isEnquiryOnly ? 'Price on Request' : data.price}
                                </div>
                                <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                                    {data.isEnquiryOnly ? 'Send Enquiry' : 'Book This Package'}
                                </Link>
                            </div>

                            <div className="sidebar-widget">
                                <h4 className="widget-title">Other Packages</h4>
                                <ul className="other-services-list">
                                    {others.map(pkg => (
                                        <li key={pkg.id}>
                                            <Link to={`/packages/${pkg.id}`}>{pkg.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PackageDetailsPage;
