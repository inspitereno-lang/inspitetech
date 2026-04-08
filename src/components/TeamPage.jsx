import React, { useEffect } from 'react';
import TeamHero from './TeamPage/TeamHero';
import TeamGrid from './TeamPage/TeamGrid';
import JoinUs from './TeamPage/JoinUs';
import AOS from 'aos';

const TeamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();
        
        // Parallax Effect for Hero
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const heroBg = document.querySelector('.page-hero-bg img');
            if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="team-page">
            <TeamHero />
            <TeamGrid />
            <JoinUs />
        </div>
    );
};

export default TeamPage;
