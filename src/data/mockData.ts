import { MonasticStay, TourItinerary, MarketplaceProduct, AudioGuideTrack, TermGlossaryItem, CrowdMonitorSite } from '../types';

export const MOCK_STAYS: MonasticStay[] = [
  {
    id: 'stay-1',
    name: 'Rumtek Dharma Chakra Monastery Guest House',
    location: 'Rumtek, East Sikkim',
    type: 'Monastery Guest House',
    pricePerNight: 1200,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    amenities: ['Morning Puja Access', 'Vegetarian Meals Included', 'Hot Water', 'Library Access', 'Mountain View'],
    description: 'Experience serene monastic life directly within the Karma Kagyu lineage headquarters. Quiet meditative environment with daily monk chants.',
    rules: 'Strict silence after 9 PM. Vegetarian dining only. Respectful attire required at all times.',
  },
  {
    id: 'stay-2',
    name: 'Pemayangtse Heritage Eco-Lodge',
    location: 'Pelling, West Sikkim',
    type: 'Eco-Homestay',
    pricePerNight: 2200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Kanchenjunga View', 'Organic Farm-to-Table', 'Guided Monastery Walks', 'Bonfire Area', 'Wi-Fi'],
    description: 'Overlooking the majestic snow-capped peaks of Kanchenjunga and steps away from the 1705 Pemayangtse Monastery.',
    rules: 'Eco-friendly property; single-use plastics are strictly prohibited on premises.',
  },
  {
    id: 'stay-3',
    name: 'Yuksom Pilgrim & Hermit Rest House',
    location: 'Yuksom, West Sikkim',
    type: 'Dormitory',
    pricePerNight: 800,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Coronation Throne Access', 'Trekking Guide Assistance', 'Shared Kitchen', 'Prayer Room'],
    description: 'Located at the historical birthplace of Sikkim kingdom and starting point for Dubdi Monastery trails.',
    rules: 'Communal living etiquette expected. Lights out by 10 PM.',
  },
  {
    id: 'stay-4',
    name: 'Phodong Valley Buddhist Retreat',
    location: 'Phodong, North Sikkim',
    type: 'Monastery Guest House',
    pricePerNight: 1500,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    amenities: ['Monastic Library', 'Tea Service', 'Meditation Hall', 'Hot Water'],
    description: 'Quiet retreat center near the historic 18th-century Phodong Monastery of the Kagyu sect.',
    rules: 'No smoking or alcohol permitted on monastery grounds.',
  }
];

export const MOCK_ITINERARIES: TourItinerary[] = [
  {
    id: 'itin-1',
    title: '3-Day West Sikkim Heritage Circuit',
    durationDays: 3,
    district: 'West Sikkim',
    difficulty: 'Easy',
    description: 'Explore Sikkim\'s oldest monasteries, sacred coronation sites, and 7-tiered wooden marvels in Pelling and Yuksom.',
    highlights: ['Pemayangtse Monastery', 'Dubdi Monastery (Oldest)', 'Tashiding Bumchu Shrine', 'Rabdentse Palace Ruins'],
    days: [
      {
        dayNumber: 1,
        title: 'Arrival in Pelling & Pemayangtse',
        morningActivity: 'Arrive in Pelling and check in. Visit Pemayangtse Monastery to view the 7-tiered Sangtok Palri wooden carving.',
        afternoonActivity: 'Explore the historic Rabdentse Palace ruins overlooking the Kanchenjunga range.',
        eveningActivity: 'Evening meditation and briefing on Nyingma lineage history.',
        overnightLocation: 'Pemayangtse Eco-Lodge'
      },
      {
        dayNumber: 2,
        title: 'Yuksom & Dubdi Hermit Trail',
        morningActivity: 'Drive to Yuksom (first capital of Sikkim). Trek through pristine forest to Dubdi Monastery, established in 1701.',
        afternoonActivity: 'Visit Norbugang Coronation Throne where the first Chogyal was anointed in 1642.',
        eveningActivity: 'Traditional Sikkimese butter tea tasting with local elders.',
        overnightLocation: 'Yuksom Pilgrim Rest House'
      },
      {
        dayNumber: 3,
        title: 'Tashiding Sacred Hill & Bumchu',
        morningActivity: 'Visit Tashiding Monastery on the sacred heart-shaped hill between Rathong and Rangeet rivers.',
        afternoonActivity: 'Inspect sacred chortens believed to cleanse sins upon mere sight (Thongwa Rangdol).',
        eveningActivity: 'Departure towards Gangtok or Siliguri.',
        overnightLocation: 'Trip Concludes'
      }
    ]
  },
  {
    id: 'itin-2',
    title: '5-Day North Sikkim Vajrayana Journey',
    durationDays: 5,
    district: 'North Sikkim',
    difficulty: 'Scenic Exploration',
    description: 'A deeply immersive pilgrimage into high-altitude alpine valleys, ancient gompas, and glacial waterfalls.',
    highlights: ['Rumtek Monastery Seat', 'Phodong & Labrang Monasteries', 'Lachen & Lachung Gompas', 'Yumthang Valley'],
    days: [
      {
        dayNumber: 1,
        title: 'Gangtok to Rumtek Monastery Seat',
        morningActivity: 'Begin in Gangtok. Visit Enchey Monastery and proceed to Rumtek Dharma Chakra Centre.',
        afternoonActivity: 'View the Golden Stupa and Vajra Mukut (Black Crown) exhibition hall.',
        eveningActivity: 'Attend evening puja with Karma Kagyu monks.',
        overnightLocation: 'Rumtek Monastery Guest House'
      },
      {
        dayNumber: 2,
        title: 'Phodong & North Sikkim Gateway',
        morningActivity: 'Drive north towards Mangan. Visit Phodong Monastery renowned for magnificent wall frescoes.',
        afternoonActivity: 'Explore Labrang Monastery, one of the rare round-shaped architectural gompas in Sikkim.',
        eveningActivity: 'Check into alpine lodge and acclimatization briefing.',
        overnightLocation: 'Phodong / Singhik Retreat'
      },
      {
        dayNumber: 3,
        title: 'Lachen & Chopta Valley Sanctuary',
        morningActivity: 'Journey through deep river gorges to Lachen village. Visit Lachen Gompa.',
        afternoonActivity: 'Excursion towards Chopta Valley and Gurudongmar Lake approach route.',
        eveningActivity: 'Rest and stargazing at high altitude.',
        overnightLocation: 'Lachen Alpine Lodge'
      },
      {
        dayNumber: 4,
        title: 'Lachung & Yumthang Flower Sanctuary',
        morningActivity: 'Descend to Lachung village. Visit Lachung Monastery nestled against towering crags.',
        afternoonActivity: 'Explore Yumthang Valley (Valley of Flowers) and hot sulfur springs.',
        eveningActivity: 'Cultural interaction with Bhutia village elders.',
        overnightLocation: 'Lachung Resort'
      },
      {
        dayNumber: 5,
        title: 'Return via Enchey & Gangtok',
        morningActivity: 'Scenic drive back south along Teesta River gorge.',
        afternoonActivity: 'Final souvenir collection in Gangtok MG Marg.',
        eveningActivity: 'Tour debrief and certificate presentation.',
        overnightLocation: 'Tour Concludes'
      }
    ]
  }
];

export const MOCK_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'prod-1',
    name: 'Hand-Painted Guru Rinpoche Thangka',
    category: 'Thangka',
    price: 14500,
    artisan: 'Master Pema Norbu',
    location: 'Rumtek Artisan Guild, East Sikkim',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Exquisite mineral pigment on cotton canvas featuring Padmasambhava surrounded by protective deities with 24k gold leaf detailing.',
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Hand-Hammered Seven-Metal Singing Bowl',
    category: 'Singing Bowls',
    price: 3200,
    artisan: 'Tashi Dorjee',
    location: 'Gangtok Craft Center',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional 7-alloy meditative singing bowl emitting deep resonant harmonic vibrations for sound healing and prayer.',
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Traditional Carved Wooden Choktse Table',
    category: 'Choktse Tables',
    price: 6800,
    artisan: 'Karma Wangchuk',
    location: 'Lachung Woodcraft Unit',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    description: 'Foldable traditional Sikkimese multi-tier ritual altar table carved from seasoned walnut wood with auspicious Tibetan motifs.',
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Hand-Woven Lepcha Ethnic Woolen Shawl',
    category: 'Woolens & Carpets',
    price: 2400,
    artisan: 'Doma Lepcha Weavers',
    location: 'Dzongu Reserve, North Sikkim',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic vegetable-dyed organic sheep wool shawl featuring geometric Lepcha motifs hand-woven on traditional backstrap looms.',
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Brass Desktop Mani Prayer Wheel',
    category: 'Prayer Wheels',
    price: 1850,
    artisan: 'Sonam Metalworks',
    location: 'Namchi, South Sikkim',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: 'Tabletop brass prayer wheel engraved with the six-syllable mantra "Om Mani Padme Hum", containing millions of printed mantras inside.',
    inStock: true
  }
];

export const MOCK_AUDIO_TRACKS: AudioGuideTrack[] = [
  {
    id: 'audio-1',
    title: 'The Golden Stupa & Karmapa Lineage',
    monastery: 'Rumtek Monastery',
    language: 'English',
    duration: '4:45',
    narrator: 'Ven. Lama Tenzin',
    description: 'An immersive audio tour detailing the architectural majesty of Rumtek and the sacred relics of the 16th Karmapa.'
  },
  {
    id: 'audio-2',
    title: 'Pemayangtse & The Seven-Tiered Heavenly Abode',
    monastery: 'Pemayangtse Monastery',
    language: 'English',
    duration: '5:20',
    narrator: 'Dr. Sonam Gyatso',
    description: 'Step-by-step narration explaining the cosmic symbolism of Sangtok Palri carved single-handedly by Lama Dunzin Dorjee.'
  },
  {
    id: 'audio-3',
    title: 'Tashiding & The Holy Bumchu Ceremony',
    monastery: 'Tashiding Monastery',
    language: 'English',
    duration: '3:50',
    narrator: 'Karma Wangchuk',
    description: 'Discover the annual holy water vessel ceremony that predicts the future prosperity and weather of Sikkim.'
  }
];

export const MOCK_GLOSSARY: TermGlossaryItem[] = [
  { term: 'Gompa', script: 'དགོན་པ', meaning: 'Buddhist monastery or meditation center', pronunciation: 'Gohm-pah', language: 'Tibetan' },
  { term: 'Chorten', script: 'མཆོད་རྟེན', meaning: 'Buddhist stupa representing the enlightened mind of the Buddha', pronunciation: 'Chohr-ten', language: 'Tibetan' },
  { term: 'Thangka', script: 'ཐང་ཀ', meaning: 'Traditional Tibetan Buddhist scroll painting on cotton or silk', pronunciation: 'Thang-kah', language: 'Tibetan' },
  { term: 'Mani', script: 'མཎི', meaning: 'Sacred prayer mantra ("Om Mani Padme Hum")', pronunciation: 'Mah-nee', language: 'Tibetan' },
  { term: 'Cham', script: 'འཆམ', meaning: 'Sacred ritual masked dance performed by monks during festivals', pronunciation: 'Chahm', language: 'Tibetan' },
  { term: 'Lama', script: 'བླ་མ', meaning: 'Spiritual teacher or Vajrayana master', pronunciation: 'Lah-mah', language: 'Tibetan' }
];

export const MOCK_CROWD_SITES: CrowdMonitorSite[] = [
  {
    id: 'crowd-1',
    name: 'Rumtek Monastery (Dharma Chakra Centre)',
    district: 'East Sikkim',
    currentVisitors: 142,
    maxCapacity: 300,
    status: 'Optimal',
    peakHours: '11:00 AM – 2:00 PM',
    recommendedTime: 'Early Morning (8:00 AM – 9:30 AM)'
  },
  {
    id: 'crowd-2',
    name: 'Pemayangtse Monastery',
    district: 'West Sikkim',
    currentVisitors: 88,
    maxCapacity: 150,
    status: 'Optimal',
    peakHours: '12:00 PM – 3:00 PM',
    recommendedTime: 'Late Afternoon (3:30 PM – 5:00 PM)'
  },
  {
    id: 'crowd-3',
    name: 'Tashiding Monastery',
    district: 'West Sikkim',
    currentVisitors: 65,
    maxCapacity: 120,
    status: 'Optimal',
    peakHours: '10:30 AM – 1:30 PM',
    recommendedTime: 'Morning (9:00 AM)'
  },
  {
    id: 'crowd-4',
    name: 'Enchey Monastery',
    district: 'East Sikkim',
    currentVisitors: 110,
    maxCapacity: 130,
    status: 'Moderate',
    peakHours: '1:00 PM – 4:00 PM',
    recommendedTime: 'Morning (8:30 AM)'
  },
  {
    id: 'crowd-5',
    name: 'Samdruptse Statue & Shrine',
    district: 'South Sikkim',
    currentVisitors: 195,
    maxCapacity: 250,
    status: 'Peak Congestion',
    peakHours: '11:30 AM – 3:30 PM',
    recommendedTime: 'Evening (4:00 PM)'
  }
];
