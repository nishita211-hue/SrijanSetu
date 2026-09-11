import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Globe2, 
  Award, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { LanguageCode } from '../types';
import { ALL_INDIA_CRAFTS_DATASET, IndiaCraftRecord } from '../data/allIndiaCraftDataset';
import { GLOBAL_CRAFTS_DATASET, GlobalCraft } from '../data/globalCraftDataset';
import { speakNativeLanguage, stopNativeSpeech } from '../data/translations';
import { CraftImage } from './CraftImage';
import { useCart } from '../context/CartContext';
import { CRAFT_SAMPLES } from '../data/marketData';

interface ExploreViewProps {
  currentLanguage: LanguageCode;
  onNavigateToShop?: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ currentLanguage, onNavigateToShop }) => {
  const { addToCart } = useCart();
  const [activeDirectory, setActiveDirectory] = useState<'india' | 'global'>('india');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [playingCraftId, setPlayingCraftId] = useState<string | null>(null);

  // States list for India
  const indiaStates = useMemo(() => {
    const set = new Set<string>();
    ALL_INDIA_CRAFTS_DATASET.forEach(c => set.add(c.state));
    return ['all', ...Array.from(set).sort()];
  }, []);

  // Continents for Global
  const continents = useMemo(() => {
    const set = new Set<string>();
    GLOBAL_CRAFTS_DATASET.forEach(c => set.add(c.continent));
    return ['all', ...Array.from(set).sort()];
  }, []);

  // Filtered India Crafts
  const filteredIndiaCrafts = useMemo(() => {
    return ALL_INDIA_CRAFTS_DATASET.filter(c => {
      const matchesSearch = 
        c.craftName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.districtCluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.giTagNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'all' || c.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchQuery, selectedState]);

  // Filtered Global Crafts
  const filteredGlobalCrafts = useMemo(() => {
    return GLOBAL_CRAFTS_DATASET.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = selectedContinent === 'all' || c.continent === selectedContinent;
      return matchesSearch && matchesContinent;
    });
  }, [searchQuery, selectedContinent]);

  const handlePlayVoice = (id: string, text: string) => {
    if (playingCraftId === id) {
      stopNativeSpeech();
      setPlayingCraftId(null);
    } else {
      stopNativeSpeech();
      setPlayingCraftId(id);
      speakNativeLanguage(text, currentLanguage, () => {
        setPlayingCraftId(null);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5 text-amber-800" />
            Heritage Knowledge Directory
          </div>
          <h1 className="font-serif-heritage font-bold text-2xl sm:text-3xl text-stone-900">
            Explore Handcrafted Legacies Across India & The World
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Discover the stories, authentic materials, and GI-registered techniques of centuries-old craft traditions.
          </p>
        </div>

        {/* Directory Switcher Tabs */}
        <div className="flex bg-stone-100 p-1 rounded-xl self-start md:self-center border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveDirectory('india');
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeDirectory === 'india'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            India GI Directory ({ALL_INDIA_CRAFTS_DATASET.length})
          </button>
          <button
            onClick={() => {
              setActiveDirectory('global');
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeDirectory === 'global'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            Global Traditions ({GLOBAL_CRAFTS_DATASET.length})
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={activeDirectory === 'india' ? 'Search craft, state, GI tag...' : 'Search craft or country...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-amber-800"
          />
        </div>

        {activeDirectory === 'india' ? (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-stone-600 whitespace-nowrap">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs rounded-xl border border-stone-300 bg-[#FAF8F5] px-3 py-2 font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-800 cursor-pointer"
            >
              <option value="all">All States ({ALL_INDIA_CRAFTS_DATASET.length})</option>
              {indiaStates.filter(s => s !== 'all').map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-stone-600 whitespace-nowrap">Continent:</span>
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="text-xs rounded-xl border border-stone-300 bg-[#FAF8F5] px-3 py-2 font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-800 cursor-pointer"
            >
              <option value="all">All Continents ({GLOBAL_CRAFTS_DATASET.length})</option>
              {continents.filter(c => c !== 'all').map(cont => (
                <option key={cont} value={cont}>{cont}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Directory Grid */}
      {activeDirectory === 'india' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndiaCrafts.map((craft) => {
            const isPlaying = playingCraftId === craft.id;
            const audioScript = craft.voiceAudioScript[currentLanguage] || craft.historicalSignificance;

            return (
              <div 
                key={craft.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <CraftImage 
                      src={craft.imageUrl} 
                      alt={craft.craftName} 
                      fallbackCategory={`${craft.state} • ${craft.category}`}
                      badgeText={craft.giTagNumber}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-stone-900/85 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      {craft.giTagNumber}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                      <span>{craft.category}</span>
                      <span className="text-stone-500 font-normal">{craft.state}</span>
                    </div>

                    <div>
                      <h3 className="font-serif-heritage font-bold text-stone-900 text-lg leading-snug">
                        {craft.craftName}
                      </h3>
                      <span className="text-xs text-stone-500 font-medium">
                        {craft.nativeNameHindi} &bull; {craft.districtCluster}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {craft.historicalSignificance}
                    </p>

                    <div className="space-y-1 text-xs pt-1">
                      <div className="text-[11px] font-bold text-stone-700">Materials:</div>
                      <div className="flex flex-wrap gap-1">
                        {craft.primaryMaterials.map((mat, idx) => (
                          <span key={idx} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px]">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 mt-3 flex items-center justify-between py-3">
                  <button
                    onClick={() => handlePlayVoice(craft.id, audioScript)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                      isPlaying
                        ? 'bg-amber-800 text-white animate-pulse'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-700" />}
                    {isPlaying ? 'Pause Story' : 'Listen Story'}
                  </button>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block">Artisan Price:</span>
                    <span className="text-sm font-black text-amber-950 font-mono">
                      ₹{craft.artisanFairPayoutINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGlobalCrafts.map((craft) => (
            <div 
              key={craft.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <CraftImage 
                    src={craft.imageUrl} 
                    alt={craft.name} 
                    fallbackCategory={`${craft.country} • ${craft.category}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-stone-900/85 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                    <Globe2 className="w-3 h-3 text-amber-400" />
                    {craft.country} &bull; {craft.continent}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                    {craft.category}
                  </div>

                  <h3 className="font-serif-heritage font-bold text-stone-900 text-lg leading-snug">
                    {craft.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {craft.historicalSignificance}
                  </p>

                  <div className="space-y-1 text-xs pt-1">
                    <div className="text-[11px] font-bold text-stone-700">Cultural Elements:</div>
                    <div className="flex flex-wrap gap-1">
                      {craft.culturalElements.map((el, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px]">
                          {el}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-3 flex items-center justify-between py-3">
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {craft.giOrIntangibleHeritageStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
