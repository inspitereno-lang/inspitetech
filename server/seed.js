import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContactInfo from './models/ContactInfo.js';
import Destination from './models/Destination.js';
import Package from './models/Package.js';
import Service from './models/Service.js';
import User from './models/User.js';
import TeamMember from './models/TeamMember.js';
import VisaCountry from './models/VisaCountry.js';

dotenv.config();

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
            VisaCountry.deleteMany({})
        ]);

        console.log('Old data cleared. Seeding contact info...');

        // 1. Contact Info
        await ContactInfo.create({
            phone: '+971 4 123 4567',
            email: 'info@almouedtravel.com',
            address: 'Musaffah - Shabiya ME-11, Abu Dhabi, UAE',
            whatsapp: '97125522238',
            facebook: 'https://www.facebook.com/almouedtravel',
            instagram: 'https://www.instagram.com/almouedtravel',
            openingHours: 'Mon - Sat: 9:00 AM - 7:00 PM'
        });

        console.log('Seeding destinations...');

        // 2. Destinations
        await Destination.insertMany([
            {
                id: 'london',
                name: 'London',
                country: 'United Kingdom',
                image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2070',
                tagline: 'Experience the rich history and vibrant culture of England.',
                description: 'From the historic Tower of London to the modern London Eye, explore a city that seamlessly blends the old with the new.',
                highlights: ['Big Ben', 'British Museum', 'Buckingham Palace'],
                status: 'active'
            },
            {
                id: 'paris',
                name: 'Paris',
                country: 'France',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2073',
                tagline: 'The City of Light and artistic treasures.',
                description: 'Indulge in world-class cuisine, visit the Louvre, and witness the majesty of the Eiffel Tower.',
                highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
                status: 'active'
            },
            {
                id: 'dubai',
                name: 'Dubai',
                country: 'UAE',
                image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2070',
                tagline: 'The pinnacle of luxury and architectural marvels.',
                description: 'Experience futuristic skyscrapers, luxury shopping, and thrilling desert safaris in the heart of the Middle East.',
                highlights: ['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah'],
                status: 'active'
            },
            {
                id: 'tokyo',
                name: 'Tokyo',
                country: 'Japan',
                image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=2094',
                tagline: 'Where ancient traditions meet futuristic technology.',
                description: 'Explore the neon-lit streets of Shinjuku and the serene temples of Asakusa in this incredibly diverse metropolis.',
                highlights: ['Meiji Shrine', 'Shibuya Crossing', 'Tokyo Skytree'],
                status: 'active'
            }
        ]);

        console.log('Seeding packages...');

        // 3. Packages
        await Package.insertMany([
            {
                id: 'luxury-maldives',
                title: 'Maldives Paradise Escape',
                duration: '5 Days / 4 Nights',
                image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1965',
                description: 'Overwater bungalows and crystal clear lagoons await you in this ultimate luxury retreat.',
                price: '$2,499',
                isEnquiryOnly: false,
                inclusions: ['Roundtrip Flights', 'All-inclusive Meals', 'Spa Treatment'],
                categoryTag: 'Luxury',
                status: 'active'
            },
            {
                id: 'asian-adventure',
                title: 'Premium Asian Adventure',
                duration: '10 Days',
                image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&q=80&w=2069',
                description: 'Explore the best of Southeast Asia with our expert-guided tour covering Thailand, Vietnam, and Cambodia.',
                isEnquiryOnly: true,
                inclusions: ['City Tours', 'Luxury Transportation', 'Local Cuisine'],
                categoryTag: 'Adventure',
                status: 'active'
            }
        ]);

        console.log('Seeding services...');

        // 4. Services
        await Service.insertMany([
            {
                id: 'air-tickets',
                title: 'Air Tickets',
                subtitle: 'Best fares for domestic and international flights',
                description: 'Fly to your dream destination with ease. We offer competitive airfares for all major airlines, ensuring you get the best route and price. Whether it\'s a last-minute business trip or a planned family vacation, our ticketing experts handle everything from booking to meal preferences.',
                icon: 'fa-plane-departure',
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=2070',
                features: ['Global Airline Partnerships', '24/7 Booking Support', 'Competitive Corporate Rates', 'Meal & Seat Selection'],
                conclusion: 'Let us handle your flight arrangements so you can start your journey stress-free.',
                status: 'active'
            },
            {
                id: 'visa',
                title: 'Global Visa Services',
                subtitle: 'Hassle-free visa processing for all major destinations',
                description: 'Navigating visa requirements can be complex. Our experts provide end-to-end assistance for tourist, business, and student visas to countries like USA, UK, Canada, Europe (Schengen), and more. We review your documents to minimize rejection risks.',
                icon: 'fa-passport',
                image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2070',
                features: [
                    'Document Verification & Filling',
                    'Embassy Appointment Scheduling',
                    'Real-time Application Tracking',
                    'High Success Rate Assistance'
                ],
                conclusion: 'Travel the world borders-free. We make the visa process simple, transparent, and efficient.',
                status: 'active'
            },
            {
                id: 'hotels',
                title: 'Hotel Bookings',
                subtitle: 'Luxury stays and budget-friendly accommodations worldwide',
                description: 'From 5-star luxury resorts to cozy boutique hotels, we provide accommodation options that suit your taste and budget. Enjoy exclusive deals, complimentary upgrades, and flexible cancellation policies through our global network of partners.',
                icon: 'fa-hotel',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070',
                features: ['Instant Confirmation', 'Exclusive Member Discounts', 'Wide Range of Options', 'Flexible Cancellation Policies'],
                conclusion: 'Rest easy knowing your accommodation is perfectly sorted before you even arrive.',
                status: 'active'
            },
            {
                id: 'holiday-packages',
                title: 'Holiday Packages',
                subtitle: 'Tailor-made holidays for families and couples',
                description: 'Whether it is a romantic honeymoon, a fun-filled family vacation, or a solo adventure, we craft personalized holiday packages that suit your preferences and budget. Experience the world your way.',
                icon: 'fa-suitcase-rolling',
                image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2074',
                features: ['Customized Itineraries', 'Honeymoon Specials', 'Family Friendly Activities', 'Adventure & Leisure Tours'],
                conclusion: 'Your dream holiday, planned to perfection by experts.',
                status: 'active'
            },
            {
                id: 'umrah-assistance',
                title: 'Umrah Assistance',
                subtitle: 'Spiritual journeys with complete peace of mind',
                description: 'Perform Umrah with ease and devotion. Our tailored packages include visa processing, direct flights, hotels near the Haram, and comfortable ground transport to ensure a spiritually fulfilling journey.',
                icon: 'fa-kaaba',
                image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2070',
                features: ['Umrah Visa Processing', 'Hotels close to Haram', 'Private/Shared Transportation', 'Ziyarat Tours included'],
                conclusion: 'Focus on your prayers while we take care of the logistics.',
                status: 'active'
            },
            {
                id: 'corporate-travel',
                title: 'Corporate Travel',
                subtitle: 'Business travel management solutions',
                description: 'We optimize your corporate travel with cost-effective solutions, policy compliance, and 24/7 support. Let us manage your business trips so you can focus on your meetings.',
                icon: 'fa-briefcase',
                image: 'https://images.unsplash.com/photo-1454165833767-027ff39c137a?auto=format&fit=crop&q=80&w=2070',
                features: ['Cost Optimization Strategies', 'Travel Policy Compliance', 'Detailed Reporting & Analytics', 'Dedicated Account Manager'],
                conclusion: 'Focus on business, we handle the travel.',
                status: 'active'
            }
        ]);

        console.log('Seeding core team...');

        // 5. Team Members
        await TeamMember.insertMany([
            {
                name: 'Mohamed Aneesh',
                role: 'Chief Managing Director',
                expertise: 'Strategy',
                languages: ['English', 'Arabic'],
                bio: 'Leading our vision with 15+ years of travel industry expertise and strategic leadership.',
                image: 'https://res.cloudinary.com/dwqxzzqpn/image/upload/v1/tm1', // Assume Cloudinary mapping or fallback
                order: 1,
                socialLinks: {
                    linkedin: '#',
                    twitter: '#'
                }
            },
            {
                name: 'Haseeb',
                role: 'Chief Operating Officer',
                expertise: 'Operations',
                languages: ['English', 'Hindi'],
                bio: 'Ensuring seamless operations and exceptional service delivery across all departments.',
                image: 'https://res.cloudinary.com/dwqxzzqpn/image/upload/v1/tm2',
                order: 2,
                socialLinks: {
                    linkedin: '#',
                    twitter: '#'
                }
            },
            {
                name: 'Younus',
                role: 'Chief Financial Officer',
                expertise: 'Finance',
                languages: ['English', 'Malayalam'],
                bio: 'Managing financial strategies and ensuring sustainable growth for the company.',
                image: 'https://res.cloudinary.com/dwqxzzqpn/image/upload/v1/tm3',
                order: 3,
                socialLinks: {
                    linkedin: '#',
                    twitter: '#'
                }
            },
            {
                name: 'Ali Mon',
                role: 'Chief Executive Officer',
                expertise: 'Visionary',
                languages: ['English', 'Arabic'],
                bio: 'Driving innovation and maintaining our commitment to exceptional travel experiences.',
                image: 'https://res.cloudinary.com/dwqxzzqpn/image/upload/v1/tm4',
                order: 4,
                socialLinks: {
                    linkedin: '#',
                    twitter: '#'
                }
            }
        ]);

        console.log('Seeding visa countries...');
        await VisaCountry.insertMany([
            {
                id: 'india',
                name: 'India',
                flag: '/images/tajmahal.jpg',
                brief: 'Get your India visa approved quickly with our expert assistance. We handle all documentation and submission processes.',
                requirements: [
                    'Original Passport with at least 6 months validity',
                    'Two recent passport size photographs (white background)',
                    'Visa Application Form duly filled and signed',
                    'Copy of Emirates ID',
                    'NOC from employer / Sponsor'
                ],
                images: ['/images/ab1.jpg', '/images/ab3.jpg']
            },
            {
                id: 'uk',
                name: 'United Kingdom',
                flag: '/images/london.png',
                brief: 'Explore the majestic UK. We provide end-to-end guidance for tourist, business, and family-visitor visas.',
                requirements: [
                    'Valid Passport',
                    '6 months Bank Statements with sufficient balance',
                    'Employment Proof (NOC / Salary Certificate)',
                    'Flight & Accommodation Proof'
                ],
                images: ['/images/london.png']
            },
            {
                id: 'usa',
                name: 'USA',
                flag: '/images/newyork.jpeg',
                brief: 'Comprehensive support for US B1/B2 visa applications, including interview preparation.',
                requirements: [
                    'DS-160 Confirmation Page',
                    'Mylara/Appointment Confirmation',
                    'Valid Passport',
                    'Bank Statements & Financial Proof',
                    'Employment / Business Documents'
                ],
                images: ['/images/newyork.jpeg']
            },
            {
                id: 'schengen',
                name: 'Schengen (Europe)',
                flag: '/images/paris.jpeg',
                brief: 'Explore 27 European countries with a single Schengen visa. We help you choose the right embassy for faster processing.',
                requirements: [
                    'Completed Visa Application Form',
                    'Confirmed Return Flight Reservation',
                    'Hotel Booking / Sponsorship Proof',
                    'Travel Medical Insurance (min €30,000)',
                    'NOC from Employer',
                    'Personal Bank Statements'
                ],
                images: ['/images/paris.jpeg']
            },
            {
                id: 'uae',
                name: 'UAE',
                flag: '/images/dubai.jpeg',
                brief: 'Quick UAE tourist visas (30 or 60 days) for all eligible nationalities.',
                requirements: [
                    'Clear Scanned Passport Copy',
                    'Passport Size Photo with White Background',
                    'Application Fee Payment'
                ],
                images: ['/images/dubai.jpeg']
            },
            {
                id: 'singapore',
                name: 'Singapore',
                flag: '/images/singapore.jpeg',
                brief: 'Fast and reliable Singapore e-visa processing.',
                requirements: [
                    'Visa Form 14A duly filled',
                    'Clear Passport Bio Page Copy',
                    'Recent Passport Size Photo',
                    'Flight & Hotel Reservation'
                ],
                images: ['/images/singapore.jpeg']
            },
            {
                id: 'japan',
                name: 'Japan',
                flag: '/images/tokyo.jpeg',
                brief: 'Experience the unique culture of Japan. We assist with tourist and e-visas.',
                requirements: [
                    'Visa Application Form',
                    'Properly sized Passport Photo',
                    'Detailed Daily Itinerary',
                    'Bank Statements (last 3 months)',
                    'NOC from Company'
                ],
                images: ['/images/tokyo.jpeg']
            }
        ]);

        console.log('Seeding admin user...');
        await User.create({
            username: 'admin',
            password: '1234'
        });
        console.log('Admin user seeded (admin / 1234)');

        console.log('Database seeded successfully! 🌱');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
