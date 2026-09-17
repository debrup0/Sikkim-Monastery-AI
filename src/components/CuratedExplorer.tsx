import React, { useState } from 'react';
import { CURATED_ITEMS } from '../data/curatedItems';
import { CuratedItem } from '../types';
import { MapPin, ArrowUpRight, Compass } from 'lucide-react';

interface CuratedExplorerProps {
  onSelectItem: (item: CuratedItem) => void;
  isLoading: boolean;
}

export const CuratedExplorer: React.FC<CuratedExplorerProps> = ({
  onSelectItem,
  isLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Heritage' },
    { id: 'monastery', label: 'Monasteries (Gompas)' },
    { id: 'artifact', label: 'Artifacts & Murals' },
    { id: 'relic', label: 'Sacred Relics' },
    { id: 'site', label: 'Sacred Sites' },
  ];

  const filteredItems = CURATED_ITEMS.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  return (
    <div className="bg-[#FDFCF7] border border-[#E8E4D8] p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E5E1D8] pb-4 gap-4">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center mb-1">
            <span className="w-6 h-[1px] bg-[#8B1E1E] mr-3"></span>
            Curated Monastic Index
          </h2>
          <p className="text-xs text-[#8B7E66] pl-9">
            Select an archival specimen from Sikkim's historical districts
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pl-9 md:pl-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition ${
                selectedCategory === cat.id
                  ? 'bg-[#8B1E1E] text-white shadow-sm'
                  : 'bg-[#F5F2EA] text-[#8B7E66] hover:text-[#1A1A1A] hover:bg-[#E8E4D8] border border-[#E8E4D8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Curated Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            id={`curated-item-${item.id}`}
            onClick={() => onSelectItem(item)}
            disabled={isLoading}
            className="text-left bg-[#F9F7F2] hover:bg-[#F5F2EA] border border-[#E8E4D8] hover:border-[#8B1E1E] p-4 transition group flex flex-col justify-between h-full space-y-3 relative disabled:opacity-50"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B1E1E] bg-white px-2 py-0.5 border border-[#E8E4D8]">
                  {item.category}
                </span>
                <span className="text-[10px] text-[#8B7E66] flex items-center">
                  <MapPin className="w-3 h-3 mr-0.5 text-[#8B7E66]" />
                  {item.district}
                </span>
              </div>

              <h3 className="font-serif text-base text-[#1A1A1A] group-hover:text-[#8B1E1E] transition leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-[#4A443D] line-clamp-2 leading-relaxed font-serif italic">
                {item.description}
              </p>
            </div>

            <div className="pt-2.5 border-t border-[#E8E4D8] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] group-hover:text-[#8B1E1E]">
              <span>Extract JSON Guide</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

