import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Award, 
  MapPin, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  X,
  Share2,
  Check
} from 'lucide-react';
import { CraftSample, LanguageCode } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { CraftImage } from './CraftImage';
import { speakNativeLanguage, stopNativeSpeech } from '../data/translations';
import { CRAFT_SAMPLES } from '../data/marketData';

interface WishlistViewProps {
  currentLanguage: LanguageCode;
  onNavigateToShop: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  currentLanguage,
  onNavigateToShop
}) => {
  const { wishlistItems, removeFromWishlist, clearWishlist, addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [sortOption, setSortOption] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewCraft, setQuickViewCraft] = useState<CraftSample | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Categories in wishlist
  const categories = useMemo(() => {
    const set = new Set<string>();
    wishlistItems.forEach(item => set.add(item.category));
    return ['all', ...Array.from(set)];
  }, [wishlistItems]);

  // Filtered & sorted wishlist items
  const displayItems = useMemo(() => {
    let result = [...wishlistItems];
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.recommendedFairPrice - b.recommendedFairPrice);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.recommendedFairPrice - a.recommendedFairPrice);
    }
    return result;
  }, [wishlistItems, selectedCategory, sortOption]);

  // Calculated totals
  const totalFairValue = useMemo(() => {
    return wishlistItems.reduce((sum, item) => sum + item.recommendedFairPrice, 0);
  }, [wishlistItems]);

  const totalRetailValue = useMemo(() => {
    return wishlistItems.reduce((sum, item) => sum + item.traditionalMiddlemanRetailPrice, 0);
  }, [wishlistItems]);

  const totalSavings = totalRetailValue - totalFairValue;

  const handleMoveToCart = (craft: CraftSample, removeFromWishlistAfter = false) => {
    addToCart(craft, 1);
    if (removeFromWishlistAfter) {
      removeFromWishlist(craft.id);
      showToast(`Moved "${craft.name}" to your shopping bag!`);
    } else {
      showToast(`Added "${craft.name}" to your shopping bag!`);
    }
  };

  const handleMoveAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach(item => addToCart(item, 1));
    showToast(`Added all ${wishlistItems.length} saved crafts to your shopping bag!`);
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleToggleVoice = (craft: CraftSample) => {
    if (playingAudioId === craft.id) {
      stopNativeSpeech();
      setPlayingAudioId(null);
    } else {
      stopNativeSpeech();
      setPlayingAudioId(craft.id);
      const text = craft.artisanVoiceQuote[currentLanguage] || craft.story;
      speakNativeLanguage(text, currentLanguage, () => {
        setPlayingAudioId(null);
      });
    }
  };

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast feedback */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-amber-100 text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-amber-700/50 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            Curated Heritage Wishlist
          </div>
          <h1 className="font-serif-heritage font-bold text-2xl sm:text-3xl text-stone-900">
            Your Saved Handcrafted Treasures
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Keep track of your favorite GI-certified masterworks for upcoming celebrations, home styling, or mindful gifting.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
          <button
            onClick={onNavigateToShop}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition"
          >
            &larr; Browse More Crafts
          </button>

          {wishlistItems.length > 0 && (
            <>
              <button
                onClick={handleShareWishlist}
                className="px-3 py-2.5 bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                title="Share Wishlist Link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={handleMoveAllToCart}
                className="px-4 py-2.5 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                Move All to Bag ({wishlistItems.length})
              </button>
            </>
          )}
        </div>
      </div>

      {/* When Empty */}
      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <Heart className="w-10 h-10 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif-heritage font-bold text-2xl text-stone-900">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Explore our collection of authentic Indian crafts and tap the heart icon on any piece to save it here for future purchase.
            </p>
          </div>

          <button
            onClick={onNavigateToShop}
            className="px-6 py-3 bg-amber-900 hover:bg-amber-850 text-white font-bold rounded-xl text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Discover GI Crafts in Shop &rarr;
          </button>

          {/* Quick recommendations to add */}
          <div className="pt-8 border-t border-stone-100 text-left space-y-4">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              Popular Certified Crafts Patrons Love:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CRAFT_SAMPLES.slice(0, 3).map(craft => (
                <div 
                  key={craft.id}
                  className="bg-stone-50 rounded-xl p-3 border border-stone-200 flex items-center gap-3 justify-between"
                >
                  <div className="min-w-0">
                    <span className="font-serif-heritage font-bold text-xs text-stone-900 block truncate">
                      {craft.name}
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      {craft.originState} &bull; ₹{craft.recommendedFairPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToWishlist(craft);
                      showToast(`Added "${craft.name}" to your wishlist!`);
                    }}
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-rose-600 hover:bg-rose-50 transition flex-shrink-0"
                    title="Save to Wishlist"
                  >
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Metric Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
              <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                Saved Masterpieces
              </span>
              <div className="text-2xl font-black text-stone-900 mt-1">
                {wishlistItems.length} <span className="text-xs font-normal text-stone-500">items</span>
              </div>
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                100% verified GI craftsmanship
              </span>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
              <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                Direct Fair Valuation
              </span>
              <div className="text-2xl font-black text-amber-950 font-mono mt-1">
                ₹{totalFairValue.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
                Direct payout credited to artisan accounts
              </span>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
              <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                Middleman Markup Saved
              </span>
              <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
                ₹{totalSavings.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                Retail estimate: ₹{totalRetailValue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Filters & Controls */}
          <div className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              <span className="font-semibold text-stone-500 text-[11px] mr-1">Filter:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-amber-900 text-white font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat === 'all' ? 'All Collections' : cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown and Clear All */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-semibold whitespace-nowrap">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="text-xs rounded-xl border border-stone-300 bg-[#FAF8F5] px-3 py-1.5 font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-800 cursor-pointer"
                >
                  <option value="default">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                    clearWishlist();
                  }
                }}
                className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1 p-1 hover:bg-rose-50 rounded-lg transition"
                title="Remove all saved items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </div>
          </div>

          {/* Grid of Saved Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayItems.map((craft) => {
              const isPlaying = playingAudioId === craft.id;
              const savings = craft.traditionalMiddlemanRetailPrice - craft.recommendedFairPrice;
              const savingsPercent = Math.round((savings / craft.traditionalMiddlemanRetailPrice) * 100);

              return (
                <div
                  key={craft.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Header with GI Tag and Remove Button */}
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setQuickViewCraft(craft)}>
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

                      {/* Remove Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(craft.id);
                          showToast(`Removed "${craft.name}" from wishlist.`);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs text-rose-600 hover:bg-rose-50 flex items-center justify-center shadow-xs transition"
                        title="Remove from Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                      </button>

                      {/* Savings Ribbon */}
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

                      <h3 
                        onClick={() => setQuickViewCraft(craft)}
                        className="font-serif-heritage font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-amber-900 transition cursor-pointer"
                      >
                        {craft.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {craft.story}
                      </p>

                      {/* Maker Badge & Audio */}
                      <div className="flex items-center justify-between bg-stone-50 rounded-lg p-2 border border-stone-100 text-xs">
                        <div className="flex items-center gap-2 truncate">
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

                        {/* Audio Story button */}
                        <button
                          onClick={() => handleToggleVoice(craft)}
                          className={`p-1.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition ${
                            isPlaying
                              ? 'bg-amber-800 text-white animate-pulse'
                              : 'text-stone-600 hover:text-amber-900 hover:bg-stone-200'
                          }`}
                          title="Listen to Artisan Story"
                        >
                          {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="p-4 pt-0 border-t border-stone-100 mt-2 space-y-2">
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
                        onClick={() => handleMoveToCart(craft, false)}
                        className="px-3.5 py-2 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Bag
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-stone-500 border-t border-stone-100">
                      <button
                        onClick={() => setQuickViewCraft(craft)}
                        className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Quick View
                      </button>

                      <button
                        onClick={() => {
                          removeFromWishlist(craft.id);
                          showToast(`Removed "${craft.name}" from wishlist.`);
                        }}
                        className="text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Quick View Product Modal */}
      {quickViewCraft && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setQuickViewCraft(null);
                stopNativeSpeech();
                setPlayingAudioId(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image & Badges */}
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

                  <button
                    onClick={() => handleToggleVoice(quickViewCraft)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
                      playingAudioId === quickViewCraft.id
                        ? 'bg-amber-800 text-white animate-pulse'
                        : 'bg-white border border-amber-300 text-amber-950 hover:bg-amber-100'
                    }`}
                  >
                    {playingAudioId === quickViewCraft.id ? (
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

              {/* Product Specifications & Purchase */}
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

                {/* Specs */}
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

                {/* Pricing & Cart Action */}
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
                        showToast(`Added "${quickViewCraft.name}" to shopping bag!`);
                        setQuickViewCraft(null);
                      }}
                      className="flex-1 py-3 bg-amber-900 hover:bg-amber-850 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Shopping Bag
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
