import React, { useState, useEffect } from 'react';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <div className="back-to-top" id="backToTop" onClick={scrollToTop} style={{ display: 'flex' }}>
            <i className="fas fa-arrow-up"></i>
            <div className="back-to-top-ripple"></div>
        </div>
    );
};

export default BackToTop;
