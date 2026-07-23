export interface RoomType {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  bedType: string;
  amenities: string[];
  imageUrl: string;
  totalRooms: number;
}

export interface Booking {
  id: string;
  roomTypeId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Facility {
  id: string;
  name: string;
  category: 'Accommodation' | 'Boardroom' | 'Conference Facilities' | 'Bar' | 'Restaurant' | 'parking';
  tagline: string;
  description: string;
  highlights: string[];
  capacityInfo?: string;
  imageUrl: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: 'Culture' | 'Shopping' | 'Nature' | 'Leisure';
  distance: string; // e.g. "1.5 km (5 mins drive)"
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'dining' | 'events' | 'wellness' | 'video';
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
}
