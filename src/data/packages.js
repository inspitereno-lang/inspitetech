export const packagesData = {
    'european-discovery': {
        title: 'European Discovery',
        subtitle: '14 Days of majestic history and culture',
        image: '/images/European Discovery.jpeg',
        icon: 'fas fa-landmark',
        description: 'Embark on a grand tour of Europe, visiting the most iconic cities including London, Paris, Rome, and Amsterdam. This package covers flights, inter-city train transfers, 4-star hotel accommodations, and guided city tours. Experience the changing landscapes and rich cultural tapestry of Europe in one unforgettable journey.',
        features: ['Round Trip Airfare', '4-Star Hotels with Breakfast', 'Eurail Pass Included', 'Guided Tours in Every City', 'Schengen Visa Assistance'],
        conclusion: 'A perfect introduction to the wonders of Europe.'
    },
    'dubai-explorer': {
        title: 'Dubai Explorer',
        subtitle: 'Luxury and Adventure in the Desert',
        image: '/images/Dubai Explorer.jpeg',
        icon: 'fas fa-building',
        description: 'Experience the magic of Dubai with this comprehensive 7-day package. From the top of the Burj Khalifa to the depths of the desert on a safari, every moment is curated for excitement and luxury. Includes exclusive access to theme parks and a dinner cruise on Dubai Marina.',
        features: ['5-Star Hotel Stay', 'Desert Safari with BBQ Dinner', 'Burj Khalifa At The Top', 'Dubai Parks & Resorts Tickets', 'Private Airport Transfers'],
        conclusion: 'Explore the dazzling heights and traditions of Dubai.'
    },
    'asian-adventure': {
        title: 'Asian Adventure',
        subtitle: 'Explore Thailand, Singapore & Malaysia',
        image: '/images/Asian Adventure.jpeg',
        icon: 'fas fa-globe-asia',
        description: 'Dive into the vibrant cultures of Southeast Asia. This 12-day tour takes you through the bustling streets of Bangkok, the garden city of Singapore, and the multicultural hub of Kuala Lumpur. Enjoy pristine beaches, street food tours, and temple visits.',
        features: ['Multi-Country Flights', 'Beachfront Resorts (Phuket)', 'City Tours', 'Universal Studios Singapore', 'Visa Faciliation'],
        conclusion: 'An exotic journey through the heart of Asia.'
    },
    'umrah-premium': {
        title: 'Umrah Premium Package',
        subtitle: 'A Spiritual Journey with Comfort',
        image: '/images/ummrah.jpeg',
        icon: 'fas fa-pray',
        description: 'Perform your Umrah with complete peace of mind. Our premium package ensures your spiritual journey is comfortable and convenient. Stay in 5-star hotels just steps away from the Holy Harams in Makkah and Madinah, with private transfers and dedicated ground support.',
        features: ['Umrah Visa Processing', '5-Star Hotels (Makkah & Madinah)', 'VIP Private Transport', 'Ziayarat Tours', '24/7 Ground Support'],
        conclusion: 'Focus on your worship, we handle the rest.'
    },
    'family-getaway': {
        title: 'Family Getaway',
        subtitle: 'Fun for Everyone in Turkey & Switzerland',
        image: '/images/family.jpeg',
        icon: 'fas fa-users',
        description: 'Create lasting memories with this perfect family holiday. Combine the historical wonders and bazars of Istanbul with the breathtaking Alps of Switzerland. This 10-day itinerary is designed to keep both kids and adults entertained and relaxed.',
        features: ['Family Friendly Hotels', 'Bosphorus Cruise', 'Swiss Travel Pass', 'Chocolate Factory Visit', 'Daily Breakfast & Dinner'],
        conclusion: 'The ultimate bonding experience for your family.'
    },
    'honeymoon-special': {
        title: 'Honeymoon Special',
        subtitle: 'Romantic Escapes to Maldives or Bali',
        image: '/images/honemoon.jpeg',
        icon: 'fas fa-heart',
        description: 'Celebrate your love in paradise. Choose between the crystal-clear waters of the Maldives or the cultural charm of Bali. Stay in a private water villa or a jungle pool villa, enjoy candlelit dinners on the beach, and indulge in couple spa treatments.',
        features: ['Private Villa Stay', 'All-Inclusive Meal Plan', 'Romantic Beach Dinner', 'Couple Spa Session', 'Honeymoon Freebies'],
        conclusion: 'Begin your new life together in pure bliss.'
    }
};

export const packagesList = Object.entries(packagesData).map(([id, data]) => ({
    id,
    ...data
}));
