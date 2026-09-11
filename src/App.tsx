import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ShopView } from './components/ShopView';
import { ScannerView } from './components/ScannerView';
import { ExploreView } from './components/ExploreView';
import { ArtisansView } from './components/ArtisansView';
import { WishlistView } from './components/WishlistView';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ActiveTab, LanguageCode } from './types';
import { ShieldCheck, Award, Heart, Mail, Phone, MapPin, Truck, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('shop');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans">
          {/* Top Navbar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeTab === 'shop' && (
              <ShopView 
                currentLanguage={currentLanguage} 
                onOpenScanner={() => setActiveTab('scanner')} 
              />
            )}

            {activeTab === 'scanner' && (
              <ScannerView 
                currentLanguage={currentLanguage} 
                onNavigateToShop={() => setActiveTab('shop')} 
              />
            )}

            {activeTab === 'explore' && (
              <ExploreView 
                currentLanguage={currentLanguage} 
                onNavigateToShop={() => setActiveTab('shop')} 
              />
            )}

            {activeTab === 'artisans' && (
              <ArtisansView 
                currentLanguage={currentLanguage} 
                onNavigateToShop={() => setActiveTab('shop')} 
              />
            )}

            {activeTab === 'wishlist' && (
              <WishlistView 
                currentLanguage={currentLanguage} 
                onNavigateToShop={() => setActiveTab('shop')} 
              />
            )}
          </main>

          {/* Global Slide-Over Shopping Cart & Checkout */}
          <CartDrawer />

        {/* Customer-Friendly Footer */}
        <footer className="bg-stone-900 text-stone-400 text-xs pt-12 pb-8 border-t border-stone-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Col */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-800 text-amber-100 flex items-center justify-center font-serif-heritage font-bold text-base">
                    सं
                  </div>
                  <span className="font-serif-heritage font-bold text-xl text-stone-100">
                    Srijan<span className="text-amber-500">Setu</span>
                  </span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Connecting master artisans with conscious patrons worldwide through authentic GI-verified craftsmanship and fair-wage transparency.
                </p>
                <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Genuine Handcrafted Guarantee</span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
                  Shop & Discover
                </h4>
                <ul className="space-y-1.5">
                  <li>
                    <button 
                      onClick={() => setActiveTab('shop')}
                      className="hover:text-amber-400 transition"
                    >
                      All Heritage Crafts
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('scanner')}
                      className="hover:text-amber-400 transition"
                    >
                      AI Craft Authenticity Lens
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('explore')}
                      className="hover:text-amber-400 transition"
                    >
                      Geographical Indications Directory
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('artisans')}
                      className="hover:text-amber-400 transition"
                    >
                      Meet Our Master Artisans
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('wishlist')}
                      className="hover:text-amber-400 transition flex items-center gap-1.5"
                    >
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                      <span>Saved Heritage Wishlist</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* GI Heritage Clusters */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
                  Featured Heritage Clusters
                </h4>
                <ul className="space-y-1.5 text-stone-400">
                  <li>Varanasi Silk Brocades (UP)</li>
                  <li>Jaipur Blue Pottery (Rajasthan)</li>
                  <li>Mithila Madhubani Paintings (Bihar)</li>
                  <li>Channapatna Wooden Toys (Karnataka)</li>
                  <li>Patan Double Ikat Patola (Gujarat)</li>
                </ul>
              </div>

              {/* Customer Care & Assurance */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">
                  Customer Care & Support
                </h4>
                <div className="space-y-2 text-stone-400 text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Insured Nationwide Delivery (4-6 Days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Official GI Registry Certificate Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    <span>care@srijansetu.org</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
              <div>
                &copy; {new Date().getFullYear()} SrijanSetu &bull; Direct Artisan Fair-Trade Platform.
              </div>
              <div className="flex items-center gap-4">
                <span>Terms of Service</span>
                <span>&bull;</span>
                <span>Privacy Policy</span>
                <span>&bull;</span>
                <span className="text-amber-400">Direct Artisan Empowerment</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  </WishlistProvider>
);
}
