import React from 'react';
import { Compass, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenEtiquette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEtiquette }) => {
  return (
    <header className="border-b border-[#E5E1D8] bg-[#FDFCF7]/95 backdrop-blur-sm sticky top-0 z-40 text-[#2D2A26]">
      {/* Top minimal crimson accent line */}
      <div className="h-[2px] w-full bg-[#8B1E1E]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 border border-[#8B7E66] p-1 bg-[#F5F2EA] flex items-center justify-center">
            <div className="w-full h-full border border-[#8B7E66] flex items-center justify-center bg-white text-[#8B1E1E]">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#8B7E66] font-bold leading-none mb-1">
              Digital Monastic Archive
            </p>
            <h1 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] leading-tight">
              Sikkim Cultural Guide
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right mr-2">
            <div className="bg-[#8B1E1E] text-white px-3 py-1 text-[9px] tracking-[0.2em] font-bold uppercase">
              SK-JSON-109
            </div>
            <p className="text-[9px] text-[#8B7E66] mt-0.5 tracking-wider uppercase">
              4-Field Protocol
            </p>
          </div>

          <button
            id="open-etiquette-btn"
            onClick={onOpenEtiquette}
            className="flex items-center space-x-2 px-3.5 py-2 text-xs uppercase tracking-wider font-bold bg-[#F5F2EA] hover:bg-[#E8E4D8] text-[#2D2A26] border border-[#E8E4D8] transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Monastery Protocol</span>
          </button>
        </div>
      </div>
    </header>
  );
};

