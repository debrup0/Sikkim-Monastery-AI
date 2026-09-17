import React, { useState } from 'react';
import { MOCK_AUDIO_TRACKS, MOCK_GLOSSARY } from '../../data/mockData';
import { Volume2, VolumeX, Globe, BookOpen, Play, Pause, Sparkles } from 'lucide-react';

export const AudioGuidePage: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<'English' | 'Hindi' | 'Bhutia' | 'Lepcha' | 'Nepali'>('English');

  const languages = ['English', 'Hindi', 'Bhutia', 'Lepcha', 'Nepali'] as const;

  const handlePlayTrack = (id: string) => {
    if (activeTrackId === id) {
      setActiveTrackId(null);
    } else {
      setActiveTrackId(id);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 06</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            Audio Guide & Multilingual Pronunciation
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Immersive audio stories narrated by monastery scholars and regional pronunciation glossary for sacred Himalayan terms.
          </p>
        </div>

        {/* Multilingual Selector */}
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-[#8B1E1E]" />
          <div className="flex bg-white border border-[#E8E4D8] p-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition ${
                  selectedLang === lang
                    ? 'bg-[#8B1E1E] text-white'
                    : 'text-[#8B7E66] hover:text-[#1A1A1A]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audio Tracks Grid */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
          <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
          Immersive Audio Guide Tracks ({selectedLang})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_AUDIO_TRACKS.map((track) => {
            const isPlaying = activeTrackId === track.id;
            return (
              <div key={track.id} className="bg-white border border-[#E8E4D8] p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8B7E66]">
                    <span>{track.monastery}</span>
                    <span className="font-mono">{track.duration}</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#1A1A1A]">{track.title}</h4>
                  <p className="text-xs text-[#4A443D] leading-relaxed font-serif italic">{track.description}</p>
                </div>

                <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                  <span className="text-xs text-[#8B7E66]">Narrator: {track.narrator}</span>
                  <button
                    onClick={() => handlePlayTrack(track.id)}
                    className={`p-2.5 border transition ${
                      isPlaying
                        ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] animate-pulse'
                        : 'bg-[#F5F2EA] text-[#2D2A26] border-[#E8E4D8] hover:bg-[#E8E4D8]'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sacred Terminology Glossary */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs uppercase tracking-[0.3em] text-[#8B1E1E] font-bold flex items-center">
          <span className="w-5 h-[1px] bg-[#8B1E1E] mr-2.5"></span>
          Sacred Himalayan Terminology & Pronunciation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_GLOSSARY.map((item, idx) => (
            <div key={idx} className="bg-white p-5 border border-[#E8E4D8] space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-serif font-bold text-lg text-[#1A1A1A]">{item.term}</h5>
                <span className="font-serif text-xl text-[#8B1E1E]">{item.script}</span>
              </div>
              <p className="text-xs text-[#4A443D] font-serif">{item.meaning}</p>
              <div className="pt-2 border-t border-[#E5E1D8] flex items-center justify-between text-[10px] text-[#8B7E66]">
                <span>Pronunciation: <strong>{item.pronunciation}</strong></span>
                <span className="uppercase tracking-wider">{item.language}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
