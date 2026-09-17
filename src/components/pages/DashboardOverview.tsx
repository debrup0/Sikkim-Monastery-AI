import React from 'react';
import { PageTab, PermitApplication, Booking, MarketplaceProduct } from '../../types';
import { 
  Compass, 
  FileText, 
  Bed, 
  Calendar, 
  ShoppingBag, 
  Volume2, 
  Users, 
  WifiOff, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (tab: PageTab) => void;
  permits: PermitApplication[];
  bookings: Booking[];
  cart: MarketplaceProduct[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  permits,
  bookings,
  cart,
}) => {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1E1E]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 border border-[#E8E4D8]">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7E66] font-bold">
              Official Sikkim Monastic & Cultural Portal
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] leading-tight">
            Discover Vajrayana Heritage, Permits, Stays & Craft
          </h2>
          <p className="text-sm sm:text-base text-[#4A443D] leading-relaxed font-serif">
            Welcome to the centralized digital repository for Sikkim's sacred monasteries, Inner Line Permits, monastic guest house bookings, intelligent itineraries, and artisanal heritage.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('guide')}
              className="px-6 py-3 bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center space-x-2 transition shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Cultural AI Guide</span>
            </button>
            <button
              onClick={() => onNavigate('permits')}
              className="px-6 py-3 bg-white hover:bg-[#E8E4D8] text-[#2D2A26] border border-[#E8E4D8] text-xs uppercase tracking-[0.2em] font-bold flex items-center space-x-2 transition"
            >
              <FileText className="w-4 h-4 text-[#8B1E1E]" />
              <span>Apply for E-Permit / ILP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-[#E8E4D8] space-y-2">
          <div className="flex items-center justify-between text-[#8B7E66]">
            <span className="text-[10px] uppercase tracking-widest font-bold">Active Permits</span>
            <FileText className="w-4 h-4 text-[#8B1E1E]" />
          </div>
          <p className="text-2xl font-serif text-[#1A1A1A]">{permits.length} Issued</p>
          <p className="text-xs text-[#8B7E66]">North & East Sikkim Protected Areas</p>
        </div>

        <div className="bg-white p-5 border border-[#E8E4D8] space-y-2">
          <div className="flex items-center justify-between text-[#8B7E66]">
            <span className="text-[10px] uppercase tracking-widest font-bold">Monastic Stays</span>
            <Bed className="w-4 h-4 text-[#8B1E1E]" />
          </div>
          <p className="text-2xl font-serif text-[#1A1A1A]">{bookings.length} Booked</p>
          <p className="text-xs text-[#8B7E66]">Rumtek & Pemayangtse Sanctuaries</p>
        </div>

        <div className="bg-white p-5 border border-[#E8E4D8] space-y-2">
          <div className="flex items-center justify-between text-[#8B7E66]">
            <span className="text-[10px] uppercase tracking-widest font-bold">Marketplace Cart</span>
            <ShoppingBag className="w-4 h-4 text-[#8B1E1E]" />
          </div>
          <p className="text-2xl font-serif text-[#1A1A1A]">{cart.length} Items</p>
          <p className="text-xs text-[#8B7E66]">Authentic Thangkas & Handicrafts</p>
        </div>

        <div className="bg-white p-5 border border-[#E8E4D8] space-y-2">
          <div className="flex items-center justify-between text-[#8B7E66]">
            <span className="text-[10px] uppercase tracking-widest font-bold">Offline Sync</span>
            <WifiOff className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-serif text-[#1A1A1A]">Ready</p>
          <p className="text-xs text-emerald-700">All 12 Archives Cached Locally</p>
        </div>
      </div>

      {/* Module Navigation Grid */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
          <span className="w-6 h-[1px] bg-[#8B1E1E] mr-3"></span>
          Explore Portal Modules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: Cultural Guide */}
          <div 
            onClick={() => onNavigate('guide')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                Cultural Guide & AI Identifier
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Instant 4-field JSON structured analysis (Name, Location, Cultural Meaning, Visitor Tip) via text query or visual plate upload.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Launch Module</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Module 2: E-Permit & ILP */}
          <div 
            onClick={() => onNavigate('permits')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                E-Permit & Inner Line Permit (ILP)
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Apply online for restricted area permits for North Sikkim (Lachen, Lachung) and East Sikkim border zones with instant QR verification.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Apply for Permit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Module 3: Monastic Stays */}
          <div 
            onClick={() => onNavigate('stays')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <Bed className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                Monastic Stays & Homestays
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Book authentic rooms at Rumtek, Pemayangtse, and Yuksom guest houses or local eco-homestays with vegetarian meals.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Browse Stays</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Module 4: Itineraries */}
          <div 
            onClick={() => onNavigate('itinerary')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                Smart Itinerary Planner
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Customizable multi-day tour schedules for Sikkim's heritage circuits, complete with day-by-day monastery itineraries.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Plan Itinerary</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Module 5: Marketplace */}
          <div 
            onClick={() => onNavigate('marketplace')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                Souvenir & Local Craft Marketplace
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Purchase authentic hand-painted Thangkas, singing bowls, Choktse tables, and Lepcha handlooms directly from artisans.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Visit Marketplace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Module 6: Audio & Glossary */}
          <div 
            onClick={() => onNavigate('audio')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <Volume2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                Audio Guide & Multilingual Support
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Immersive audio tours, pronunciation guide for sacred terms, and multilingual translation in Bhutia, Lepcha, and Nepali.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Listen & Translate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Module 7: Crowd Monitor */}
          <div 
            onClick={() => onNavigate('crowd')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                Crowd & Visitor Capacity Monitor
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Real-time congestion levels, pilgrim density, and peak hours for popular monasteries with recommended visiting schedules.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Check Crowd Status</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Module 8: Offline Mode */}
          <div 
            onClick={() => onNavigate('offline')}
            className="bg-white p-6 border border-[#E8E4D8] hover:border-[#8B1E1E] transition cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#F5F2EA] border border-[#E8E4D8] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition">
                <WifiOff className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#8B1E1E] transition">
                Offline Mode & Data Back-Up
              </h4>
              <p className="text-xs text-[#4A443D] leading-relaxed font-serif">
                Downloadable offline packs for remote mountain areas where connectivity is limited, with local JSON data export.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Manage Offline Packs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
