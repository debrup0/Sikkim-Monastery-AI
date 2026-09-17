import React, { useState } from 'react';
import { MonasteryGuideResult } from '../types';
import {
  Copy,
  Check,
  Download,
  Code,
  Eye,
  Volume2,
  VolumeX,
  Compass,
} from 'lucide-react';

interface ResultCardProps {
  data: MonasteryGuideResult;
  imageThumbnail?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, imageThumbnail }) => {
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const formattedJson = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${(data.name || 'sikkim-monastery')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')}_guide.json`;
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narration = `${data.name}, located in ${data.location}. Cultural Significance: ${data.cultural_meaning} Visitor Protocol: ${data.visitor_tip}`;
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div
      id="guide-result-card"
      className="bg-[#FDFCF7] border border-[#E8E4D8] shadow-sm flex flex-col justify-between"
    >
      {/* Top Header Bar */}
      <div className="bg-[#F5F2EA] px-6 py-4 border-b border-[#E5E1D8] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#8B1E1E]"></span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7E66] font-bold">
            Curatorial Identification Dossier
          </p>
        </div>

        {/* View Switcher and Action Buttons */}
        <div className="flex items-center space-x-2">
          <div className="bg-white p-0.5 border border-[#E8E4D8] flex items-center">
            <button
              id="view-visual-mode"
              onClick={() => setViewMode('visual')}
              className={`flex items-center space-x-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-bold transition ${
                viewMode === 'visual'
                  ? 'bg-[#8B1E1E] text-white'
                  : 'text-[#8B7E66] hover:text-[#1A1A1A]'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Guide View</span>
            </button>
            <button
              id="view-json-mode"
              onClick={() => setViewMode('json')}
              className={`flex items-center space-x-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-bold transition ${
                viewMode === 'json'
                  ? 'bg-[#8B1E1E] text-white'
                  : 'text-[#8B7E66] hover:text-[#1A1A1A]'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>JSON Raw</span>
            </button>
          </div>

          <button
            id="speak-narration-btn"
            onClick={handleSpeak}
            title={isSpeaking ? 'Stop narration' : 'Listen to cultural guide'}
            className={`p-1.5 border border-[#E8E4D8] transition ${
              isSpeaking
                ? 'bg-[#8B1E1E] text-white animate-pulse'
                : 'bg-white text-[#4A443D] hover:bg-[#F5F2EA]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            id="copy-json-btn"
            onClick={handleCopy}
            title="Copy structured JSON"
            className="flex items-center space-x-1 px-3 py-1.5 bg-white text-[#2D2A26] border border-[#E8E4D8] hover:bg-[#F5F2EA] text-[10px] uppercase tracking-wider font-bold transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8B7E66]" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            id="download-json-btn"
            onClick={handleDownload}
            title="Download JSON file"
            className="p-1.5 bg-white text-[#2D2A26] border border-[#E8E4D8] hover:bg-[#F5F2EA] text-[10px] transition"
          >
            <Download className="w-3.5 h-3.5 text-[#8B7E66]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'visual' ? (
        <div className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Name & Location */}
          <section>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8B1E1E] font-bold mb-3 flex items-center">
              <span className="w-6 h-[1px] bg-[#8B1E1E] mr-3"></span>
              1. Artifact / Site
            </h2>
            <div className="pl-9 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h3
                  id="result-monastery-name"
                  className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] leading-tight mb-2"
                >
                  {data.name}
                </h3>
                <p
                  id="result-monastery-location"
                  className="text-lg sm:text-xl text-[#8B7E66] font-serif italic"
                >
                  {data.location}
                </p>
              </div>

              {imageThumbnail && (
                <div className="shrink-0 border border-[#8B7E66] p-1 bg-white">
                  <img
                    src={imageThumbnail}
                    alt={data.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover border border-[#E8E4D8]"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Cultural Meaning (Historical Significance Breakdown) */}
          <section>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8B1E1E] font-bold mb-3 flex items-center">
              <span className="w-6 h-[1px] bg-[#8B1E1E] mr-3"></span>
              2. Cultural Significance
            </h2>
            <div className="pl-9">
              <p
                id="result-cultural-meaning"
                className="text-base sm:text-lg leading-relaxed text-[#4A443D] font-serif"
              >
                {data.cultural_meaning}
              </p>
            </div>
          </section>

          {/* Section 3: Visitor Protocol Box */}
          <section className="bg-[#F9F7F2] p-6 sm:p-7 border border-[#E8E4D8] border-l-4 border-l-[#8B1E1E]">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8B1E1E] font-bold mb-2">
              Visitor Protocol & Etiquette
            </h2>
            <p
              id="result-visitor-tip"
              className="text-sm sm:text-base italic font-serif text-[#4A443D] leading-relaxed"
            >
              "{data.visitor_tip}"
            </p>
          </section>
        </div>
      ) : (
        /* Formatted JSON View */
        <div className="p-6 bg-[#1A1A1A] text-[#F5F2EA] flex-1">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-[10px] uppercase tracking-widest text-[#8B7E66]">
            <span className="font-mono text-[#8B1E1E] font-bold">Standardized JSON Output</span>
            <span>MIME: application/json</span>
          </div>
          <pre
            id="raw-json-output"
            className="font-mono text-xs sm:text-sm text-[#F5F2EA] p-4 bg-black/40 border border-stone-800 overflow-x-auto leading-relaxed"
          >
            <code>{formattedJson}</code>
          </pre>
        </div>
      )}

      {/* Archival Footer Bar */}
      <div className="px-6 py-3 bg-[#F5F2EA] border-t border-[#E5E1D8] flex flex-wrap justify-between items-center text-[9px] uppercase tracking-[0.2em] text-[#8B7E66]">
        <div className="flex gap-6">
          <span>Schema Compliant: 4 Fields</span>
          <span>Sikkim Vajrayana Corpus</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Verified Record</span>
        </div>
      </div>
    </div>
  );
};

