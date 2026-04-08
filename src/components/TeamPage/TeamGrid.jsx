import React, { useEffect, useState } from 'react';
import api from '../../api';

const TeamGrid = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await api.get('/team');
                // Sort by order if available
                const sortedTeam = response.data.sort((a, b) => (a.order || 0) - (b.order || 0));
                setTeam(sortedTeam);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching team:', error);
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) return (
        <section className="section team-overview">
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="loader"></div>
            </div>
        </section>
    );

    return (
        <section className="section team-overview">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">OUR LEADERSHIP</div>
                    <h2 className="section-title">
                        Guided by <span className="highlight">Excellence</span>
                    </h2>
                    <p className="section-subtitle">
                        Our leadership team brings decades of collective experience in
                        global travel management and customer service.
                    </p>
                </div>

                <div className="team-grid">
                    {team.map((member, index) => (
                        <div key={member._id || index} className="team-card" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="team-image-wrapper">
                                <img 
                                    loading="lazy" 
                                    src={member.image} 
                                    alt={member.name} 
                                    onError={(e) => {
                                        // Fallback to original site images if Cloudinary fails or is mapping
                                        if (e.target.src.includes('cloudinary')) {
                                            e.target.src = `/images/tm${index + 1}.jpg`;
                                        }
                                    }}
                                />
                                <div className="team-number">0{index + 1}</div>
                                <div className="expertise-tag">{member.expertise || 'Executive'}</div>
                                <div className="team-social-overlay">
                                    <a href={member.socialLinks?.linkedin || '#'}><i className="fab fa-linkedin-in"></i></a>
                                    <a href={member.socialLinks?.twitter || '#'}><i className="fab fa-twitter"></i></a>
                                    <a href={member.socialLinks?.facebook || '#'}><i className="fas fa-envelope"></i></a>
                                </div>
                            </div>
                            <div className="team-info">
                                <span className="role">{member.role}</span>
                                <h3>{member.name}</h3>
                                {member.languages && member.languages.length > 0 && (
                                    <div className="team-languages">
                                        {member.languages.map((lang, lIdx) => (
                                            <span key={lIdx} className="language-pill">{lang}</span>
                                        ))}
                                    </div>
                                )}
                                <p className="bio">
                                    {member.bio || 'Experienced professional dedicated to Almoued Travels.'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
