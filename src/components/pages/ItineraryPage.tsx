import React, { useState } from 'react';
import { TourItinerary } from '../../types';
import { MOCK_ITINERARIES } from '../../data/mockData';
import { Calendar, Compass, MapPin, CheckCircle, Download, Clock, Sparkles } from 'lucide-react';

export const ItineraryPage: React.FC = () => {
  const [selectedItinerary, setSelectedItinerary] = useState<TourItinerary>(MOCK_ITINERARIES[0]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleExport = (itinerary: TourItinerary) => {
    setSuccessMsg(`Successfully generated and exported itinerary "${itinerary.title}" as PDF/JSON!`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 04</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            Smart Itinerary & Pilgrimage Tour Planner
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Curated multi-day monastery exploration schedules optimized for altitude acclimation, festival dates, and travel circuits.
          </p>
        </div>
        <div className="bg-white px-4 py-2 border border-[#E8E4D8] text-right">
          <div className="text-[10px] uppercase tracking-wider font-bold text-[#8B1E1E]">Optimized Circuits</div>
          <div className="text-[9px] text-[#8B7E66]">Day-by-Day Scheduling</div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 flex items-center space-x-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold">{successMsg}</p>
        </div>
      )}

      {/* Itinerary Selector Tabs */}
      <div className="flex flex-wrap gap-3">
        {MOCK_ITINERARIES.map((itin) => {
          const isSelected = selectedItinerary.id === itin.id;
          return (
            <button
              key={itin.id}
              onClick={() => setSelectedItinerary(itin)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.15em] font-bold transition border ${
                isSelected
                  ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-sm'
                  : 'bg-white text-[#8B7E66] hover:text-[#1A1A1A] hover:bg-[#F5F2EA] border-[#E8E4D8]'
              }`}
            >
              {itin.title} ({itin.durationDays} Days)
            </button>
          );
        })}
      </div>

      {/* Selected Itinerary Detailed View */}
      <div className="bg-white border border-[#E8E4D8] p-6 sm:p-8 space-y-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E5E1D8] pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-3 text-xs text-[#8B7E66] mb-2 font-serif">
              <span>District: <strong className="text-[#1A1A1A]">{selectedItinerary.district}</strong></span>
              <span>•</span>
              <span>Difficulty: <strong className="text-[#1A1A1A]">{selectedItinerary.difficulty}</strong></span>
            </div>
            <h3 className="text-3xl font-serif text-[#1A1A1A]">{selectedItinerary.title}</h3>
            <p className="text-xs sm:text-sm text-[#4A443D] mt-2 font-serif italic max-w-2xl">
              {selectedItinerary.description}
            </p>
          </div>

          <button
            onClick={() => handleExport(selectedItinerary)}
            className="px-5 py-3 bg-[#F5F2EA] hover:bg-[#E8E4D8] text-[#2D2A26] border border-[#E8E4D8] text-xs uppercase tracking-[0.2em] font-bold flex items-center space-x-2 transition shrink-0"
          >
            <Download className="w-4 h-4 text-[#8B1E1E]" />
            <span>Export Itinerary Plan</span>
          </button>
        </div>

        {/* Highlights */}
        <div className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#8B1E1E] font-bold">Key Circuit Highlights</h4>
          <div className="flex flex-wrap gap-2">
            {selectedItinerary.highlights.map((h, i) => (
              <span key={i} className="px-3 py-1 bg-[#F5F2EA] border border-[#E8E4D8] text-xs text-[#1A1A1A] font-serif">
                ✓ {h}
              </span>
            ))}
          </div>
        </div>

        {/* Day-by-Day Timeline */}
        <div className="space-y-6 pt-4 border-t border-[#E5E1D8]">
          <h4 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
            <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
            Day-by-Day Monastic Schedule
          </h4>

          <div className="space-y-6">
            {selectedItinerary.days.map((day) => (
              <div key={day.dayNumber} className="bg-[#F9F7F2] p-6 border border-[#E8E4D8] border-l-4 border-l-[#8B1E1E] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 bg-[#8B1E1E] text-white font-mono font-bold text-sm flex items-center justify-center">
                      0{day.dayNumber}
                    </span>
                    <h5 className="font-serif font-bold text-lg text-[#1A1A1A]">{day.title}</h5>
                  </div>
                  <span className="text-xs font-serif text-[#8B7E66] italic">Overnight: {day.overnightLocation}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif">
                  <div className="bg-white p-4 border border-[#E8E4D8] space-y-1">
                    <strong className="text-[#8B1E1E] uppercase text-[9px] font-sans tracking-wider block">Morning Session</strong>
                    <p className="text-[#4A443D] leading-relaxed">{day.morningActivity}</p>
                  </div>
                  <div className="bg-white p-4 border border-[#E8E4D8] space-y-1">
                    <strong className="text-[#8B1E1E] uppercase text-[9px] font-sans tracking-wider block">Afternoon Session</strong>
                    <p className="text-[#4A443D] leading-relaxed">{day.afternoonActivity}</p>
                  </div>
                  <div className="bg-white p-4 border border-[#E8E4D8] space-y-1">
                    <strong className="text-[#8B1E1E] uppercase text-[9px] font-sans tracking-wider block">Evening Session</strong>
                    <p className="text-[#4A443D] leading-relaxed">{day.eveningActivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
