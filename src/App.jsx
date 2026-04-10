import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import DestinationsPage from './components/DestinationsPage';
import DestinationDetailsPage from './components/DestinationDetailsPage';
import ServicesPage from './components/ServicesPage';
import ServiceDetailsPage from './components/ServiceDetailsPage';
import PackagesPage from './components/PackagesPage';
import PackageDetailsPage from './components/PackageDetailsPage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';
import Admin from './admin/Admin';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/Toast';


function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 800,
            delay: 100,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
            disable: function () {
                return window.innerWidth < 768;
            }
        });

        // Hide loading screen after a short delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        // Scroll Progress Bar Logic
        const handleScrollProgress = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const bar = document.getElementById("myBar");
            if (bar) bar.style.width = scrolled + "%";
        };

        window.addEventListener('scroll', handleScrollProgress);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScrollProgress);
        };
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        // Refresh AOS on route change
        AOS.refresh();
    }, [location]);

    const isAdminPath = location.pathname.startsWith('/admin');

    return (
        <ToastProvider>
            <div className="App">
                <ToastContainer />
                {loading && <LoadingScreen />}
                
                <div className={`main-content ${loading ? 'hidden' : ''}`}>
                    <div className="scroll-progress-container">
                        <div className="scroll-progress-bar" id="myBar"></div>
                    </div>

                    {!isAdminPath && <Navbar />}
                    
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/destinations" element={<DestinationsPage />} />
                        <Route path="/destinations/:slug" element={<DestinationDetailsPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/services/:slug" element={<ServiceDetailsPage />} />
                        <Route path="/packages" element={<PackagesPage />} />
                        <Route path="/packages/:slug" element={<PackageDetailsPage />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admin/*" element={<Admin />} />
                        {/* Fallback to Home */}
                        <Route path="*" element={<HomePage />} />
                    </Routes>

                    {!isAdminPath && <Footer />}
                    <BackToTop />
                    {!isAdminPath && <WhatsAppFloat />}
                </div>
            </div>
        </ToastProvider>
    );
}

export default App;
