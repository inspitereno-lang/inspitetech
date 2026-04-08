import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContactInfo from './models/ContactInfo.js';
import Destination from './models/Destination.js';
import Package from './models/Package.js';
import Service from './models/Service.js';
import User from './models/User.js';
import TeamMember from './models/TeamMember.js';
import VisaCountry from './models/VisaCountry.js';
import HomeSettings from './models/HomeSettings.js';

dotenv.config();

const defaultServices = [
    { title: 'Air Tickets', id: 'air-tickets', icon: 'fa-plane', description: 'Best fares for all domestic and international flights with instant confirmation and 24/7 support.', image: '/images/ab5.png' },
    { title: 'Global Visa Services', id: 'visa', icon: 'fa-passport', description: 'Comprehensive visa assistance for all countries including Schengen, USA, UK, and more.', image: '/images/ab2.jpg' },
    { title: 'Hotel Bookings', id: 'hotel-bookings', icon: 'fa-hotel', description: 'Choose from over 500,000 hotels worldwide ranging from luxury resorts to budget stays.', image: '/images/ab3.jpg' },
    { title: 'Euro Rail Bookings', id: 'euro-rail', icon: 'fa-train', description: 'Seamless train travel across Europe with official Eurail and city-to-city tickets.', image: '/images/ab4.jpeg' },
    { title: 'Group Departures', id: 'group-departures', icon: 'fa-users', description: 'Join our expertly curated group tours with fixed departures and all-inclusive services.', image: '/images/group.jpg' },
    { title: 'Inside Airport Assistance', id: 'airport-assistance', icon: 'fa-concierge-bell', description: 'VIP meet and greet, fast-track immigration and lounge access.', image: '/images/ab1.jpg' },
    { title: 'MICE', id: 'mice', icon: 'fa-handshake', description: 'Meetings, Incentives, Conferences, and Exhibitions tailored to corporate needs.', image: '/images/ab2.jpg' },
    { title: 'Travel Medical Insurance', id: 'travel-insurance', icon: 'fa-shield-alt', description: 'Complete medical and trip cancellation coverage for peace of mind.', image: '/images/ab5.png' },
    { title: 'Passport Assistance', id: 'passport-assistance', icon: 'fa-id-card', description: 'Fast and reliable assistance for new passports and renewals.', image: '/images/ab4.jpeg' },
    { title: 'Umrah Assistance', id: 'umrah-assistance', icon: 'fa-pray', description: 'Complete guidance and support for your Umrah pilgrimage including visa, flights, and hotels.', image: '/images/ummrah.jpeg' },
    { title: 'Car Rental Services', id: 'car-rental', icon: 'fa-car', description: 'Global car rental services ranging from economy to luxury vehicles.', image: '/images/ab3.jpg' },
    { title: 'Airport Transfers', id: 'airport-transfers', icon: 'fa-shuttle-van', description: 'Comfortable and punctual airport transfers to your hotel or residence.', image: '/images/ab1.jpg' },
    { title: 'Holiday Packages', id: 'holiday-packages', icon: 'fa-umbrella-beach', description: 'Tailor-made holiday packages for families, couples, and solo travelers.', image: '/images/ab5.png' },
    { title: 'Corporate Travel', id: 'corporate-travel', icon: 'fa-briefcase', description: 'Dedicated corporate travel solutions to navigate global business trips.', image: '/images/ab2.jpg' },
    { title: 'Document Attestation', id: 'document-attestation', icon: 'fa-certificate', description: 'Hassle-free attestation services for educational and personal documents.', image: '/images/ab4.jpeg' },
    { title: 'Private Jet Booking', id: 'private-jet', icon: 'fa-plane-departure', description: 'Exclusive private jet charters for ultimate luxury and convenience.', image: '/images/ab1.jpg' },
    { title: 'Student Tours', id: 'student-tours', icon: 'fa-graduation-cap', description: 'Educational and fun-filled tours designed specially for students.', image: '/images/ab3.jpg' },
    { title: 'Medical Tourism', id: 'medical-tourism', icon: 'fa-stethoscope', description: 'Facilitating medical treatments abroad with full travel and stay arrangements.', image: '/images/ab2.jpg' }
];

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected! Clearing old data...');

        // Clear existing data
        await Promise.all([
            ContactInfo.deleteMany({}),
            Destination.deleteMany({}),
            Package.deleteMany({}),
            Service.deleteMany({}),
            TeamMember.deleteMany({}),
            User.deleteMany({}),
            VisaCountry.deleteMany({}),
            HomeSettings.deleteMany({})
        ]);

        console.log('Seeding 18 Comprehensive Services...');
        const serviceDocs = defaultServices.map(s => ({
            id: s.id,
            title: s.title,
            subtitle: s.description.substring(0, 40) + '...',
            description: s.description,
            icon: s.icon,
            image: s.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=2070',
            features: ['24/7 Support', 'Best Price Guarantee', 'Expert Advice'],
            status: 'active'
        }));
        await Service.insertMany(serviceDocs);

        console.log('Seeding 6 Destinations...');
        await Destination.insertMany([
            {
                id: 'london', name: 'London', country: 'United Kingdom',
                image: '/images/london.png', tagline: 'A blend of history and modernity',
                description: 'Explore the royal heritage and vibrant street life of London.',
                highlights: ['Big Ben', 'British Museum', 'Buckingham Palace'], status: 'active'
            },
            {
                id: 'paris', name: 'Paris', country: 'France',
                image: '/images/paris.jpeg', tagline: 'The City of Light and Love',
                description: 'Indulge in the romance and artistic treasures of Paris.',
                highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'], status: 'active'
            },
            {
                id: 'dubai', name: 'Dubai', country: 'UAE',
                image: '/images/dubai.jpeg', tagline: 'The City of Gold and Future',
                description: 'Experience the pinnacle of luxury and innovation in Dubai.',
                highlights: ['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah'], status: 'active'
            },
            {
                id: 'tokyo', name: 'Tokyo', country: 'Japan',
                image: '/images/tokyo.jpeg', tagline: 'Where tradition meets the future',
                description: 'Immerse yourself in the unique energy of Tokyo.',
                highlights: ['Meiji Shrine', 'Shibuya Crossing', 'Tokyo Skytree'], status: 'active'
            },
            {
                id: 'singapore', name: 'Singapore', country: 'Singapore',
                image: '/images/singapore.jpeg', tagline: 'A City in a Garden',
                description: 'Discover the lush greenery and diverse culture of Singapore.',
                highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa'], status: 'active'
            },
            {
                id: 'newyork', name: 'New York City', country: 'USA',
                image: '/images/newyork.jpeg', tagline: 'The City That Never Sleeps',
                description: 'Feel the pulse of the world in New York City.',
                highlights: ['Statue of Liberty', 'Central Park', 'Times Square'], status: 'active'
            }
        ]);

        console.log('Seeding 6 Packages...');
        await Package.insertMany([
            {
                id: 'european-discovery', title: 'European Discovery', duration: '14 Days', 
                price: '$2,499', image: '/images/European Discovery.jpeg',
                description: 'Embrace a grand tour of Europe visiting iconic cities.', categoryTag: 'Adventure', status: 'active'
            },
            {
                id: 'dubai-explorer', title: 'Dubai Explorer', duration: '7 Days', 
                price: '$999', image: '/images/Dubai Explorer.jpeg',
                description: 'Luxury and adventure in the heart of the desert.', categoryTag: 'Luxury', status: 'active'
            },
            {
                id: 'asian-adventure', title: 'Asian Adventure', duration: '12 Days', 
                price: '$1,299', image: '/images/Asian Adventure.jpeg',
                description: 'Explore Thailand, Singapore & Malaysia.', categoryTag: 'Adventure', status: 'active'
            },
            {
                id: 'umrah-premium', title: 'Umrah Premium Package', duration: '10 Days', 
                price: '$1,499', image: '/images/ummrah.jpeg',
                description: 'A Spiritual Journey with Comfort.', categoryTag: 'Spiritual', status: 'active'
            },
            {
                id: 'family-getaway', title: 'Family Getaway', duration: '10 Days', 
                price: '$1,899', image: '/images/family.jpeg',
                description: 'Fun for everyone in Turkey & Switzerland.', categoryTag: 'Family', status: 'active'
            },
            {
                id: 'honeymoon-special', title: 'Honeymoon Special', duration: '7 Days', 
                price: '$2,199', image: '/images/honemoon.jpeg',
                description: 'Romantic escapes to Maldives or Bali.', categoryTag: 'Leisure', status: 'active'
            }
        ]);

        console.log('Seeding Contact Info, Team, Visa...');
        // Standard stuff from previous script
        await ContactInfo.create({
            phone: '+971 4 123 4567', email: 'info@almouedtravel.com', address: 'Musaffah - Shabiya ME-11, Abu Dhabi, UAE',
            whatsapp: '97125522238', facebook: 'https://www.facebook.com/almouedtravel', instagram: 'https://www.instagram.com/almouedtravel',
            openingHours: 'Mon - Sat: 9:00 AM - 7:00 PM'
        });

        await TeamMember.insertMany([
            { name: 'Mohamed Aneesh', role: 'Chief Managing Director', expertise: 'Strategy', languages: ['English', 'Arabic'], bio: 'Leading our vision with 15+ years of travel industry expertise.', image: '/images/coreteam.jpg', order: 1 },
            { name: 'Haseeb', role: 'Chief Operating Officer', expertise: 'Operations', languages: ['English', 'Hindi'], bio: 'Ensuring seamless operations.', image: '/images/coreteam.jpg', order: 2 },
            { name: 'Younus', role: 'Chief Financial Officer', expertise: 'Finance', languages: ['English', 'Malayalam'], bio: 'Managing financial strategies.', image: '/images/coreteam.jpg', order: 3 },
            { name: 'Ali Mon', role: 'Chief Executive Officer', expertise: 'Visionary', languages: ['English', 'Arabic'], bio: 'Driving innovation and growth.', image: '/images/coreteam.jpg', order: 4 }
        ]);

        console.log('Seeding visa countries...');
        await VisaCountry.insertMany([
            {
                id: 'india', name: 'India', flag: '/images/tajmahal.jpg',
                brief: 'Get your India visa approved quickly with our expert assistance. We handle all documentation and submission processes.',
                requirements: ['Original Passport with at least 6 months validity', 'Two recent passport size photographs (white background)', 'Visa Application Form duly filled and signed', 'Copy of Emirates ID', 'NOC from employer / Sponsor'],
                images: ['/images/ab1.jpg', '/images/ab3.jpg']
            },
            {
                id: 'uk', name: 'United Kingdom', flag: '/images/london.png',
                brief: 'Explore the majestic UK. We provide end-to-end guidance for tourist, business, and family-visitor visas.',
                requirements: ['Valid Passport', '6 months Bank Statements with sufficient balance', 'Employment Proof (NOC / Salary Certificate)', 'Flight & Accommodation Proof'],
                images: ['/images/london.png']
            },
            {
                id: 'usa', name: 'USA', flag: '/images/newyork.jpeg',
                brief: 'Comprehensive support for US B1/B2 visa applications, including interview preparation.',
                requirements: ['DS-160 Confirmation Page', 'Mylara/Appointment Confirmation', 'Valid Passport', 'Bank Statements & Financial Proof', 'Employment / Business Documents'],
                images: ['/images/newyork.jpeg']
            },
            {
                id: 'schengen', name: 'Schengen (Europe)', flag: '/images/paris.jpeg',
                brief: 'Explore 27 European countries with a single Schengen visa. We help you choose the right embassy for faster processing.',
                requirements: ['Completed Visa Application Form', 'Confirmed Return Flight Reservation', 'Hotel Booking / Sponsorship Proof', 'Travel Medical Insurance (min €30,000)', 'NOC from Employer', 'Personal Bank Statements'],
                images: ['/images/paris.jpeg']
            },
            {
                id: 'uae', name: 'UAE', flag: '/images/dubai.jpeg',
                brief: 'Quick UAE tourist visas (30 or 60 days) for all eligible nationalities.',
                requirements: ['Clear Scanned Passport Copy', 'Passport Size Photo with White Background', 'Application Fee Payment'],
                images: ['/images/dubai.jpeg']
            },
            {
                id: 'singapore', name: 'Singapore', flag: '/images/singapore.jpeg',
                brief: 'Fast and reliable Singapore e-visa processing.',
                requirements: ['Visa Form 14A duly filled', 'Clear Passport Bio Page Copy', 'Recent Passport Size Photo', 'Flight & Hotel Reservation'],
                images: ['/images/singapore.jpeg']
            },
            {
                id: 'japan', name: 'Japan', flag: '/images/tokyo.jpeg',
                brief: 'Experience the unique culture of Japan. We assist with tourist and e-visas.',
                requirements: ['Visa Application Form', 'Properly sized Passport Photo', 'Detailed Daily Itinerary', 'Bank Statements (last 3 months)', 'NOC from Company'],
                images: ['/images/tokyo.jpeg']
            }
        ]);

        await User.create({ username: 'admin', password: '1234' });

        await HomeSettings.create({
            destinations: { items: [], limit: 6, show: true },
            packages: { items: [], limit: 6, show: true },
            services: { items: [], limit: 18, show: true }
        });

        console.log('Database fully seeded successfully! 🌱');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

export default seedData;
