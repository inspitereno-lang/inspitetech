import React, { useState } from 'react';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: 'How do I book a holiday package?',
            answer: 'You can book a package by contacting us directly through our website, calling our support line, or visiting our office. Our travel experts will help you customize your itinerary to valid your preferences.'
        },
        {
            question: 'Do you provide visa assistance?',
            answer: 'Yes, we provide comprehensive visa assistance for many countries including the UK, USA, Schengen area, and more. Check our "Global Visa Services" page for specific details.'
        },
        {
            question: 'What documents do I need for travel?',
            answer: 'Typically, you need a valid passport (with at least 6 months validity), a valid visa for your destination, flight tickets, and hotel bookings. Specific requirements vary by destination.'
        },
        {
            question: 'Can I change my booking after confirmation?',
            answer: 'Yes, changes can be made subject to airline and hotel policies. Please contact our support team as soon as possible to minimize any change fees.'
        }
    ];

    return (
        <div className="faq-section">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
                <h2 className="section-title">Common <span className="highlight">Questions</span></h2>
                <p className="section-subtitle">Everything you need to know about booking with us.</p>
            </div>

            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
                        data-aos="fade-up" 
                        data-aos-delay={100 * (index + 1)}
                    >
                        <div className="faq-question" onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}>
                            <span>{faq.question}</span>
                            <div className="faq-icon"><i className="fas fa-chevron-down"></i></div>
                        </div>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
