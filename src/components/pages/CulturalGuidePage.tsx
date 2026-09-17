import React from 'react';
import { GuideForm } from '../GuideForm';
import { ResultCard } from '../ResultCard';
import { CuratedExplorer } from '../CuratedExplorer';
import { HistoryDrawer } from '../HistoryDrawer';
import { MonasteryGuideResult, HistoryItem, CuratedItem } from '../../types';
import { Compass, Sparkles } from 'lucide-react';

interface CulturalGuidePageProps {
  onAnalyze: (payload: { name?: string; image?: { data: string; mimeType: string }; additionalContext?: string }) => void;
  isLoading: boolean;
  currentResult: MonasteryGuideResult | null;
  currentThumbnail?: string;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onSelectCurated: (item: CuratedItem) => void;
  onClearHistory: () => void;
}

export const CulturalGuidePage: React.FC<CulturalGuidePageProps> = ({
  onAnalyze,
  isLoading,
  currentResult,
  currentThumbnail,
  history,
  onSelectHistory,
  onSelectCurated,
  onClearHistory,
}) => {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Page Title Header */}
      <div className="bg-[#F5F2EA] border border-[#E8E4D8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B1E1E] mb-1">
            <span className="w-2 h-2 bg-[#8B1E1E]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Module 01</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            Cultural Guide & AI Artifact Identifier
          </h2>
          <p className="text-xs sm:text-sm text-[#8B7E66] font-serif mt-1">
            Generate standardized 4-field JSON intelligence (Name, Location, Cultural Meaning, Visitor Tip) for any Sikkim monastery or relic.
          </p>
        </div>
        <div className="bg-white px-4 py-2 border border-[#E8E4D8] text-right">
          <div className="text-[10px] uppercase tracking-wider font-bold text-[#8B1E1E]">Gemini 3.7 Flash</div>
          <div className="text-[9px] text-[#8B7E66]">Strict JSON Enforcement</div>
        </div>
      </div>

      {/* Main Grid: Input Form (Left) & Result Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <GuideForm onAnalyze={onAnalyze} isLoading={isLoading} />
          {history.length > 0 && (
            <HistoryDrawer
              history={history}
              onSelect={onSelectHistory}
              onClear={onClearHistory}
            />
          )}
        </div>

        <div className="lg:col-span-7">
          {isLoading ? (
            <div className="bg-[#FDFCF7] border border-[#E8E4D8] p-12 text-center shadow-sm space-y-4">
              <div className="w-12 h-12 border border-[#8B1E1E] bg-[#F5F2EA] text-[#8B1E1E] flex items-center justify-center mx-auto animate-spin">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif italic text-lg text-[#1A1A1A]">
                  Identifying Sikkim Heritage & Lineage
                </h3>
                <p className="text-xs text-[#8B7E66] max-w-sm mx-auto font-serif">
                  Analyzing monastery architecture, district coordinates, Vajrayana history, and visitor etiquette...
                </p>
              </div>
            </div>
          ) : currentResult ? (
            <ResultCard data={currentResult} imageThumbnail={currentThumbnail} />
          ) : (
            <div className="bg-[#FDFCF7] border border-[#E8E4D8] p-12 text-center text-[#8B7E66] space-y-3">
              <Compass className="w-10 h-10 mx-auto text-[#8B7E66]" />
              <p className="text-xs uppercase tracking-wider font-bold">
                Enter a monastery title or upload an archival plate to generate the structured guide.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Curated Explorer Section */}
      <div className="pt-4">
        <CuratedExplorer
          onSelectItem={onSelectCurated}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
