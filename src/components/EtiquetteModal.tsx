import React from 'react';
import { X, BookOpen, AlertCircle, Check } from 'lucide-react';

interface EtiquetteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EtiquetteModal: React.FC<EtiquetteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const etiquetteRules = [
    {
      title: 'Clockwise Circumambulation (Kora)',
      desc: 'Always walk around monasteries, stupas (chortens), and mani prayer wheels in a clockwise direction (sun-wise), keeping the sacred object on your right.',
      type: 'rule',
    },
    {
      title: 'Footwear & Headwear Protocol',
      desc: 'Remove shoes, caps, and sunglasses before stepping inside the inner sanctum (dukhang / prayer hall). Clean socks are recommended.',
      type: 'rule',
    },
    {
      title: 'Photography & Sacred Murals',
      desc: 'Never take photos or videos of the main altar, statues, or ancient murals without explicit permission from the resident monk/lama. Flash damages centuries-old natural mineral pigments.',
      type: 'warning',
    },
    {
      title: 'Respectful Demeanor & Posture',
      desc: 'Maintain quiet contemplation. Do not point your feet towards altars or lamas when sitting; cross your legs or sit on your heels respectfully.',
      type: 'rule',
    },
    {
      title: 'Offering White Silk Scarves (Khata)',
      desc: 'When meeting high lamas or making an altar offering, hold a ceremonial Khata scarf with both hands folded outward as an auspicious token of purity and goodwill.',
      type: 'tip',
    },
    {
      title: 'Spinning Prayer Wheels (Mani)',
      desc: 'Spin prayer wheels gently only in a clockwise direction while reciting or mindfully contemplating "Om Mani Padme Hum".',
      type: 'tip',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFCF7] border border-[#E8E4D8] max-w-2xl w-full shadow-2xl text-[#2D2A26] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#F5F2EA] px-6 py-5 border-b border-[#E5E1D8] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-[#8B7E66] p-1 bg-white flex items-center justify-center text-[#8B1E1E]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#8B7E66] font-bold">
                Archival Protocol Reference
              </p>
              <h3 className="font-serif text-xl text-[#1A1A1A]">
                Sikkim Monastic Etiquette & Visitor Protocol
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8B7E66] hover:text-[#1A1A1A] hover:bg-[#E8E4D8] transition border border-[#E8E4D8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {etiquetteRules.map((rule, idx) => (
              <div
                key={idx}
                className="bg-[#F9F7F2] p-4 border border-[#E8E4D8] border-l-2 border-l-[#8B1E1E] space-y-1.5"
              >
                <div className="flex items-center space-x-2 text-[#8B1E1E] font-bold text-xs">
                  {rule.type === 'warning' ? (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{rule.title}</span>
                </div>
                <p className="text-xs text-[#4A443D] leading-relaxed font-serif italic pl-5">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#F5F2EA] border border-[#E8E4D8] text-xs text-[#4A443D] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-serif italic">
              Major festivals such as <strong>Losar</strong>, <strong>Bumchu</strong>, <strong>Saga Dawa</strong>, and <strong>Pang Lhabsol</strong> feature sacred Cham ritual dances.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#8B1E1E] hover:bg-[#721818] text-white text-[10px] uppercase tracking-[0.2em] font-bold shrink-0 transition"
            >
              Close Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

