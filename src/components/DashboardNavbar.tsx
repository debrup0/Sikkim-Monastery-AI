import React from 'react';
import { PageTab } from '../types';
import { 
  LayoutDashboard, 
  Compass, 
  FileText, 
  Bed, 
  Calendar, 
  ShoppingBag, 
  Volume2, 
  Users, 
  WifiOff,
  BookOpen
} from 'lucide-react';

interface DashboardNavbarProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  onOpenEtiquette: () => void;
  cartCount: number;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenEtiquette,
  cartCount,
}) => {
  const navItems: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'guide', label: 'Cultural Guide', icon: <Compass className="w-4 h-4" /> },
    { id: 'permits', label: 'E-Permit & ILP', icon: <FileText className="w-4 h-4" /> },
    { id: 'stays', label: 'Monastic Stays', icon: <Bed className="w-4 h-4" /> },
    { id: 'itinerary', label: 'Itineraries', icon: <Calendar className="w-4 h-4" /> },
    { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'audio', label: 'Audio & Glossary', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'crowd', label: 'Crowd Monitor', icon: <Users className="w-4 h-4" /> },
    { id: 'offline', label: 'Offline Mode', icon: <WifiOff className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF7] border-b border-[#E5E1D8] shadow-xs">
      {/* Top minimal crimson accent line */}
      <div className="h-[2px] w-full bg-[#8B1E1E]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 border border-[#8B7E66] p-1 bg-[#F5F2EA] flex items-center justify-center">
              <div className="w-full h-full border border-[#8B7E66] flex items-center justify-center bg-white text-[#8B1E1E]">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#8B7E66] font-bold leading-none mb-1">
                Sikkim Digital Monastic Hub
              </p>
              <h1 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] leading-tight">
                Vajrayana Heritage & Pilgrimage Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="open-etiquette-btn"
              onClick={onOpenEtiquette}
              className="flex items-center space-x-2 px-3.5 py-2 text-xs uppercase tracking-wider font-bold bg-[#F5F2EA] hover:bg-[#E8E4D8] text-[#2D2A26] border border-[#E8E4D8] transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span className="hidden sm:inline">Monastery Protocol</span>
            </button>
          </div>
        </div>

        {/* Multi-Page Navigation Tab Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-[#E5E1D8]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-bold whitespace-nowrap transition border ${
                  isActive
                    ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-sm'
                    : 'bg-[#F9F7F2] text-[#8B7E66] hover:text-[#1A1A1A] hover:bg-[#F5F2EA] border-[#E8E4D8]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === 'marketplace' && cartCount > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-white text-[#8B1E1E] text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
