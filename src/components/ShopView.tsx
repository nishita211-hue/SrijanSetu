import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Award, 
  ShoppingBag, 
  Eye, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Layers,
  X
} from 'lucide-react';
import { CraftSample, LanguageCode } from '../types';
import { CRAFT_SAMPLES } from '../data/marketData';
import { ALL_INDIA_CRAFTS_DATASET, IndiaCraftRecord } from '../data/allIndiaCraftDataset';
import { speakNativeLanguage, stopNativeSpeech } from '../data/translations';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { CraftImage } from './CraftImage';

interface ShopViewProps {
  currentLanguage: LanguageCode;
  onOpenScanner?: () => void;
}

// Convert an IndiaCraftRecord into a CraftSample compatible format for shopping
function craftRecordToSample(record: IndiaCraftRecord): CraftSample {
  return {
    id: record.id,
    name: record.craftName,
    regionalName: record.nativeNameHindi || record.craftName,
    category: record.category.includes('Textile') ? 'Handloom Textiles' : 
              record.category.includes('Pottery') ? 'Ceramics & Pottery' :
              record.category.includes('Metal') ? 'Metalcraft & Bronze' :
              record.category.includes('Toy') ? 'Woodcraft & Toys' : 'Folk Art & Canvas',
    originState: record.state,
    cluster: record.districtCluster,
    giCertified: record.giCertified,
    giTagNumber: record.giTagNumber,
    baseMaterialCost: Math.round(record.artisanFairPayoutINR * 0.25),
    laborHours: record.typicalProductionHours,
    artisanBaseRatePerHour: record.artisanFairWageHourly,
    traditionalMiddlemanRetailPrice: record.middlemanRetailPriceINR,
    artisanActualMiddlemanPayout: Math.round(record.middlemanRetailPriceINR * 0.2),
    recommendedFairPrice: record.artisanFairPayoutINR,
    demandForecastNext30Days: 120,
    demandGrowthRate: 25.0,
    confidenceScore: 0.96,
    featuresDetected: record.hallmarkFeatures,
    imageUrl: record.imageUrl,
    artisanName: record.craftName.includes('Banarasi') ? 'Mohammad Rais Ansari' :
                 record.craftName.includes('Blue Pottery') ? 'Gopal Lal Kumhar' :
                 record.craftName.includes('Channapatna') ? 'B. Venkatesh' :
                 record.craftName.includes('Chikankari') ? 'Shabana Bano' :
                 record.craftName.includes('Madhubani') ? 'Sunita Devi' :
                 record.craftName.includes('Patan') ? 'Rohitbhai Salvi' : 'Master Artisan Cluster',
    artisanExperienceYears: 24,
    artisanVoiceQuote: {
      en: record.voiceAudioScript.en,
      hi: record.voiceAudioScript.hi,
      gu: record.voiceAudioScript.gu,
      bn: record.voiceAudioScript.bn,
      ta: record.voiceAudioScript.ta,
    },
    story: record.historicalSignificance
  };
}

export const ShopView: React.FC<ShopViewProps> = ({ currentLanguage, onOpenScanner }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Combine market sample crafts and all-India items into one rich catalog
  const allProducts = useMemo(() => {
    const fromDataset = ALL_INDIA_CRAFTS_DATASET.map(craftRecordToSample);
    // Avoid duplicate IDs if present
    const map = new Map<string, CraftSample>();
    CRAFT_SAMPLES.forEach(c => map.set(c.id, c));
    fromDataset.forEach(c => {
      if (!map.has(c.id)) {
        map.set(c.id, c);
      }
    });
    return Array.from(map.values());
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [quickViewCraft, setQuickViewCraft] = useState<CraftSample | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Distinct categories and states
  const categories = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach(p => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [allProducts]);

  const states = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach(p => set.add(p.originState));
    return ['all', ...Array.from(set).sort()];
  }, [allProducts]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.originState.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.giTagNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesState = selectedState === 'all' || p.originState === selectedState;

      return matchesSearch && matchesCat && matchesState;
    });
  }, [allProducts, searchQuery, selectedCategory, selectedState]);

  const handleAddToCart = (craft: CraftSample, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(craft, 1);
    setAddedToast(`Added "${craft.name}" to your bag!`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const handleToggleWishlist = (craft: CraftSample, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdded = toggleWishlist(craft);
    setAddedToast(isAdded ? `Saved "${craft.name}" to your Wishlist!` : `Removed "${craft.name}" from your Wishlist.`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const handlePlayVoice = (craft: CraftSample) => {
    if (isPlayingAudio) {
      stopNativeSpeech();
      setIsPlayingAudio(false);
    } else {
      const text = craft.artisanVoiceQuote[currentLanguage] || craft.story;
      setIsPlayingAudio(true);
      speakNativeLanguage(text, currentLanguage, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-stone-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Hero Marketplace Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-10 shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            100% Verified GI-Certified Handicrafts
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif-heritage font-bold leading-tight">
            Discover Authentic Craft Traditions, Direct from Master Artisans
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Every piece is certified under India&apos;s Geographical Indications (GI) Registry. 
            Enjoy transparent fair-wage pricing, direct artisan linkage, and insured nationwide delivery.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-3.5 py-2 text-xs border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Middleman Markup</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-3.5 py-2 text-xs border border-white/10">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Direct Artisan Royalties</span>
            </div>
            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                className="bg-amber-600 hover:bg-amber-550 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm ml-auto"
              >
                Try AI Craft Lens &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by craft name, state, GI tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* State Dropdown Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-stone-600 whitespace-nowrap">
              Origin State:
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs rounded-xl border border-stone-300 bg-[#FAF8F5] px-3 py-2 font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-800 cursor-pointer"
            >
              <option value="all">All Indian States ({allProducts.length})</option>
              {states.filter(s => s !== 'all').map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="font-semibold text-stone-500 whitespace-nowrap mr-1">
            Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-900 text-white font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Collections' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Showing <strong>{filteredProducts.length}</strong> authentic handcrafted items
        </span>
        <span>
          Prices in Indian Rupees (INR ₹) &bull; Inclusive of all artisan dues
        </span>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((craft) => {
          const isWishlisted = isInWishlist(craft.id);
          const savings = craft.traditionalMiddlemanRetailPrice - craft.recommendedFairPrice;
          const savingsPercent = Math.round((savings / craft.traditionalMiddlemanRetailPrice) * 100);

          return (
            <div 
              key={craft.id}
              onClick={() => setQuickViewCraft(craft)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Image Box with GI tag and Wishlist */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <CraftImage 
                    src={craft.imageUrl} 
                    alt={craft.name} 
                    fallbackCategory={craft.originState}
                    badgeText={craft.giTagNumber}
                    className="w-full h-full group-hover:scale-105 transition duration-300"
                  />

                  {/* GI Tag Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-stone-900/85 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-400/30">
                      <Award className="w-3 h-3 text-amber-400" />
                      {craft.giTagNumber}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleToggleWishlist(craft, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs text-stone-700 hover:text-rose-600 flex items-center justify-center shadow-xs transition"
                    title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={`w-4 h-4 transition ${isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-stone-600'}`} />
                  </button>

                  {/* Fair Value savings tag */}
                  {savingsPercent > 0 && (
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs border border-emerald-500/30">
                        {savingsPercent}% Lower than Retail
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] text-amber-900 font-bold uppercase tracking-wider">
                    <span>{craft.category}</span>
                    <span className="text-stone-500 font-normal font-mono">{craft.originState}</span>
                  </div>

                  <h3 className="font-serif-heritage font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-amber-900 transition">
                    {craft.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {craft.story}
                  </p>

                  {/* Maker Badge */}
                  <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-2 border border-stone-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-amber-800 text-amber-100 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                      {craft.artisanName.charAt(0)}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-stone-800 block truncate text-[11px]">
                        {craft.artisanName}
                      </span>
                      <span className="text-[9px] text-stone-500 block truncate">
                        {craft.cluster}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-4 pt-0 border-t border-stone-100 mt-2">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Direct Fair Price:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-amber-950 font-mono">
                        ₹{craft.recommendedFairPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-400 line-through font-mono">
                        ₹{craft.traditionalMiddlemanRetailPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(craft, e)}
                    className="px-3.5 py-2 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Product Modal */}
      {quickViewCraft && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setQuickViewCraft(null);
                stopNativeSpeech();
                setIsPlayingAudio(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image & Badges (5 cols) */}
              <div className="md:col-span-5 space-y-3">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200">
                  <CraftImage 
                    src={quickViewCraft.imageUrl} 
                    alt={quickViewCraft.name} 
                    fallbackCategory={quickViewCraft.originState}
                    badgeText={quickViewCraft.giTagNumber}
                    className="w-full h-full"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-amber-950/90 text-amber-200 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-400/40">
                    GI Tag: {quickViewCraft.giTagNumber}
                  </div>
                </div>

                {/* Artisan Info Box */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 text-xs space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 font-bold flex items-center justify-center text-sm">
                      {quickViewCraft.artisanName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">
                        {quickViewCraft.artisanName}
                      </span>
                      <span className="text-[11px] text-stone-600 block">
                        {quickViewCraft.cluster}, {quickViewCraft.originState}
                      </span>
                      <span className="text-[10px] text-amber-800 font-medium">
                        {quickViewCraft.artisanExperienceYears} Years Master Craft Experience
                      </span>
                    </div>
                  </div>

                  {/* Audio Quote Button */}
                  <button
                    onClick={() => handlePlayVoice(quickViewCraft)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
                      isPlayingAudio
                        ? 'bg-amber-800 text-white animate-pulse'
                        : 'bg-white border border-amber-300 text-amber-950 hover:bg-amber-100'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        Pause Artisan Voice
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                        Listen to Artisan Story ({currentLanguage.toUpperCase()})
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Specifications & Purchase (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                    <span>{quickViewCraft.category}</span>
                    <span>&bull;</span>
                    <span>{quickViewCraft.originState}</span>
                  </div>
                  <h2 className="font-serif-heritage font-bold text-xl sm:text-2xl text-stone-900 mt-1">
                    {quickViewCraft.name}
                  </h2>
                  <span className="text-xs text-stone-500 font-medium block">
                    {quickViewCraft.regionalName}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {quickViewCraft.story}
                </p>

                {/* Key Features */}
                {quickViewCraft.featuresDetected && quickViewCraft.featuresDetected.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-stone-800 block">
                      Authentic Craftsmanship Hallmarks:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                      {quickViewCraft.featuresDetected.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Craft Specs Grid */}
                <div className="grid grid-cols-2 gap-2 bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Production Effort</span>
                    <span className="font-bold text-stone-800 font-mono">
                      {quickViewCraft.laborHours} Hours of Master Work
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">GI Certification</span>
                    <span className="font-bold text-emerald-700 font-mono">
                      Verified Genuine ({quickViewCraft.giTagNumber})
                    </span>
                  </div>
                </div>

                {/* Pricing & Checkout Actions */}
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-stone-500 block">Fair Trade Direct Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-amber-950 font-mono">
                          ₹{quickViewCraft.recommendedFairPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-stone-400 line-through font-mono">
                          ₹{quickViewCraft.traditionalMiddlemanRetailPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                      Save ₹{(quickViewCraft.traditionalMiddlemanRetailPrice - quickViewCraft.recommendedFairPrice).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        addToCart(quickViewCraft, 1);
                        setQuickViewCraft(null);
                      }}
                      className="flex-1 py-3 bg-amber-900 hover:bg-amber-850 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Shopping Bag
                    </button>

                    <button
                      onClick={(e) => handleToggleWishlist(quickViewCraft, e)}
                      className={`px-4 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition ${
                        isInWishlist(quickViewCraft.id)
                          ? 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                          : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                      title={isInWishlist(quickViewCraft.id) ? "Remove from Wishlist" : "Save to Wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(quickViewCraft.id) ? 'fill-rose-600 text-rose-600' : 'text-stone-500'}`} />
                      <span className="hidden sm:inline">
                        {isInWishlist(quickViewCraft.id) ? 'Saved' : 'Wishlist'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
