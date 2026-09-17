import React, { useState } from 'react';
import { MonasticStay, Booking } from '../../types';
import { MOCK_STAYS } from '../../data/mockData';
import { Bed, MapPin, Star, CheckCircle, Calendar, Users, ShieldCheck, X } from 'lucide-react';

interface StaysPageProps {
  bookings: Booking[];
  onAddBooking: (booking: Booking) => void;
}

export const StaysPage: React.FC<StaysPageProps> = ({ bookings, onAddBooking }) => {
  const [selectedStay, setSelectedStay] = useState<MonasticStay | null>(null);
  const [guestName, setGuestName] = useState('');
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [successMsg, setSuccessMsg] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStay || !guestName) return;

    const diffTime = Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalAmount = diffDays * selectedStay.pricePerNight * Math.ceil(guests / 2);

    const newBooking: Booking = {
      id: `SK-BOOK-${Math.floor(1000 + Math.random() * 9000)}`,
      stayId: selectedStay.id,
      stayName: selectedStay.name,
      guestName,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      status: 'Confirmed',
      bookingDate: new Date().toLocaleDateString()
    };

    onAddBooking(newBooking);
    setSuccessMsg(`Booking confirmed for ${selectedStay.name}! Ref: ${newBooking.id}`);
    setSelectedStay(null);
    setGuestName('');
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 03</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            Direct Monastic Stays & Eco-Homestays
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Book peaceful guest rooms inside Rumtek, Pemayangtse, and Yuksom sanctuaries with organic vegetarian meals.
          </p>
        </div>
        <div className="bg-white px-4 py-2 border border-[#E8E4D8] text-right">
          <div className="text-[10px] uppercase tracking-wider font-bold text-[#8B1E1E]">Direct Sanctuary Access</div>
          <div className="text-[9px] text-[#8B7E66]">Verified Monastic Hosts</div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 flex items-center space-x-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold">{successMsg}</p>
        </div>
      )}

      {/* Active User Bookings */}
      {bookings.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
            <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
            Your Confirmed Monastic Reservations ({bookings.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-5 border border-[#E8E4D8] space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-[#8B1E1E] text-white px-2 py-0.5">{booking.status}</span>
                  <span className="font-mono text-xs text-[#8B7E66]">{booking.id}</span>
                </div>
                <h4 className="font-serif font-bold text-[#1A1A1A]">{booking.stayName}</h4>
                <div className="grid grid-cols-2 text-xs text-[#4A443D] font-serif">
                  <div>Check-in: <strong>{booking.checkIn}</strong></div>
                  <div>Check-out: <strong>{booking.checkOut}</strong></div>
                </div>
                <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between text-xs">
                  <span className="text-[#8B7E66]">Guest: {booking.guestName} ({booking.guests} guests)</span>
                  <strong className="text-[#8B1E1E] font-mono">₹{booking.totalAmount.toLocaleString()}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stays Grid */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
          <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
          Available Sanctuaries & Homestays
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_STAYS.map((stay) => (
            <div key={stay.id} className="bg-white border border-[#E8E4D8] overflow-hidden flex flex-col justify-between shadow-xs">
              <div>
                <div className="relative h-48 overflow-hidden bg-[#F5F2EA]">
                  <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest border border-[#E8E4D8]">
                    {stay.type}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-white px-2.5 py-1 text-xs font-bold text-[#1A1A1A] flex items-center space-x-1 border border-[#E8E4D8]">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{stay.rating}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center text-xs text-[#8B7E66]">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#8B1E1E]" />
                    <span>{stay.location}</span>
                  </div>

                  <h4 className="font-serif text-xl text-[#1A1A1A]">{stay.name}</h4>
                  <p className="text-xs text-[#4A443D] leading-relaxed font-serif italic">{stay.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {stay.amenities.map((amenity, i) => (
                      <span key={i} className="text-[10px] bg-[#F9F7F2] text-[#4A443D] px-2 py-0.5 border border-[#E8E4D8]">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E5E1D8] mt-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#8B7E66] block">Per Night</span>
                  <span className="font-mono text-lg font-bold text-[#8B1E1E]">₹{stay.pricePerNight.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setSelectedStay(stay)}
                  className="px-5 py-2.5 bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs uppercase tracking-[0.2em] font-bold transition shadow-sm"
                >
                  Book Stay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedStay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFCF7] border border-[#E8E4D8] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#8B1E1E] font-bold">Monastic Reservation</span>
                <h3 className="font-serif text-xl text-[#1A1A1A]">{selectedStay.name}</h3>
              </div>
              <button onClick={() => setSelectedStay(null)} className="p-1.5 text-[#8B7E66] hover:text-[#1A1A1A] border border-[#E8E4D8]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Primary Guest Name</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Karma Bhutia"
                  className="w-full bg-white border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Check-In Date</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-white border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Check-Out Date</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B7E66]">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-white border border-[#E8E4D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8B1E1E]"
                />
              </div>

              <div className="bg-[#F5F2EA] p-4 border border-[#E8E4D8] text-xs space-y-1">
                <div className="flex justify-between font-serif">
                  <span>Rate per night:</span>
                  <span>₹{selectedStay.pricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-serif">
                  <span>House Rule:</span>
                  <span className="italic text-[#8B7E66]">Vegetarian dining & quiet hours enforced</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedStay(null)}
                  className="px-4 py-2.5 bg-[#F5F2EA] hover:bg-[#E8E4D8] text-[#2D2A26] text-xs uppercase tracking-wider font-bold border border-[#E8E4D8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs uppercase tracking-[0.2em] font-bold shadow-sm"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
