import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import api from '../api';

const DestinationDetailsPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [others, setOthers] = useState([]);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/destinations/${id}`);
                setData(response.data);
                
                // Fetch other destinations for sidebar
                const othersResponse = await api.get('/destinations/active');
                setOthers(othersResponse.data.filter(d => d.id !== id));
            } catch (error) {
                console.error('Error fetching destination:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
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
            <p>Exploring {id}...</p>
        </div>
    );

    if (!data) {
        return (
            <div style={{ paddingTop: '150px', pb: '100px', textAlign: 'center' }}>
                <h2>Destination Not Found</h2>
                <p>Please check the URL or return to the Destinations page.</p>
                <Link to="/destinations" className="btn-primary">Back to Destinations</Link>
            </div>
        );
    }

    return (
        <div className="destination-details-page">
            <style>{`
                .service-body { padding: 80px 0; }
                .service-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 50px; }
                .service-main img { width: 100%; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1); }
                .service-main h2 { font-size: 2rem; margin-bottom: 20px; color: #1a1a1a; }
                .service-main .description { font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 30px; }
                .tagline { color: #fea300; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; display: block; }
                .feature-list { margin: 30px 0; }
                .feature-item { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; background: #f9f9f9; padding: 15px 20px; border-radius: 10px; transition: transform 0.3s ease; }
                .feature-item:hover { transform: translateX(10px); background: white; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); }
                .feature-icon { color: #009af0; font-size: 1.2rem; }
                .sidebar-widget { background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); margin-bottom: 30px; border: 1px solid #f0f0f0; }
                .widget-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #f0f0f0; }
                .other-services-list { list-style: none; padding: 0; }
                .other-services-list li a { display: block; padding: 12px 0; color: #666; font-weight: 500; transition: color 0.3s ease; border-bottom: 1px solid #f9f9f9; text-decoration: none; }
                .other-services-list li a:hover { color: #009af0; padding-left: 5px; }
                .contact-widget { text-align: center; background: linear-gradient(135deg, #009af0 0%, #fea300 100%); color: white; }
                .contact-widget h3 { color: white; margin-bottom: 15px; }
                .contact-widget .btn-primary { background: white; color: #009af0; width: 100%; margin-top: 20px; text-decoration: none; display: inline-block; }
                @media (max-width: 900px) { .service-layout { grid-template-columns: 1fr; } .sidebar { order: -1; } }
            `}</style>

            <section className="page-hero">
                <div className="page-hero-bg">
                    <img src={data.image} alt={data.name} />
                </div>
                <div className="page-hero-overlay"></div>
                <div className="page-hero-content">
                    <span className="tagline" data-aos="fade-down">{data.tagline || data.country}</span>
                    <h1 data-aos="fade-up">{data.name}</h1>
                </div>
            </section>

            <section className="service-body">
                <div className="container">
                    <div className="service-layout">
                        <main className="service-main" data-aos="fade-up">
                            <div className="back-btn-wrapper">
                                <Link to="/destinations" className="back-btn">
                                    <i className="fas fa-arrow-left"></i>
                                    <span>Back to Destinations</span>
                                </Link>
                            </div>
                            <h2>Welcome to {data.name}</h2>
                            <div 
                                className="description" 
                                dangerouslySetInnerHTML={{ __html: data.description }} 
                            />

                            {data.highlights && data.highlights.length > 0 && (
                                <>
                                    <h3>Highlights</h3>
                                    <div className="feature-list">
                                        {data.highlights.map((feature, index) => (
                                            <div key={index} className="feature-item">
                                                <i className={`fas ${data.icon || 'fa-map-marker-alt'} feature-icon`}></i>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </main>

                        <aside className="sidebar" data-aos="fade-left">
                            <div className="sidebar-widget contact-widget">
                                <h3>Book This Trip?</h3>
                                <p>Contact us today for a personalized itinerary.</p>
                                <Link to="/contact" className="btn-primary">Inquire Now</Link>
                            </div>

                            <div className="sidebar-widget">
                                <h4 className="widget-title">Other Destinations</h4>
                                <ul className="other-services-list">
                                    {others.map(dest => (
                                        <li key={dest.id}>
                                            <Link to={`/destinations/${dest.id}`}>{dest.name}</Link>
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

export default DestinationDetailsPage;
