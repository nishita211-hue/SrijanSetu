import React from 'react';
import { 
  ShoppingBag, 
  Camera, 
  Globe2, 
  Users, 
  Languages, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Heart,
  Search,
  Calculator
} from 'lucide-react';
import { ActiveTab, LanguageCode } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLanguage,
  setCurrentLanguage
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistCount } = useWishlist();

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-amber-900/10">
      {/* Top Consumer Announcement Bar */}
      <div className="bg-amber-950 text-amber-100 text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="bg-amber-800 text-amber-200 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Authentic GI
            </span>
            <span className="hidden sm:inline text-amber-200/90 font-medium">
              Direct from verified master artisans &bull; 100% Genuine Handcrafted Traditions
            </span>
            <span className="sm:hidden text-amber-200/90 font-medium">
              100% Genuine Handcrafted Traditions
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-amber-300">
            <span className="hidden md:inline font-mono">Free Insured Courier &gt; ₹999</span>
            <span>&bull;</span>
            <span className="font-semibold text-emerald-400">Zero Middleman Markup</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Name */}
          <button 
            onClick={() => setActiveTab('shop')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-900 text-amber-100 flex items-center justify-center font-serif-heritage font-bold text-lg shadow-xs group-hover:bg-amber-850 transition">
              सं
            </div>
            <div>
              <div className="font-serif-heritage font-bold text-xl tracking-tight text-stone-900 group-hover:text-amber-900 transition">
                Srijan<span className="text-amber-800">Setu</span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium -mt-0.5 tracking-wide">
                Authentic Handcrafted Heritage
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition ${
                activeTab === 'shop'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Crafts
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition ${
                activeTab === 'scanner'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Camera className="w-4 h-4 text-amber-600" />
              AI Craft Lens
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition ${
                activeTab === 'explore'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Globe2 className="w-4 h-4 text-stone-500" />
              Explore Heritage
            </button>

            <button
              onClick={() => setActiveTab('artisans')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition ${
                activeTab === 'artisans'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Users className="w-4 h-4 text-stone-500" />
              Our Artisans
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition relative ${
                activeTab === 'wishlist'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
              id="nav-wishlist-button"
            >
              <Heart className={`w-4 h-4 ${activeTab === 'wishlist' ? 'fill-white text-white' : 'text-rose-600 fill-rose-600'}`} />
              <span>Wishlist</span>
              {totalWishlistCount > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeTab === 'wishlist' ? 'bg-amber-100 text-amber-950' : 'bg-rose-100 text-rose-700'
                }`}>
                  {totalWishlistCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Utilities: Language & Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-white border border-stone-200 rounded-xl px-2 py-1.5 text-xs shadow-xs">
              <Languages className="w-3.5 h-3.5 text-stone-500 mr-1.5 flex-shrink-0" />
              <select 
                value={currentLanguage} 
                onChange={(e) => setCurrentLanguage(e.target.value as LanguageCode)}
                className="bg-transparent font-medium text-stone-800 focus:outline-none pr-1 cursor-pointer"
                id="language-select"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.native}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Wishlist icon (visible on smaller screens when desktop nav is hidden) */}
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`md:hidden p-2 rounded-xl border text-xs font-bold flex items-center justify-center transition relative ${
                activeTab === 'wishlist'
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-stone-200 text-stone-700 hover:text-rose-600'
              }`}
              title="Saved Wishlist"
              id="mobile-header-wishlist-button"
            >
              <Heart className={`w-4 h-4 ${totalWishlistCount > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-xs relative"
              id="open-cart-button"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {totalItems > 0 && (
                <span className="bg-amber-500 text-amber-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center -ml-0.5">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-stone-200/60 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'shop'
                ? 'bg-amber-900 text-white'
                : 'text-stone-700 bg-stone-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Shop
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'scanner'
                ? 'bg-amber-900 text-white'
                : 'text-stone-700 bg-stone-100'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            AI Lens
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'explore'
                ? 'bg-amber-900 text-white'
                : 'text-stone-700 bg-stone-100'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            Explore
          </button>
          <button
            onClick={() => setActiveTab('artisans')}
            className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'artisans'
                ? 'bg-amber-900 text-white'
                : 'text-stone-700 bg-stone-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Artisans
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
              activeTab === 'wishlist'
                ? 'bg-amber-900 text-white'
                : 'text-stone-700 bg-stone-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${activeTab === 'wishlist' ? 'fill-white text-white' : 'text-rose-600 fill-rose-600'}`} />
            Wishlist {totalWishlistCount > 0 && `(${totalWishlistCount})`}
          </button>
        </div>
      </div>
    </header>
  );
};
