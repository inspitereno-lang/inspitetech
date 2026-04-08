import React from 'react';

const reasons = [
    { num: '01', title: 'Destination Expertise', desc: 'Our team consists of specialists who have personally explored the destinations we offer, providing you with insider knowledge and hidden gems.', delay: 200 },
    { num: '02', title: 'Tailor-Made Itineraries', desc: 'No two travelers are the same. We craft customized journeys that align perfectly with your interests, pace, and preferences.', delay: 300 },
    { num: '03', title: 'Global Partnerships', desc: 'Our strong network across GCC and India ensures you get exclusive access to premium hotels, private luxury transfers, and unique local experiences.', delay: 400 },
    { num: '04', title: '24/7 Concierge Support', desc: 'From the moment you start planning until you return home, our dedicated support team is available round-the-clock for any assistance you need.', delay: 500 },
    { num: '05', title: 'Unbeatable Value', desc: 'We leverage our industry relationships to provide you with the best rates and value-added amenities without compromising on quality.', delay: 600 },
    { num: '06', title: 'Sustainable Travel', desc: 'We are committed to responsible tourism, ensuring our journeys leave a positive impact on the environment and local communities.', delay: 700 },
];

const WhyChooseUs = () => {
    return (
        <section className="section why-choose">
            <div className="container">
                <div className="section-header" data-aos="fade-up" data-aos-duration="800">
                    <div className="section-label">WHY CHOOSE US</div>
                    <h2 className="section-title">
                        What Makes Us <span className="highlight">The Expertz</span>
                    </h2>
                    <p className="section-subtitle">
                        With over a decade of experience, we've mastered the art of travel planning.
                    </p>
                </div>

                <div className="why-grid">
                    {reasons.map((r, i) => (
                        <div key={i} className="why-item" data-aos="slide-right" data-aos-duration="800" data-aos-delay={r.delay}>
                            <div className="why-number">{r.num}</div>
                            <div className="why-content">
                                <h3>{r.title}</h3>
                                <p>{r.desc}</p>
                            </div>
                            <div className="why-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
