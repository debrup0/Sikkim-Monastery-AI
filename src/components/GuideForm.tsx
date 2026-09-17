import React, { useState, useRef } from 'react';
import { Search, Upload, Image as ImageIcon, Sparkles, X, RefreshCw } from 'lucide-react';

interface GuideFormProps {
  onAnalyze: (payload: { name?: string; image?: { data: string; mimeType: string }; additionalContext?: string }) => void;
  isLoading: boolean;
}

export const GuideForm: React.FC<GuideFormProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [nameInput, setNameInput] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPEG, WebP).');
      return;
    }
    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageDataUrl(e.target.result as string);
        setActiveTab('image');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'text') {
      if (!nameInput.trim()) return;
      onAnalyze({
        name: nameInput.trim(),
        additionalContext: additionalContext.trim() || undefined,
      });
    } else {
      if (!imageDataUrl) return;
      onAnalyze({
        name: nameInput.trim() || undefined,
        image: {
          data: imageDataUrl,
          mimeType: imageMimeType,
        },
        additionalContext: additionalContext.trim() || undefined,
      });
    }
  };

  const sampleQueries = [
    'Rumtek Monastery',
    'Pemayangtse Monastery',
    'Tashiding Monastery',
    'The Vajra Mukut (Black Hat)',
    'Samdruptse Guru Rinpoche Statue',
    'Dubdi Monastery',
    'Sangtok Palri 7-Tiered Carving',
  ];

  return (
    <div className="bg-[#FDFCF7] border border-[#E8E4D8] p-6 shadow-sm space-y-5">
      {/* Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E1D8] pb-4 gap-3">
        <div className="flex space-x-2">
          <button
            id="tab-text-mode"
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition ${
              activeTab === 'text'
                ? 'bg-[#8B1E1E] text-white shadow-sm'
                : 'bg-[#F5F2EA] text-[#8B7E66] hover:text-[#1A1A1A] hover:bg-[#E8E4D8] border border-[#E8E4D8]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search by Title</span>
          </button>
          <button
            id="tab-image-mode"
            type="button"
            onClick={() => setActiveTab('image')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition ${
              activeTab === 'image'
                ? 'bg-[#8B1E1E] text-white shadow-sm'
                : 'bg-[#F5F2EA] text-[#8B7E66] hover:text-[#1A1A1A] hover:bg-[#E8E4D8] border border-[#E8E4D8]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Identify by Image</span>
            {imageDataUrl && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            )}
          </button>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7E66] font-bold hidden sm:block">
          Schema: 4 Keys
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {activeTab === 'text' ? (
          <div className="space-y-2">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
              <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
              Monastery / Artifact Name
            </h2>
            <div className="relative">
              <input
                id="monastery-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Rumtek Monastery, Pemayangtse, Tashiding, Vajra Mukut..."
                className="w-full bg-white border border-[#E8E4D8] px-4 py-3 text-[#1A1A1A] placeholder-[#8B7E66]/60 focus:outline-none focus:border-[#8B1E1E] text-sm"
              />
              {nameInput && (
                <button
                  type="button"
                  onClick={() => setNameInput('')}
                  className="absolute right-3 top-3 text-[#8B7E66] hover:text-[#1A1A1A]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#8B7E66]">
              <span className="text-[9px] uppercase tracking-widest font-bold mr-1">Index:</span>
              {sampleQueries.map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => setNameInput(query)}
                  className="px-2.5 py-1 text-[11px] bg-[#F5F2EA] hover:bg-[#E8E4D8] border border-[#E8E4D8] hover:border-[#8B1E1E] text-[#4A443D] transition"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
              <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
              Visual Plate Upload
            </h2>

            {!imageDataUrl ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed p-8 text-center cursor-pointer transition relative bg-[#F5F2EA] ${
                  dragActive
                    ? 'border-[#8B1E1E] bg-[#F9F7F2]'
                    : 'border-[#8B7E66] hover:border-[#1A1A1A] hover:bg-[#F9F7F2]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <div className="w-10 h-10 border border-[#8B7E66] p-1 bg-white mx-auto mb-3 flex items-center justify-center text-[#8B1E1E]">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                  Select or Drag Reference Photo
                </p>
                <p className="text-[10px] text-[#8B7E66] mt-1 tracking-tight">
                  Archival Gompa, Murals, Statuary, Thangkas, Relics (JPG/PNG)
                </p>
              </div>
            ) : (
              <div className="relative border border-[#E8E4D8] bg-[#F5F2EA] p-2 flex items-center justify-center max-h-64 overflow-hidden">
                <img
                  src={imageDataUrl}
                  alt="Uploaded reference plate"
                  className="max-h-60 w-auto object-contain border border-[#E8E4D8]"
                />
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 text-[9px] uppercase font-bold tracking-widest border border-[#E8E4D8]">
                  Plate Loaded
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImageDataUrl(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-4 right-4 p-1 bg-white text-[#1A1A1A] hover:bg-[#8B1E1E] hover:text-white border border-[#E8E4D8] shadow-sm transition"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Optional name prompt with image */}
            <div className="mt-3">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Optional annotation or location context (e.g. 'Near Yuksom coronation throne')"
                className="w-full bg-white border border-[#E8E4D8] px-3.5 py-2.5 text-[#1A1A1A] placeholder-[#8B7E66]/60 text-xs focus:outline-none focus:border-[#8B1E1E]"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-3 border-t border-[#E5E1D8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B7E66]">
            Target: <span className="text-[#8B1E1E] font-bold">name, location, cultural_meaning, visitor_tip</span>
          </p>

          <button
            id="submit-analyze-btn"
            type="submit"
            disabled={isLoading || (activeTab === 'text' ? !nameInput.trim() : !imageDataUrl)}
            className={`w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center space-x-2 transition ${
              isLoading || (activeTab === 'text' ? !nameInput.trim() : !imageDataUrl)
                ? 'bg-[#E8E4D8] text-[#8B7E66] cursor-not-allowed'
                : 'bg-[#8B1E1E] hover:bg-[#721818] text-white shadow-sm'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Consulting Monastic Archive...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate JSON Guide</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

