import React, { useState } from 'react';
import { MarketplaceProduct, CartItem } from '../../types';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { ShoppingBag, CheckCircle, Plus, Minus, Trash2, X, Sparkles, MapPin } from 'lucide-react';

interface MarketplacePageProps {
  cart: MarketplaceProduct[];
  onAddToCart: (product: MarketplaceProduct) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setSuccessMsg(`Order successfully placed! Artisans in Sikkim will dispatch your authentic handcrafted items.`);
    onClearCart();
    setIsCartOpen(false);
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 05</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            Souvenir & Local Craft Marketplace
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Authentic hand-painted Thangkas, singing bowls, Choktse tables, and Lepcha woolens crafted by verified Sikkimese artisans.
          </p>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="px-6 py-3 bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center space-x-2 transition shadow-sm shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart ({cart.length}) - ₹{totalPrice.toLocaleString()}</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 flex items-center space-x-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold">{successMsg}</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map((prod) => (
          <div key={prod.id} className="bg-white border border-[#E8E4D8] overflow-hidden flex flex-col justify-between shadow-xs">
            <div>
              <div className="relative h-52 bg-[#F5F2EA] overflow-hidden">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest border border-[#E8E4D8]">
                  {prod.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center text-xs text-[#8B7E66]">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#8B1E1E]" />
                  <span>{prod.location}</span>
                </div>

                <h3 className="font-serif text-lg text-[#1A1A1A]">{prod.name}</h3>
                <p className="text-xs text-[#4A443D] leading-relaxed font-serif italic">{prod.description}</p>
                
                <div className="pt-2 text-xs font-serif text-[#8B7E66]">
                  Artisan: <strong className="text-[#1A1A1A]">{prod.artisan}</strong>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E5E1D8] mt-4">
              <span className="font-mono text-xl font-bold text-[#8B1E1E]">₹{prod.price.toLocaleString()}</span>
              <button
                onClick={() => onAddToCart(prod)}
                className="px-4 py-2.5 bg-[#F5F2EA] hover:bg-[#E8E4D8] text-[#2D2A26] border border-[#E8E4D8] text-xs uppercase tracking-wider font-bold transition flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#8B1E1E]" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Slide-Over / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FDFCF7] border-l border-[#E8E4D8] w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 sm:p-8">
            <div className="space-y-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#8B1E1E]" />
                  <h3 className="font-serif text-xl text-[#1A1A1A]">Your Craft Cart ({cart.length})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-[#8B7E66] hover:text-[#1A1A1A] border border-[#E8E4D8]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-20 text-center text-[#8B7E66] space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto text-[#8B7E66]" />
                  <p className="text-xs uppercase tracking-wider font-bold">Your cart is currently empty.</p>
                  <p className="text-xs font-serif italic">Select authentic handicrafts from Sikkim artisans above.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="bg-white p-4 border border-[#E8E4D8] flex items-center justify-between gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border border-[#E8E4D8]" />
                      <div className="flex-1">
                        <h4 className="font-serif text-xs font-bold text-[#1A1A1A] line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] text-[#8B7E66] font-mono">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1.5 text-[#8B7E66] hover:text-[#8B1E1E]"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#E5E1D8] space-y-4">
                <div className="flex justify-between items-center text-sm font-serif">
                  <span>Total Amount:</span>
                  <span className="font-mono font-bold text-lg text-[#8B1E1E]">₹{totalPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs uppercase tracking-[0.2em] font-bold shadow-sm"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
