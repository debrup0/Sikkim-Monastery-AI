import React from 'react';
import { HistoryItem } from '../types';
import { History, MapPin, Trash2 } from 'lucide-react';

interface HistoryDrawerProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelect,
  onClear,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-[#FDFCF7] border border-[#E8E4D8] p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2.5">
        <div className="flex items-center space-x-2 text-[#2D2A26]">
          <History className="w-3.5 h-3.5 text-[#8B1E1E]" />
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1E1E]">
            Recent Archive Dossiers ({history.length})
          </h4>
        </div>
        <button
          onClick={onClear}
          className="text-[10px] uppercase tracking-wider font-bold text-[#8B7E66] hover:text-[#8B1E1E] flex items-center space-x-1 transition"
          title="Clear history"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      <div className="flex space-x-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="shrink-0 bg-[#F5F2EA] hover:bg-[#E8E4D8] border border-[#E8E4D8] hover:border-[#8B1E1E] p-3 text-left transition max-w-[220px] space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-[#8B7E66]">
              <span className="truncate text-[#8B1E1E] font-bold">
                {item.inputSource === 'image' ? 'Visual Plate' : 'Title Search'}
              </span>
              <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-[#8B1E1E] truncate">
              {item.result.name}
            </p>
            <p className="text-[10px] text-[#8B7E66] truncate flex items-center">
              <MapPin className="w-2.5 h-2.5 mr-0.5 text-[#8B7E66]" />
              {item.result.location}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

