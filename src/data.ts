import { RoomType, Facility, Attraction, BlogPost, GalleryItem } from './types';

export const ROOMS_DATA: RoomType[] = [
  {
    id: 'standard-room',
    name: 'Standard Room',
    description: 'A cozy and comfortable space designed for rest, featuring modern amenities and essential comforts. Bed Only accommodation.',
    pricePerNight: 2000,
    capacity: 2,
    size: '28 m²',
    bedType: '1 Double Bed',
    amenities: ['Bed Only Option', 'High-speed Wi-Fi', 'Smart TV', 'En-suite Bathroom', '24/7 Room Service'],
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    totalRooms: 15
  },
  {
    id: 'superior-room',
    name: 'Superior Room',
    description: 'An upgraded room offering extra space, refined interior decor, and enhanced amenities for a relaxing and peaceful stay.',
    pricePerNight: 2500,
    capacity: 2,
    size: '36 m²',
    bedType: '1 Queen Bed',
    amenities: ['High-speed Wi-Fi', '55" Smart TV', 'Dedicated Work Desk', 'Marble Bathroom', 'Rain Shower', '24/7 Room Service'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    totalRooms: 12
  },
  {
    id: 'twin-bed-rooms',
    name: 'Twin Bed Rooms',
    description: 'Ideal for friends or colleagues, featuring two plush twin beds in a spacious, beautifully appointed room.',
    pricePerNight: 3000,
    capacity: 2,
    size: '40 m²',
    bedType: '2 Twin Beds',
    amenities: ['High-speed Wi-Fi', '55" Smart TV', 'Seating Area', 'Tea & Coffee Maker', '24/7 Room Service'],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    totalRooms: 10
  },
  {
    id: 'executive-room',
    name: 'Executive Room',
    description: 'Designed for executive clarity and luxury, featuring premium furnishings, dedicated workspace, and high-end amenities.',
    pricePerNight: 3500,
    capacity: 3,
    size: '48 m²',
    bedType: '1 King Bed',
    amenities: ['Executive Lounge Access', 'High-speed Wi-Fi', 'Smart TV & Soundbar', 'Nespresso Machine', 'Deep Soaking Tub'],
    imageUrl: '/src/assets/images/esstana_luxury_suite_1784642199789.jpg',
    totalRooms: 8
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'accommodation',
    name: 'Affordable Accommodation',
    category: 'Accommodation',
    tagline: 'Comfort & Elegance in Every Room',
    description: 'Our guestrooms provide sublime comfort for every traveler. From Standard Bed Only options to Executive suites, enjoy pristine environments and top-tier hospitality.',
    highlights: [
      'Standard Room (from Ksh 2000 Bed Only)',
      'Superior Room (from Ksh 2500)',
      'Twin Bed Rooms (from Ksh 3000)',
      'Executive Room (from Ksh 3500)'
    ],
    imageUrl: '/src/assets/images/esstana_luxury_suite_1784642199789.jpg'
  },
  {
    id: 'boardroom',
    name: 'The Crown Boardroom',
    category: 'Boardroom',
    tagline: 'Conducive Environments for Board Meetings',
    description: 'An executive boardroom tailored for high-stakes decisions and private discussions. Equipped with interactive displays and ergonomic seating.',
    highlights: ['State-of-the-art presentation display', 'Encrypted wireless screen casting', 'Teleconferencing sound system', 'Catered meeting packages available'],
    capacityInfo: 'Up to 16 delegates',
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'conference-facilities',
    name: 'Esstana Conference Hall',
    category: 'Conference Facilities',
    tagline: 'Conducive Environments for Conferences & Outings',
    description: 'Our majestic hall hosts conferences, corporate outings, parties, and special celebrations with versatile seating layouts and high-end visual equipment.',
    highlights: ['Modular setups for any event size', 'Professional audio-visual production desk', 'Spacious pre-function gallery', 'Full-service event catering'],
    capacityInfo: 'Up to 350 guests banquet-style / 500 theater-style',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bar',
    name: 'The Gilded Lounge & Bar',
    category: 'Bar',
    tagline: 'Artisanal Drinks & Relaxation',
    description: 'Unwind in an intimate sanctuary featuring fine spirits, hand-crafted botanical cocktails, and a curated global wine list.',
    highlights: ['Exclusive selection of fine spirits', 'Award-winning mixologists', 'Appetizer & small plate menu pairings', 'Relaxing ambiance'],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'restaurant',
    name: 'Esstana Main Restaurant',
    category: 'Restaurant',
    tagline: 'Sumptuous Meals & Culinary Excellence',
    description: 'Indulge yourself in sumptuous meals cooked by master chefs using fresh, organic ingredients. Perfect for family dining, outings, and celebrations.',
    highlights: ['Multi-course signature dining menu', 'Fresh local & organic ingredients', 'Private dining areas available', 'Extensive wine & beverage collection'],
    imageUrl: '/src/assets/images/esstana_restaurant_1784642212536.jpg'
  },
  {
    id: 'parking',
    name: 'Secure Guest Parking',
    category: 'parking',
    tagline: 'Seamless Access & Safe Keeping',
    description: 'Travel with absolute peace of mind. Our secure parking garage features 24/7 security escorts, CCTV monitoring, and safe access.',
    highlights: ['24/7 Monitored CCTV & security guards', 'Ample parking bays', 'Valet service options', 'Easy access to main entrance'],
    imageUrl: 'https://images.unsplash.com/photo-1590474899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80'
  }
];

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: 'seven-forks-dams',
    name: 'The Seven Forks Dams',
    category: 'Nature',
    distance: '35 km from hotel',
    description: 'A magnificent series of hydroelectric power dams along the Tana River, featuring scenic water views and surrounding greenery.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hydroelectric dam views', 'Scenic river landscapes', 'Birdwatching & nature photography']
  },
  {
    id: 'hills-within-embu',
    name: 'Hills Within Embu',
    category: 'Nature',
    distance: '5 km from hotel',
    description: 'Rolling green hills providing panoramic views of the Embu countryside, ideal for morning hikes, nature walks, and photography.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Scenic hiking trails', 'Panoramic landscape vistas', 'Fresh mountain atmosphere']
  },
  {
    id: 'mount-kenya',
    name: 'Mount Kenya',
    category: 'Nature',
    distance: '45 km from hotel',
    description: 'Africa’s second-highest peak, offering majestic snow-capped vistas, rich alpine flora, wildlife, and world-class trekking opportunities.',
    imageUrl: 'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Guided trekking & hiking', 'Unmatched mountain vistas', 'UNESCO World Heritage Site']
  },
  {
    id: 'mwea-national-reserve',
    name: 'Mwea National Reserve',
    category: 'Nature',
    distance: '40 km from hotel',
    description: 'A peaceful savanna ecosystem home to elephants, Rothschild giraffes, zebras, hippos, and over 200 bird species.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    highlights: ['Safari game drives', 'Boat rides on Tana River', 'Wildlife viewing']
  },
  {
    id: 'hotel-views',
    name: 'Hotel Views',
    category: 'Leisure',
    distance: 'On site',
    description: 'Breathtaking scenery directly from Esstana Hotels, capturing serene gardens, vibrant sunsets, and surrounding landscapes.',
    imageUrl: '/src/assets/images/esstana_hotel_lobby_1784642184817.jpg',
    highlights: ['Sunset balcony viewing', 'Lush landscaped gardens', 'Quiet, conducive environment']
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: 'esstana-experience',
    title: 'Welcome to Esstana Hotels: Your Perfect Getaway',
    excerpt: 'Discover sumptuous meals, highly affordable accommodation, and conducive environments for conferences, outings, and celebrations in Embu.',
    content: `Esstana Hotels is the perfect getaway to indulge yourself in sumptuous meals, highly affordable accommodation, conducive environments for conferences, board meetings, outings, parties and a host of other treats for yourself. We are just a call away and you are most welcome.

Whether you are seeking a restful weekend retreat, a productive location for executive meetings, or a spacious venue for events, our dedicated staff ensures every requirement is met with perfection.

Located conveniently just 200m off the Embu-Meru Highway, Esstana Hotels offers easy accessibility without the intrusion of traffic noise, ensuring a quiet, peaceful stay.`,
    category: 'Hospitality',
    author: 'Esstana Management',
    date: 'July 2026',
    readTime: '3 min read',
    imageUrl: '/src/assets/images/esstana_hotel_lobby_1784642184817.jpg'
  },
  {
    id: 'culinary-mastery',
    title: 'Sumptuous Meals & Fine Dining at Esstana',
    excerpt: 'An inside look at our kitchen highlights, fresh local ingredients, and signature dining treats crafted for every guest.',
    content: `At Esstana Hotels, food is an art. Our culinary team prepares sumptuous dishes featuring fresh, locally sourced ingredients prepared to perfection.

Whether you prefer traditional local delicacies or gourmet international cuisine, our menu offers a wide variety of meals designed to delight your palate. Enjoy your dining in our spacious restaurant or request room service delivered straight to your suite.`,
    category: 'Gastronomy',
    author: 'Executive Chef',
    date: 'June 2026',
    readTime: '4 min read',
    imageUrl: '/src/assets/images/esstana_restaurant_1784642212536.jpg'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Standard & Superior Rooms',
    category: 'Rooms',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-2',
    title: 'Executive Suite Master Bedroom',
    category: 'Rooms',
    type: 'image',
    url: '/src/assets/images/esstana_luxury_suite_1784642199789.jpg'
  },
  {
    id: 'gal-3',
    title: 'Twin Bed Rooms Setup',
    category: 'Rooms',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-4',
    title: 'Main Dining Restaurant & Sumptuous Meals',
    category: 'Dining',
    type: 'image',
    url: '/src/assets/images/esstana_restaurant_1784642212536.jpg'
  },
  {
    id: 'gal-5',
    title: 'Gilded Vault Lounge & Bar',
    category: 'Dining',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-6',
    title: 'Breathtaking Sunset Hotel Views',
    category: 'Views',
    type: 'image',
    url: '/src/assets/images/esstana_hotel_lobby_1784642184817.jpg'
  },
  {
    id: 'gal-7',
    title: 'Hotel Gardens & Landscape Views',
    category: 'Views',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-8',
    title: 'Mount Kenya Peaks',
    category: 'Attraction Sites',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-9',
    title: 'Seven Forks Dam Waterway',
    category: 'Attraction Sites',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-10',
    title: 'Mwea National Reserve Savanna',
    category: 'Attraction Sites',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-11',
    title: 'Crown Executive Boardroom',
    category: 'Conference Facilities',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-12',
    title: 'Esstana Grand Conference Hall',
    category: 'Conference Facilities',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-video-1',
    title: 'Esstana Hotels Overview Video',
    category: 'video',
    type: 'video',
    url: 'https://youtu.be/boD3pWhMMRs?si=afRUbpSJM9KD91lX',
    thumbnailUrl: 'https://img.youtube.com/vi/boD3pWhMMRs/hqdefault.jpg'
  }
];
