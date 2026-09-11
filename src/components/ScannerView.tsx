import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  ShoppingBag, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Info,
  ArrowRight,
  Heart
} from 'lucide-react';
import { CraftSample, LanguageCode } from '../types';
import { CRAFT_SAMPLES } from '../data/marketData';
import { speakNativeLanguage, stopNativeSpeech } from '../data/translations';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { CraftImage } from './CraftImage';

interface ScannerViewProps {
  currentLanguage: LanguageCode;
  onNavigateToShop?: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ currentLanguage, onNavigateToShop }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedCraft, setSelectedCraft] = useState<CraftSample>(CRAFT_SAMPLES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [scanSuccessToast, setScanSuccessToast] = useState<boolean>(false);
  const [wishlistToast, setWishlistToast] = useState<string | null>(null);

  // File upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
        triggerAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setScanSuccessToast(true);
      setTimeout(() => setScanSuccessToast(false), 3500);
    }, 1200);
  };

  const handleSelectSample = (craft: CraftSample) => {
    setCustomImage(null);
    setSelectedCraft(craft);
    triggerAnalysis();
    if (isPlayingAudio) {
      stopNativeSpeech();
      setIsPlayingAudio(false);
    }
  };

  const handleToggleVoice = () => {
    if (isPlayingAudio) {
      stopNativeSpeech();
      setIsPlayingAudio(false);
    } else {
      const text = selectedCraft.artisanVoiceQuote[currentLanguage] || selectedCraft.story;
      setIsPlayingAudio(true);
      speakNativeLanguage(text, currentLanguage, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-700" />
            AI Craft Lens & Authenticity Scanner
          </div>
          <h1 className="font-serif-heritage font-bold text-2xl sm:text-3xl text-stone-900">
            Instant Craft Recognition & GI Tag Verification
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Upload or photograph any handcrafted artifact. Our vision model identifies authentic materials, 
            verifies the official Geographical Indication (GI) registration, estimates fair valuation, and narrates the artisan&apos;s story.
          </p>
        </div>

        {onNavigateToShop && (
          <button
            onClick={onNavigateToShop}
            className="self-start md:self-center px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            Browse Marketplace &rarr;
          </button>
        )}
      </div>

      {/* Main Scanner Section (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Camera Viewfinder & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-800" />
                Craft Viewfinder
              </span>
              <label className="cursor-pointer text-xs font-bold text-amber-900 hover:text-amber-750 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            </div>

            {/* Viewfinder Preview Box */}
            <div className="relative rounded-xl overflow-hidden bg-stone-950 aspect-[4/3] border border-stone-300 shadow-inner group flex items-center justify-center">
              <CraftImage 
                src={customImage || selectedCraft.imageUrl} 
                alt={selectedCraft.name} 
                fallbackCategory={`${selectedCraft.originState} • ${selectedCraft.category}`}
                badgeText={selectedCraft.giTagNumber}
                className={`w-full h-full ${isAnalyzing ? 'scale-105 blur-xs transition duration-300' : ''}`}
              />

              {/* Scanning state overlay */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                  <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mb-3" />
                  <span className="text-sm font-bold tracking-wide">
                    Analyzing Craft Features...
                  </span>
                  <span className="text-xs text-amber-200/80 mt-1">
                    Matching GI registry & authentic hallmarks
                  </span>
                </div>
              )}

              {/* Viewfinder Corner Guides */}
              <div className="absolute inset-4 pointer-events-none border border-white/20 rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400" />
              </div>

              {/* GI Verified Watermark Tag */}
              {!isAnalyzing && (
                <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  GI Certified: {selectedCraft.giTagNumber}
                </div>
              )}
            </div>

            {/* Quick Test Samples */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                Tap to Test Sample Artifacts:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {CRAFT_SAMPLES.map((craft) => (
                  <button
                    key={craft.id}
                    onClick={() => handleSelectSample(craft)}
                    className={`p-2 rounded-xl border text-left text-xs transition flex items-center gap-2.5 ${
                      selectedCraft.id === craft.id && !customImage
                        ? 'border-amber-800 bg-amber-50/80 text-amber-950 font-bold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <CraftImage 
                      src={craft.imageUrl} 
                      alt={craft.name} 
                      fallbackCategory={craft.originState}
                      className="w-8 h-8 rounded-lg flex-shrink-0"
                    />
                    <div className="truncate min-w-0">
                      <div className="truncate font-semibold text-xs leading-snug">{craft.name}</div>
                      <div className="text-[10px] text-stone-500 truncate">{craft.originState}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Identification & Craft Story (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            {/* Header with GI Tag */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <span>{selectedCraft.category}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-stone-600 font-normal">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {selectedCraft.originState}
                  </span>
                </div>
                <h2 className="font-serif-heritage font-bold text-2xl text-stone-900 mt-1">
                  {selectedCraft.name}
                </h2>
                <span className="text-xs text-stone-500 font-medium block">
                  Traditional Name: {selectedCraft.regionalName}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-300/80 px-3 py-1.5 rounded-full text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>GI Verified ({selectedCraft.giTagNumber})</span>
              </div>
            </div>

            {/* Cultural History & Story */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Heritage Background:
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {selectedCraft.story}
              </p>
            </div>

            {/* Hallmarks Detected */}
            <div className="space-y-2 bg-stone-50 rounded-xl p-4 border border-stone-200">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Authentic Craftsmanship Hallmarks:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {selectedCraft.featuresDetected.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Artisan Profile & Voice Narration */}
            <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {selectedCraft.artisanName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm">
                    {selectedCraft.artisanName}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    {selectedCraft.cluster} &bull; {selectedCraft.artisanExperienceYears} Years Experience
                  </div>
                </div>
              </div>

              <button
                onClick={handleToggleVoice}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  isPlayingAudio
                    ? 'bg-amber-800 text-white animate-pulse'
                    : 'bg-white border border-amber-300 text-amber-950 hover:bg-amber-100 shadow-xs'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    Pause Voice Story
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    Listen to Artisan Voice ({currentLanguage.toUpperCase()})
                  </>
                )}
              </button>
            </div>

            {/* Fair Market Value Breakdown & Buy Action */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                    Direct Fair Trade Valuation
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-amber-950 font-mono">
                      ₹{selectedCraft.recommendedFairPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-400 line-through font-mono">
                      Retail: ₹{selectedCraft.traditionalMiddlemanRetailPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-emerald-800">
                  <span className="font-bold block">100% Direct to Artisan</span>
                  <span className="text-[10px] text-stone-500">Zero middleman exploitation</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => addToCart(selectedCraft, 1)}
                  className="flex-1 py-3 bg-amber-900 hover:bg-amber-850 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Bag
                </button>

                <button
                  onClick={() => {
                    const added = toggleWishlist(selectedCraft);
                    setWishlistToast(added ? `Saved "${selectedCraft.name}" to your Wishlist!` : `Removed "${selectedCraft.name}" from Wishlist.`);
                    setTimeout(() => setWishlistToast(null), 3000);
                  }}
                  className={`px-4 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition ${
                    isInWishlist(selectedCraft.id)
                      ? 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                  title={isInWishlist(selectedCraft.id) ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(selectedCraft.id) ? 'fill-rose-600 text-rose-600' : 'text-stone-500'}`} />
                  <span className="hidden sm:inline">
                    {isInWishlist(selectedCraft.id) ? 'Saved' : 'Wishlist'}
                  </span>
                </button>
              </div>

              {wishlistToast && (
                <div className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-center">
                  {wishlistToast}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
