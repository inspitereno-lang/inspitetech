import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="loading" id="loading">
            <div className="loader">
                <img fetchPriority="high" src="/images/logo-white.png" alt="Almoued Travel Logo" className="loader-logo-image" />
                <div className="loader-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
