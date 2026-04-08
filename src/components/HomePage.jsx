import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Destinations from './Destinations';
import Services from './Services';
import Packages from './Packages';
import Team from './Team';
import Contact from './Contact';
import Footer from './Footer';
import BackToTop from './BackToTop';
import WhatsAppFloat from './WhatsAppFloat';

const HomePage = () => {
    return (
        <>
            <Hero />
            <About />
            <Destinations />
            <Services />
            <Packages />
            <Team />
            <Contact />
        </>
    );
};

export default HomePage;
