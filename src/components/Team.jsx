import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamData = [
    {
        name: 'Mohamed Aneesh',
        role: 'Chief Managing Director',
        description: 'Leading our vision with 15+ years of travel industry expertise and strategic leadership.',
        icon: 'fa-user-tie'
    },
    {
        name: 'Haseeb',
        role: 'Chief Operating Officer',
        description: 'Ensuring seamless operations and exceptional service delivery across all departments.',
        icon: 'fa-user-cog'
    },
    {
        name: 'Younus',
        role: 'Chief Financial Officer',
        description: 'Managing financial strategies and ensuring sustainable growth for the company.',
        icon: 'fa-calculator'
    },
    {
        name: 'Ali Mon',
        role: 'Chief Executive Officer',
        description: 'Driving innovation and maintaining our commitment to exceptional travel experiences.',
        icon: 'fa-crown'
    }
];

const Team = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <section className="section team" id="team">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">CORE TEAM</div>
                    <h2 className="section-title">
                        Our <span className="highlight">Leadership</span>
                    </h2>
                    <p className="section-subtitle">
                        Meet the experienced professionals leading Almoued Travel to excellence
                    </p>
                </div>

                <div className="process-steps">
                    {/* Animated Path SVG */}
                    <svg className="process-path" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400" viewBox="0 0 1100 200" preserveAspectRatio="none">
                        <path 
                            className="path-line" 
                            d="M 50 100 Q 300 50 550 100 T 1050 100" 
                            stroke="url(#gradient)"
                            strokeWidth="3" 
                            fill="none" 
                            strokeDasharray="10,5" 
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#fea300', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#009af0', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#fea300', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                    </svg>

                    {teamData.map((member, index) => (
                        <div 
                            key={index} 
                            className="step-item" 
                            data-aos="zoom-in" 
                            data-aos-duration="800" 
                            data-aos-delay={600 + (index * 200)}
                        >
                            <div className="step-number">
                                <span>0{index + 1}</span>
                                <div className="step-pulse"></div>
                            </div>
                            <div className="step-content">
                                <h3>{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p>{member.description}</p>
                            </div>
                            <div className="step-decoration">
                                <i className={`fas ${member.icon}`}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
