import { RoomType, Facility, Attraction, BlogPost, GalleryItem } from './types';

export const ROOMS_DATA: RoomType[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King Room',
    description: 'A harmonious blend of modern elegance and functional luxury, featuring refined wood accents, state-of-the-art tech, and a luxurious plush king bed.',
    pricePerNight: 280,
    capacity: 2,
    size: '42 m²',
    bedType: '1 King Bed',
    amenities: ['High-speed Wi-Fi', '55" Smart TV', 'Nespresso Machine', 'Premium Mini-bar', 'Marble Bathroom', '24/7 Room Service', 'Rain Shower'],
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    totalRooms: 15
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    description: 'Designed for discerning travelers, our Executive Suite offers a separate elegant living lounge, a dedicated work alcove, and breathtaking panoramic skyline views.',
    pricePerNight: 450,
    capacity: 3,
    size: '68 m²',
    bedType: '1 King Bed + 1 Sofa Bed',
    amenities: ['Lounge Access', 'Personal Concierge', 'Welcome Champagne', '55" Smart TV & Bose Soundbar', 'Walk-in Wardrobe', 'Nespresso Professional', 'Deep Soaking Tub'],
    imageUrl: '/src/assets/images/esstana_luxury_suite_1784642199789.jpg',
    totalRooms: 8
  },
  {
    id: 'presidential-suite',
    name: 'Esstana Grand Presidential Suite',
    description: 'The pinnacle of bespoke opulence. Features double-height ceilings, a majestic master bedroom, a private dining room for six, kitchen, butler service, and a private terrace.',
    pricePerNight: 1200,
    capacity: 4,
    size: '150 m²',
    bedType: '2 King Beds',
    amenities: ['Private Butler', 'Private Chef Dining Option', 'Airport Limousine Transfer', 'Infinity Pool Access', 'Private Terrace', '65" OLED Theater System', 'Spa Jacuzzi Bathroom'],
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    totalRooms: 2
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'accommodation',
    name: 'Luxury Accommodation',
    category: 'Accommodation',
    tagline: 'Sojourn in Sublime Comfort',
    description: 'Our collection of 25 guestrooms and bespoke suites is crafted for sensory serenity. High-thread-count Egyptian cotton, acoustic dampening, and personalized lighting scenes offer perfect rest.',
    highlights: ['Tailored sleep menu and pillow selections', 'Acoustic architectural dampening', 'Automated touch-control lighting & temperature', 'Breathtaking urban and sunset scenery'],
    imageUrl: '/src/assets/images/esstana_luxury_suite_1784642199789.jpg'
  },
  {
    id: 'boardroom',
    name: 'The Crown Boardroom',
    category: 'Boardroom',
    tagline: 'Where Modern Power Convenes',
    description: 'An executive boardroom tailored for high-stakes decisions and private discussions. Equipped with ultra-high-definition interactive displays, secure acoustics, and ergonomic seating.',
    highlights: ['State-of-the-art 98" 4K presentation display', 'Encrypted wireless screen casting', 'Studio-quality teleconferencing sound system', 'Bespoke catered meeting packages available'],
    capacityInfo: 'Up to 16 delegates',
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'conference-facilities',
    name: 'Esstana Grand Ballroom & Conference Hall',
    category: 'Conference Facilities',
    tagline: 'Magnificent Spaces for Grand Occasions',
    description: 'Our majestic grand hall can host sprawling international conferences, product launches, or fairy-tale weddings. Featuring multi-zone ambient lighting and sound structures.',
    highlights: ['Modular partitions to customize three distinct setups', 'Professional visual production desk & lighting rigs', 'Spacious pre-function gallery with cocktail bars', 'Full-service catering by culinary masterchefs'],
    capacityInfo: 'Up to 350 guests banquet-style / 500 theater-style',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bar',
    name: 'The Gilded Vault Bar',
    category: 'Bar',
    tagline: 'Artisanal Spirits in Velvet Splendor',
    description: 'Unwind in an intimate, low-lit sanctuary featuring rare vintage whiskeys, hand-crafted botanical cocktails, and a highly curated global wine list, accompanied by subtle live jazz.',
    highlights: ['Exclusive collection of single-malt scotch whiskies', 'Award-winning mixologists preparing house botanicals', 'Caviar & premium small plate menu pairings', 'Private tasting lounge with cigar humidor'],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'restaurant',
    name: 'L’Ambroisie Restaurant',
    category: 'Restaurant',
    tagline: 'Symphony of Culinary Modernity',
    description: 'A Michelin-style dining room offering an avant-garde fusion of local organic ingredients and classical culinary techniques. Every dish is a beautifully presented masterpiece.',
    highlights: ['7-Course signature chef tasting menu with wine pairings', 'Fresh seasonal ingredients sourced from local organic estate', 'Chef’s Table private dining room in the open kitchen', 'Sommelier curating an extensive 800-bottle cellar'],
    imageUrl: '/src/assets/images/esstana_restaurant_1784642212536.jpg'
  },
  {
    id: 'parking',
    name: 'Secure Executive Parking',
    category: 'parking',
    tagline: 'Seamless Access & Safe Keeping',
    description: 'Travel with absolute peace of mind. Our state-of-the-art secure underground parking garage features EV hyper-chargers, 24/7 security escorts, and fully-serviced luxury valet options.',
    highlights: ['24/7 Monitored CCTV & on-site security guards', 'High-speed DC fast EV charging terminals', 'Complimentary professional luxury valet service', 'Direct secure private elevator straight to guest floors'],
    imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80'
  }
];

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: 'opera-house',
    name: 'Royal Opera & Fine Arts Centre',
    category: 'Culture',
    distance: '0.8 km (10 mins walk)',
    description: 'The city’s majestic landmark hosting breathtaking operas, classical symphony concerts, and modern theatrical productions in an acoustically flawless gold-leaf theater.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    highlights: ['VIP private box bookings', 'Guided architectural tours', 'Exquisite pre-show champagne balcony']
  },
  {
    id: 'avenue-shopping',
    name: 'The Golden Promenade & Luxury Boutiques',
    category: 'Shopping',
    distance: '0.4 km (5 mins walk)',
    description: 'A cobblestone avenue lined with the flagship boutiques of global haute couture, premium watchmakers, fine jewelry design houses, and high-end cafes.',
    imageUrl: 'https://images.unsplash.com/photo-1560243563-062bff001d68?auto=format&fit=crop&w=800&q=80',
    highlights: ['Personal VIP shopper arrangements', 'Private in-room presentation option', 'Tax-free premium shopping assistance']
  },
  {
    id: 'botanical-gardens',
    name: 'Serene Botanical Sanctuary',
    category: 'Nature',
    distance: '2.5 km (8 mins drive)',
    description: 'Over 50 hectares of meticulously landscaped Victorian gardens, cascading fountains, giant tropical glass houses, and tranquil ponds of blooming lilies.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Morning private yoga sessions', 'Historical glasshouse orchid collection', 'Scenic sunset picnic setups by our concierge']
  },
  {
    id: 'art-museum',
    name: 'Museum of Contemporary Masterpieces',
    category: 'Culture',
    distance: '1.2 km (15 mins walk)',
    description: 'A architectural masterwork in itself, housing some of the world’s most influential modern canvases, sculptures, and seasonal avant-garde immersive displays.',
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=800&q=80',
    highlights: ['After-hours private gallery tours', 'Exclusive artist talk invitations', 'Sculpture garden cafe overlooking the river']
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: 'luxury-travel-trends',
    title: 'The New Era of Travel: Curated Sensory Serenity',
    excerpt: 'How modern luxury hospitality is moving beyond visual opulence to design holistic sensory retreats that restore the mind and inspire the soul.',
    content: `In the fast-paced modern landscape, luxury has found a new, profound definition. It is no longer merely about gold leaf, marble pillars, or a high-priced menu. True luxury today is measured in quietness, deep sleep, clean air, and curated moments of sensory peace.

Here at Esstana Hotels, we have pioneered the 'Sensory Retreat' philosophy. Under this ethos, we design environments that cater to all five senses in perfect harmony:
- **Acoustic Sanctuary**: Our guestrooms feature advanced architectural dampening, isolating the busy metropolitan pulse and establishing a deep, peaceful stillness.
- **Visual Calm**: Our interior palettes emphasize warm creams, polished brass, walnut timber, and rich negative space, avoiding visual noise.
- **The Sleep Menu**: Hand-selected Egyptian linen paired with active lavender botanical diffusers and organic herbal tea blends.

Discover how you can experience this transformative approach to hospitality on your next stay.`,
    category: 'Travel & Lifestyle',
    author: 'Elena Rostova, Chief Experience Officer',
    date: 'July 15, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'culinary-mastery',
    title: 'Behind the Scenes: Crafting the Signature 7-Course Experience',
    excerpt: 'An interview with Chef de Cuisine Marc Laurent on the inspiration behind L’Ambroisie’s summer tasting tasting card and local estate sourcing.',
    content: `Chef Marc Laurent believes that a plate should tell a story. In L'Ambroisie, our signature restaurant, the summer 7-course tasting menu is designed to take diners on an unforgettable botanical journey.

"We start by visiting our partnered organic estate, just thirty minutes outside the city," Chef Marc explains. "The menu is dictated by what the soil gives us. For example, our Heirloom Tomato Carpaccio is made from heritage tomatoes harvested at 5:00 AM, drizzled with olive oil pressed from trees on the same estate."

The pairing of these local culinary gems with classical French reduction methods creates an incredibly balanced experience. The menu is capped off with our signature Honey and Lavender Soufflé, harvested from the hotel’s own rooftop hives. 

Reserve your seat at L’Ambroisie to experience Chef Marc's culinary artistry firsthand.`,
    category: 'Gastronomy',
    author: 'Marc Laurent, Executive Chef',
    date: 'June 28, 2026',
    readTime: '5 min read',
    imageUrl: '/src/assets/images/esstana_restaurant_1784642212536.jpg'
  },
  {
    id: 'business-and-pleasure',
    title: 'Bleisure Mastery: Seamless Work-Life Fusion',
    excerpt: 'How executive business trips are being transformed with boardroom optimization, digital hubs, and wellness transitions.',
    content: `With remote and hybrid operations becoming the norm, a new traveler has emerged: the 'Bleisure' executive. These guests merge high-stakes business agendas with deep wellness and exploration.

To serve this lifestyle, Esstana Hotels provides a seamless transition. Your day can begin with a high-definition encrypted presentation in the Crown Boardroom, transition to a private curated lunch on our skyline terrace, and conclude with a relaxing deep-tissue botanical massage in our wellness pavilion.

Our in-room desks feature ergonomic support, fast multi-device charging hubs, and secure high-speed fiber lines to ensure you remain fully connected while feeling entirely pampered.`,
    category: 'Business',
    author: 'David Vance, Operations Director',
    date: 'May 14, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Grand Entrance Lobby',
    category: 'rooms',
    type: 'image',
    url: '/src/assets/images/esstana_hotel_lobby_1784642184817.jpg'
  },
  {
    id: 'gal-2',
    title: 'Presidential Suite Bedroom',
    category: 'rooms',
    type: 'image',
    url: '/src/assets/images/esstana_luxury_suite_1784642199789.jpg'
  },
  {
    id: 'gal-3',
    title: 'L’Ambroisie Main Dining Room',
    category: 'dining',
    type: 'image',
    url: '/src/assets/images/esstana_restaurant_1784642212536.jpg'
  },
  {
    id: 'gal-4',
    title: 'The Gilded Vault Bar Cocktails',
    category: 'dining',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-5',
    title: 'Crown Boardroom Setup',
    category: 'events',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-6',
    title: 'Rooftop Infinity Wellness Pool',
    category: 'wellness',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-video-1',
    title: 'Esstana Ambient Cinematic Tour',
    category: 'video',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-hotel-swimming-pool-42220-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-video-2',
    title: 'Culinary Masterpieces at L’Ambroisie',
    category: 'video',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-red-wine-into-a-glass-close-up-43033-large.mp4',
    thumbnailUrl: '/src/assets/images/esstana_restaurant_1784642212536.jpg'
  }
];
