import React from 'react';
import AboutHero from './AboutPage/AboutHero';
import WhoWeAre from './AboutPage/WhoWeAre';
import MissionVision from './AboutPage/MissionVision';
import CoreValues from './AboutPage/CoreValues';
import WhyChooseUs from './AboutPage/WhyChooseUs';
import JourneyTimeline from './AboutPage/JourneyTimeline';
import AboutCTA from './AboutPage/AboutCTA';

import './AboutPage/AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            <AboutHero />
            <WhoWeAre />
            <MissionVision />
            <CoreValues />
            <WhyChooseUs />
            <JourneyTimeline />
            <AboutCTA />
        </div>
    );
};

export default AboutPage;
