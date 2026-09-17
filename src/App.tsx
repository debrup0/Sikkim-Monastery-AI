import React, { useState, useEffect } from 'react';
import { DashboardNavbar } from './components/DashboardNavbar';
import { EtiquetteModal } from './components/EtiquetteModal';
import { DashboardOverview } from './components/pages/DashboardOverview';
import { CulturalGuidePage } from './components/pages/CulturalGuidePage';
import { PermitsPage } from './components/pages/PermitsPage';
import { StaysPage } from './components/pages/StaysPage';
import { ItineraryPage } from './components/pages/ItineraryPage';
import { MarketplacePage } from './components/pages/MarketplacePage';
import { AudioGuidePage } from './components/pages/AudioGuidePage';
import { CrowdMonitorPage } from './components/pages/CrowdMonitorPage';
import { OfflinePage } from './components/pages/OfflinePage';
import { 
  MonasteryGuideResult, 
  HistoryItem, 
  CuratedItem, 
  PageTab, 
  PermitApplication, 
  Booking, 
  MarketplaceProduct 
} from './types';
import { AlertCircle } from 'lucide-react';

const INITIAL_RESULT: MonasteryGuideResult = {
  name: "Rumtek Monastery (Dharma Chakra Centre)",
  location: "East Sikkim District, near Gangtok",
  cultural_meaning: "Rumtek serves as the principal seat-in-exile of His Holiness the Gyalwang Karmapa, the revered head of the Karma Kagyu lineage of Tibetan Buddhism. Rebuilt in the 1960s after the original 16th-century Tsurphu monastery, it preserves the golden stupa containing the relics of the 16th Karmapa and houses sacred Black Hat (Vajra Mukut) rituals.",
  visitor_tip: "Best visited between March and May or October and December for clear Himalayan weather; maintain silence, circumambulate prayer halls in a clockwise direction, and note that photography is strictly prohibited inside the main sanctum."
};

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('overview');
  const [currentResult, setCurrentResult] = useState<MonasteryGuideResult | null>(INITIAL_RESULT);
  const [currentThumbnail, setCurrentThumbnail] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isEtiquetteOpen, setIsEtiquetteOpen] = useState(false);

  // New feature states with localStorage persistence
  const [permits, setPermits] = useState<PermitApplication[]>([
    {
      id: 'ILP-SK-882941',
      fullName: 'Tenzin Norbu',
      passportOrId: 'SK-994821',
      nationality: 'Indian',
      destination: 'North Sikkim (Lachen - Lachung - Yumthang)',
      travelDate: '2026-09-20',
      durationDays: 4,
      vehicleNumber: 'SK-01-A-1029',
      status: 'Approved',
      issueDate: '2026-09-16',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SK-ILP-882941'
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'SK-BOOK-4091',
      stayId: 'stay-1',
      stayName: 'Rumtek Dharma Chakra Monastery Guest House',
      guestName: 'Tenzin Norbu',
      checkIn: '2026-09-20',
      checkOut: '2026-09-22',
      guests: 2,
      totalAmount: 2400,
      status: 'Confirmed',
      bookingDate: '2026-09-16'
    }
  ]);

  const [cart, setCart] = useState<MarketplaceProduct[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('sikkim_guide_history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedPermits = localStorage.getItem('sikkim_permits');
      if (savedPermits) setPermits(JSON.parse(savedPermits));

      const savedBookings = localStorage.getItem('sikkim_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  const saveHistory = (newItem: HistoryItem) => {
    const updated = [newItem, ...history.filter((h) => h.id !== newItem.id)].slice(0, 10);
    setHistory(updated);
    try {
      localStorage.setItem('sikkim_guide_history', JSON.stringify(updated));
    } catch (e) {}
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('sikkim_guide_history');
    } catch (e) {}
  };

  const handleAddPermit = (permit: PermitApplication) => {
    const updated = [permit, ...permits];
    setPermits(updated);
    try {
      localStorage.setItem('sikkim_permits', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddBooking = (booking: Booking) => {
    const updated = [booking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('sikkim_bookings', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddToCart = (product: MarketplaceProduct) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId: string) => {
    const index = cart.findIndex(p => p.id === productId);
    if (index > -1) {
      const updated = [...cart];
      updated.splice(index, 1);
      setCart(updated);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAnalyze = async (payload: {
    name?: string;
    image?: { data: string; mimeType: string };
    additionalContext?: string;
    curatedItem?: CuratedItem;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    if (payload.image?.data) {
      setCurrentThumbnail(payload.image.data);
    } else {
      setCurrentThumbnail(undefined);
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          image: payload.image,
          additionalContext: payload.additionalContext,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to analyze Sikkim monastery or artifact.');
      }

      const result: MonasteryGuideResult = json.data;
      setCurrentResult(result);

      const historyEntry: HistoryItem = {
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestamp: Date.now(),
        inputSource: payload.image ? 'image' : payload.curatedItem ? 'curated' : 'name',
        inputQuery: payload.name,
        imageThumbnail: payload.image?.data,
        result,
      };
      saveHistory(historyEntry);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred while consulting the cultural guide.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCurated = (item: CuratedItem) => {
    setActiveTab('guide');
    handleAnalyze({
      name: item.query,
      curatedItem: item,
    });
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setCurrentResult(item.result);
    setCurrentThumbnail(item.imageThumbnail);
    setActiveTab('guide');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#2D2A26] flex flex-col font-sans selection:bg-[#8B1E1E] selection:text-white">
      <DashboardNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenEtiquette={() => setIsEtiquetteOpen(true)}
        cartCount={cart.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error notification */}
        {errorMessage && (
          <div className="bg-[#F9F7F2] border-l-4 border-l-[#8B1E1E] border border-[#E8E4D8] text-[#1A1A1A] p-4 flex items-start space-x-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-[#8B1E1E] shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-bold text-xs uppercase tracking-wider text-[#8B1E1E]">Request Incomplete</p>
              <p className="text-xs text-[#4A443D] mt-0.5">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-[#8B7E66] hover:text-[#1A1A1A] text-xs px-2 py-1 uppercase tracking-wider font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Routing */}
        {activeTab === 'overview' && (
          <DashboardOverview
            onNavigate={setActiveTab}
            permits={permits}
            bookings={bookings}
            cart={cart}
          />
        )}

        {activeTab === 'guide' && (
          <CulturalGuidePage
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            currentResult={currentResult}
            currentThumbnail={currentThumbnail}
            history={history}
            onSelectHistory={handleSelectHistory}
            onSelectCurated={handleSelectCurated}
            onClearHistory={clearHistory}
          />
        )}

        {activeTab === 'permits' && (
          <PermitsPage
            permits={permits}
            onAddPermit={handleAddPermit}
          />
        )}

        {activeTab === 'stays' && (
          <StaysPage
            bookings={bookings}
            onAddBooking={handleAddBooking}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryPage />
        )}

        {activeTab === 'marketplace' && (
          <MarketplacePage
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        )}

        {activeTab === 'audio' && (
          <AudioGuidePage />
        )}

        {activeTab === 'crowd' && (
          <CrowdMonitorPage />
        )}

        {activeTab === 'offline' && (
          <OfflinePage />
        )}
      </main>

      <EtiquetteModal
        isOpen={isEtiquetteOpen}
        onClose={() => setIsEtiquetteOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[#E5E1D8] bg-[#FDFCF7] py-6 text-center text-[10px] uppercase tracking-[0.2em] text-[#8B7E66]">
        <p className="max-w-2xl mx-auto px-4">
          Sikkim Digital Monastic Hub • E-Permit, Monastic Stays, Smart Itinerary, Craft Marketplace & Offline Support
        </p>
      </footer>
    </div>
  );
}
