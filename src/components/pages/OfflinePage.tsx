import React, { useState } from 'react';
import { WifiOff, Download, CheckCircle, Database, ShieldCheck, RefreshCw } from 'lucide-react';

export const OfflinePage: React.FC = () => {
  const [downloadedPacks, setDownloadedPacks] = useState<string[]>(['East Sikkim Archive Pack', 'West Sikkim Monasteries Pack']);
  const [successMsg, setSuccessMsg] = useState('');

  const handleDownloadPack = (packName: string) => {
    if (!downloadedPacks.includes(packName)) {
      setDownloadedPacks([...downloadedPacks, packName]);
    }
    setSuccessMsg(`Successfully downloaded "${packName}" for offline access without cellular connection!`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(downloadedPacks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "sikkim_monastery_offline_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSuccessMsg("Offline backup JSON file generated and exported successfully!");
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const availablePacks = [
    { name: 'East Sikkim Archive Pack', size: '14.2 MB', desc: 'Rumtek, Enchey, Lingdum monographs, permits data & offline map caches.' },
    { name: 'West Sikkim Monasteries Pack', size: '18.6 MB', desc: 'Pemayangtse, Tashiding, Dubdi history, prayer transcripts & audio guides.' },
    { name: 'North & South Sikkim Alpine Pack', size: '22.4 MB', desc: 'Lachen, Lachung, Phodong Gompas, Samdruptse shrine and high-altitude ILP guides.' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 08</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            Offline Mode & Data Back-Up Center
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Downloadable offline packs for remote Himalayan valleys where cellular coverage is limited. Fully synchronized local cache.
          </p>
        </div>

        <button
          onClick={handleExportJSON}
          className="px-6 py-3 bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center space-x-2 transition shadow-sm shrink-0"
        >
          <Database className="w-4 h-4" />
          <span>Export All Data (JSON)</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 flex items-center space-x-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold">{successMsg}</p>
        </div>
      )}

      {/* Offline Packs Grid */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
          <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
          Downloadable Regional Offline Packs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePacks.map((pack) => {
            const isDownloaded = downloadedPacks.includes(pack.name);
            return (
              <div key={pack.name} className="bg-white border border-[#E8E4D8] p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8B7E66]">
                    <span>{pack.size}</span>
                    {isDownloaded ? (
                      <span className="text-emerald-700 font-bold flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Downloaded
                      </span>
                    ) : (
                      <span>Not Downloaded</span>
                    )}
                  </div>
                  <h4 className="font-serif text-lg text-[#1A1A1A]">{pack.name}</h4>
                  <p className="text-xs text-[#4A443D] leading-relaxed font-serif italic">{pack.desc}</p>
                </div>

                <div className="pt-4 border-t border-[#E5E1D8]">
                  <button
                    onClick={() => handleDownloadPack(pack.name)}
                    className={`w-full py-2.5 text-xs uppercase tracking-wider font-bold transition flex items-center justify-center space-x-2 border ${
                      isDownloaded
                        ? 'bg-[#F5F2EA] text-[#2D2A26] border-[#E8E4D8] hover:bg-[#E8E4D8]'
                        : 'bg-[#8B1E1E] text-white border-[#8B1E1E] hover:bg-[#721818]'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloaded ? 'Update Offline Pack' : 'Download for Offline'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
