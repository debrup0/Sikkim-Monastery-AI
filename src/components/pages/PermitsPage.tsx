import React, { useState } from 'react';
import { PermitApplication } from '../../types';
import { FileText, ShieldCheck, CheckCircle, Plus, QrCode, Download, AlertCircle, Calendar } from 'lucide-react';

interface PermitsPageProps {
  permits: PermitApplication[];
  onAddPermit: (permit: PermitApplication) => void;
}

export const PermitsPage: React.FC<PermitsPageProps> = ({ permits, onAddPermit }) => {
  const [fullName, setFullName] = useState('');
  const [passportOrId, setPassportOrId] = useState('');
  const [nationality, setNationality] = useState('Indian');
  const [destination, setDestination] = useState('North Sikkim (Lachen - Lachung - Yumthang)');
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [durationDays, setDurationDays] = useState(3);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const destinations = [
    'North Sikkim (Lachen - Lachung - Yumthang - Gurudongmar)',
    'East Sikkim (Nathula Pass - Tsomgo Lake - Baba Mandir)',
    'West Sikkim Restricted Border Areas (Dzongu - Yuksom High Trails)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !passportOrId) return;

    const newPermit: PermitApplication = {
      id: `ILP-SK-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      passportOrId,
      nationality,
      destination,
      travelDate,
      durationDays: Number(durationDays),
      vehicleNumber: vehicleNumber || 'SK-01-A-4892',
      status: 'Approved',
      issueDate: new Date().toLocaleDateString(),
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SK-ILP-${Math.floor(100000 + Math.random() * 900000)}`
    };

    onAddPermit(newPermit);
    setSuccessMsg(`Permit ${newPermit.id} successfully generated & approved for ${destination}!`);
    setFullName('');
    setPassportOrId('');
    setVehicleNumber('');
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 02</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            E-Permit & Inner Line Permit (ILP) Desk
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Official restricted area permit portal for North Sikkim, Nathula Pass, and high-altitude Buddhist pilgrimage zones.
          </p>
        </div>
        <div className="bg-white px-4 py-2 border border-[#E8E4D8] text-right">
          <div className="text-[10px] uppercase tracking-wider font-bold text-[#8B1E1E]">Govt of Sikkim Portal</div>
          <div className="text-[9px] text-[#8B7E66]">Instant Digital QR Pass</div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 flex items-center space-x-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold">{successMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Application Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 border border-[#E8E4D8] shadow-xs space-y-6">
          <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
            <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
            Apply for Protected Area Permit (PAP/ILP)
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Full Legal Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tenzin Norbu"
                className="w-full bg-[#FDFCF7] border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Passport / Aadhaar / Voter ID Number</label>
                <input
                  type="text"
                  required
                  value={passportOrId}
                  onChange={(e) => setPassportOrId(e.target.value)}
                  placeholder="e.g. AB9823412 or 4512..."
                  className="w-full bg-[#FDFCF7] border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Nationality</label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-[#FDFCF7] border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                >
                  <option value="Indian">Indian Citizen</option>
                  <option value="Foreigner">Foreign National (PAP Required)</option>
                  <option value="OCI">Overseas Citizen of India (OCI)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Restricted Destination Zone</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#FDFCF7] border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
              >
                {destinations.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Intended Travel Date</label>
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-[#FDFCF7] border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Duration (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full bg-[#FDFCF7] border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Registered Taxi / Vehicle Number (Optional)</label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. SK-01-B-1049"
                className="w-full bg-[#FDFCF7] border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs uppercase tracking-[0.2em] font-bold transition shadow-sm"
            >
              Submit & Generate Digital Permit
            </button>
          </form>
        </div>

        {/* Issued Permits List */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
            <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
            Active Digital Permits ({permits.length})
          </h3>

          {permits.length === 0 ? (
            <div className="bg-white p-8 border border-[#E8E4D8] text-center text-[#8B7E66] space-y-2">
              <FileText className="w-8 h-8 mx-auto text-[#8B7E66]" />
              <p className="text-xs font-bold uppercase tracking-wider">No active permit applications found.</p>
              <p className="text-xs font-serif italic">Fill out the form on the left to instantly generate your Inner Line Permit (ILP).</p>
            </div>
          ) : (
            <div className="space-y-4">
              {permits.map((permit) => (
                <div key={permit.id} className="bg-white p-6 border border-[#E8E4D8] space-y-4 shadow-xs">
                  <div className="flex items-start justify-between border-b border-[#E5E1D8] pb-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold bg-[#8B1E1E] text-white px-2.5 py-0.5">
                        {permit.status}
                      </span>
                      <h4 className="font-mono text-sm font-bold text-[#1A1A1A] mt-2">{permit.id}</h4>
                      <p className="text-xs font-serif text-[#8B7E66]">Holder: <strong className="text-[#1A1A1A]">{permit.fullName}</strong> ({permit.nationality})</p>
                    </div>
                    <div className="bg-[#F5F2EA] p-2 border border-[#E8E4D8] text-center">
                      <QrCode className="w-12 h-12 text-[#8B1E1E]" />
                      <span className="text-[8px] uppercase tracking-tighter text-[#8B7E66]">Verified QR</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-[#4A443D] font-serif">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#8B7E66] block font-sans">Destination</span>
                      <strong className="text-[#1A1A1A]">{permit.destination}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#8B7E66] block font-sans">Travel Date</span>
                      <strong className="text-[#1A1A1A]">{permit.travelDate} ({permit.durationDays} Days)</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
                    <span className="text-[#8B7E66] font-serif">Issued: {permit.issueDate}</span>
                    <button
                      onClick={() => alert(`Downloading official digital permit PDF for ${permit.id}...`)}
                      className="px-3 py-1.5 bg-[#F5F2EA] hover:bg-[#E8E4D8] text-[#2D2A26] border border-[#E8E4D8] font-bold text-[10px] uppercase tracking-wider flex items-center space-x-1 transition"
                    >
                      <Download className="w-3 h-3 text-[#8B1E1E]" />
                      <span>Download PDF Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
