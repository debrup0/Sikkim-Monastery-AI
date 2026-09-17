import React from 'react';
import { MOCK_CROWD_SITES } from '../../data/mockData';
import { Users, AlertTriangle, CheckCircle, Clock, MapPin, ShieldAlert } from 'lucide-react';

export const CrowdMonitorPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 07</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            Crowd & Visitor Capacity Monitoring
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Real-time congestion levels, pilgrim density, and peak hours for popular monasteries to ensure a serene spiritual experience.
          </p>
        </div>
        <div className="bg-white px-4 py-2 border border-[#E8E4D8] text-right">
          <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-700">Live Telemetry Active</div>
          <div className="text-[9px] text-[#8B7E66]">Updated Every 15 Mins</div>
        </div>
      </div>

      {/* Grid of Monasteries Crowd Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CROWD_SITES.map((site) => {
          const percentage = Math.round((site.currentVisitors / site.maxCapacity) * 100);
          let statusColor = 'bg-emerald-600 text-white';
          let borderLeftColor = 'border-l-emerald-600';
          if (site.status === 'Moderate') {
            statusColor = 'bg-amber-500 text-white';
            borderLeftColor = 'border-l-amber-500';
          } else if (site.status === 'Peak Congestion') {
            statusColor = 'bg-[#8B1E1E] text-white';
            borderLeftColor = 'border-l-[#8B1E1E]';
          }

          return (
            <div key={site.id} className={`bg-white border border-[#E8E4D8] border-l-4 ${borderLeftColor} p-6 space-y-4 shadow-xs flex flex-col justify-between`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold ${statusColor}`}>
                    {site.status}
                  </span>
                  <span className="text-xs font-mono text-[#8B7E66]">{percentage}% Capacity</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-xs text-[#8B7E66]">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#8B1E1E]" />
                    <span>{site.district}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#1A1A1A]">{site.name}</h3>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-serif text-[#4A443D]">
                    <span>Current Visitors: {site.currentVisitors}</span>
                    <span>Max: {site.maxCapacity}</span>
                  </div>
                  <div className="w-full h-2 bg-[#F5F2EA] border border-[#E8E4D8] overflow-hidden">
                    <div
                      className={`h-full ${percentage > 80 ? 'bg-[#8B1E1E]' : percentage > 50 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E1D8] space-y-2 text-xs font-serif">
                <div className="flex justify-between text-[#8B7E66]">
                  <span>Peak Hours:</span>
                  <strong className="text-[#1A1A1A]">{site.peakHours}</strong>
                </div>
                <div className="flex justify-between text-[#8B7E66]">
                  <span>Recommended:</span>
                  <strong className="text-emerald-700">{site.recommendedTime}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
