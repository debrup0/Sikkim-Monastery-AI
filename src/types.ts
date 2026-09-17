export interface MonasteryGuideResult {
  name: string;
  location: string;
  cultural_meaning: string;
  visitor_tip: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  inputSource: 'name' | 'image' | 'curated';
  inputQuery?: string;
  imageThumbnail?: string;
  result: MonasteryGuideResult;
}

export interface CuratedItem {
  id: string;
  title: string;
  category: 'monastery' | 'artifact' | 'site' | 'relic';
  district: 'East Sikkim' | 'West Sikkim' | 'South Sikkim' | 'North Sikkim' | 'All Sikkim';
  description: string;
  sampleImage?: string;
  query: string;
}

export type PageTab = 
  | 'overview'
  | 'guide'
  | 'permits'
  | 'stays'
  | 'itinerary'
  | 'marketplace'
  | 'audio'
  | 'crowd'
  | 'offline';

export interface PermitApplication {
  id: string;
  fullName: string;
  passportOrId: string;
  nationality: string;
  destination: string;
  travelDate: string;
  durationDays: number;
  vehicleNumber?: string;
  status: 'Approved' | 'Pending Verification' | 'Under Review';
  issueDate: string;
  qrCode: string;
}

export interface MonasticStay {
  id: string;
  name: string;
  location: string;
  type: 'Monastery Guest House' | 'Eco-Homestay' | 'Dormitory';
  pricePerNight: number;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
  rules: string;
}

export interface Booking {
  id: string;
  stayId: string;
  stayName: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'Confirmed' | 'Pending';
  bookingDate: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  morningActivity: string;
  afternoonActivity: string;
  eveningActivity: string;
  overnightLocation: string;
}

export interface TourItinerary {
  id: string;
  title: string;
  durationDays: number;
  district: string;
  difficulty: 'Easy' | 'Moderate' | 'Scenic Exploration';
  description: string;
  highlights: string[];
  days: ItineraryDay[];
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: 'Thangka' | 'Singing Bowls' | 'Choktse Tables' | 'Woolens & Carpets' | 'Prayer Wheels';
  price: number;
  artisan: string;
  location: string;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
}

export interface AudioGuideTrack {
  id: string;
  title: string;
  monastery: string;
  language: 'English' | 'Hindi' | 'Bhutia' | 'Lepcha' | 'Nepali';
  duration: string;
  narrator: string;
  description: string;
  audioUrl?: string;
}

export interface TermGlossaryItem {
  term: string;
  script: string;
  meaning: string;
  pronunciation: string;
  language: string;
}

export interface CrowdMonitorSite {
  id: string;
  name: string;
  district: string;
  currentVisitors: number;
  maxCapacity: number;
  status: 'Optimal' | 'Moderate' | 'Peak Congestion' | 'Closed';
  peakHours: string;
  recommendedTime: string;
}

