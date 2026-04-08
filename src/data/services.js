export const servicesData = {
    'air-tickets': {
        id: 'air-tickets',
        title: 'Air Tickets',
        subtitle: 'Domestic & International',
        icon: 'fa-plane',
        image: '/images/airticket.jpg',
        description: 'Best fares for all domestic and international flights with instant confirmation and 24/7 support.',
        features: ['Instant Booking', 'Best Fare Guarantee', '24/7 Support', 'Group Bookings']
    },
    'visa-services': {
        id: 'visa-services',
        title: 'Global Visa Services',
        subtitle: 'World-wide Visa Assistance',
        icon: 'fa-passport',
        image: '/images/visaservice.jpg',
        description: 'Comprehensive visa assistance for all countries including Schengen, USA, UK, and more.',
        features: ['Documentation Support', 'Appointment Booking', 'Expert Guidance', 'High Success Rate']
    },
    'hotel-bookings': {
        id: 'hotel-bookings',
        title: 'Hotel Bookings',
        subtitle: 'World-wide Accommodations',
        icon: 'fa-hotel',
        image: '/images/hotelbooking.jpg',
        description: 'Choose from over 5,00,000 hotels worldwide ranging from luxury resorts to budget-friendly stays.',
        features: ['Best Price Guarantee', 'Flexible Cancellation', 'Verified Reviews', 'Direct Vouchers']
    },
    'euro-rail': {
        id: 'euro-rail',
        title: 'Euro Rail Bookings',
        subtitle: 'Europe Train Travel',
        icon: 'fa-train',
        image: '/images/eurorail.jpg',
        description: 'Seamless train travel across Europe with official Eurail and city-to-city tickets.',
        features: ['Official Partner', 'Instant Tickets', 'Route Planning', 'Seat Reservations']
    },
    'group-departures': {
        id: 'group-departures',
        title: 'Group Departures',
        subtitle: 'Fixed Departures',
        icon: 'fa-users',
        image: '/images/group.jpg',
        description: 'Join our expertly curated group tours with fixed departures and all-inclusive services.',
        features: ['Expert Road Guides', 'All-Inclusive', 'Small Groups', 'Cultural Immersion']
    },
    'umrah-assistance': {
        id: 'umrah-assistance',
        title: 'Umrah Assistance',
        subtitle: 'Spiritual Journey',
        icon: 'fa-pray',
        image: '/images/ummrah.jpeg',
        description: 'Complete guidance and support for your Umrah pilgrimage including visa, flights, and hotels.',
        features: ['Visa Processing', 'Near Haram Hotels', 'Ziyarat Tours', 'Physical Assistance']
    }
};

export const servicesList = Object.values(servicesData);
