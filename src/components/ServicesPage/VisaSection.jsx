import React, { useState } from 'react';
import { visaCountries } from '../../data/services';
import { Link } from 'react-router-dom';

const VisaSection = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [view, setView] = useState('grid'); // 'grid' | 'detail'

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        setView('detail');
        window.scrollTo({ top: document.getElementById('visa-section-container').offsetTop - 100, behavior: 'smooth' });
    };

    const handleBack = () => {
        setView('grid');
    };

    return (
        <div id="visa-section-container" className="visa-section">
            {view === 'grid' ? (
                <div id="visa-grid-view" data-aos="fade-up">
                    <h3>Select a Country for Visa Requirements</h3>
                    <div className="visa-country-grid">
                        {visaCountries.map((country, index) => (
                            <div 
                                key={country._id} 
                                className="visa-country-card" 
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handleCountryClick(country)}
                            >
                                <img src={country.flag} alt={country.name} className="visa-country-flag" />
                                <div className="visa-country-name">{country.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div id="visa-detail-view" className="visa-detail-view active" data-aos="fade-in">
                    <div className="visa-detail-header">
                        <h3>{selectedCountry.name} Visa Requirements</h3>
                        <button className="visa-back-btn" onClick={handleBack}>
                            <i className="fas fa-arrow-left"></i> Back to Countries
                        </button>
                    </div>

                    <p className="visa-brief">
                        Get your {selectedCountry.name} visa approved quickly with our expert assistance. We handle all documentation and submission processes.
                    </p>

                    <ul className="visa-requirements-list">
                        {selectedCountry.requirements.map((req, i) => (
                            <li 
                                key={i} 
                                className="visa-requirement-item" 
                                style={{ animation: `fadeInUp 0.5s ease forwards ${i * 0.1}s`, opacity: 0, transform: 'translateY(10px)' }}
                            >
                                <i className="fas fa-check-circle visa-requirement-icon"></i>
                                <span>{req}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="visa-images-grid">
                        {selectedCountry.images.map((img, index) => (
                            <div key={index} className="visa-image-item" data-aos="zoom-in" data-aos-delay={index * 100}>
                                <img src={img} alt={`${selectedCountry.name} Visa Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 30px', textDecoration: 'none' }}>
                            Request {selectedCountry.name} Visa
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisaSection;
