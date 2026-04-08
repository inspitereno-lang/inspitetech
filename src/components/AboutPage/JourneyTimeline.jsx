import React from 'react';

const milestones = [
    { year: '2014', title: 'The Beginning', desc: 'Almoued Travel was founded with a vision to redefine travel services in Dubai, starting with a small but dedicated team of experts.', side: 'fade-right' },
    { year: '2017', title: 'Expansion to India', desc: 'Recognizing the growing demand, we established our first international office in India, bridging the gap for luxury travel between GCC and Asia.', side: 'fade-left' },
    { year: '2020', title: 'Digital Transformation', desc: 'We launched our comprehensive online booking platform, integrating advanced search technology to provide real-time solutions to our clients.', side: 'fade-right' },
    { year: '2024', title: '15,000+ Happy Travelers', desc: 'Today, we celebrate over a decade of service and fifteen thousand successful journeys, continuing our mission as "The Destination Expertz".', side: 'fade-left' },
];

const JourneyTimeline = () => {
    return (
        <section className="section journey">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">OUR JOURNEY</div>
                    <h2 className="section-title">
                        Milestones of <span className="highlight">Excellence</span>
                    </h2>
                </div>

                <div className="timeline">
                    {milestones.map((m, i) => (
                        <div key={i} className="timeline-item" data-aos={m.side}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-date">{m.year}</div>
                            <div className="timeline-content">
                                <h3>{m.title}</h3>
                                <p>{m.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;
