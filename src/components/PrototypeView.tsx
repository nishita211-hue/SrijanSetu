import React, { useState, useId } from 'react';
import { 
  Camera, 
  Sparkles, 
  Calculator, 
  TrendingUp, 
  ShoppingBag, 
  Award, 
  Volume2, 
  VolumeX, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Sliders,
  DollarSign,
  Cpu
} from 'lucide-react';
import { CraftSample, LanguageCode, PrototypeSubTab } from '../types';
import { CRAFT_SAMPLES, DEMAND_FORECAST_SERIES } from '../data/marketData';
import { APP_TRANSLATIONS, speakNativeLanguage, stopNativeSpeech } from '../data/translations';
import { ModelTrainingView } from './ModelTrainingView';
import { CraftImage } from './CraftImage';

interface PrototypeViewProps {
  currentLanguage: LanguageCode;
}

export const PrototypeView: React.FC<PrototypeViewProps> = ({ currentLanguage }) => {
  const tProto = APP_TRANSLATIONS[currentLanguage].prototype;
  const [activeSubTab, setActiveSubTab] = useState<PrototypeSubTab>('cataloger');
  const [selectedCraft, setSelectedCraft] = useState<CraftSample>(CRAFT_SAMPLES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  
  // Pricing state
  const [materialCost, setMaterialCost] = useState<number>(selectedCraft.baseMaterialCost);
  const [laborHours, setLaborHours] = useState<number>(selectedCraft.laborHours);
  const [hourlyWage, setHourlyWage] = useState<number>(160); // ₹160/hr ethical living wage
  const [complexity, setComplexity] = useState<number>(2); // 1 = Simple, 2 = Intricate, 3 = Masterpiece
  
  // Forecast view horizon
  const [forecastHorizon, setForecastHorizon] = useState<'30' | '90'>('30');
  
  // Marketplace filter
  const [marketFilter, setMarketFilter] = useState<string>('all');

  const fileInputId = useId();

  // Handle sample craft selection
  const handleSelectCraft = (craft: CraftSample) => {
    setSelectedCraft(craft);
    setMaterialCost(craft.baseMaterialCost);
    setLaborHours(craft.laborHours);
    setCustomImage(null);
  };

  // Simulate AI camera cataloging
  const triggerSimulateScan = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  // Handle custom image upload with live forensic AI prediction
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        setCustomImage(base64);
        setIsAnalyzing(true);

        try {
          const response = await fetch('/api/predict-craft', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64,
              mimeType: file.type || 'image/jpeg'
            })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.prediction) {
              const p = data.prediction;
              const matchedArtisan = data.matchedPortalArtisans?.[0];
              const dynamicCraft: CraftSample = {
                id: `dynamic-${Date.now()}`,
                name: p.craftName || 'Authentic Handcrafted Specimen',
                regionalName: p.nativeName || p.craftName || 'पारंपरिक शिल्प',
                category: p.category || 'Handloom & Handicrafts',
                originState: p.state || 'India',
                cluster: p.districtCluster || 'Heritage Artisan Cluster',
                giCertified: Boolean(p.giCertified),
                giTagNumber: p.giTagNumber || 'GI-Certified',
                baseMaterialCost: p.baseMaterialCostINR || 650,
                laborHours: p.estimatedHours || 24,
                artisanBaseRatePerHour: 160,
                traditionalMiddlemanRetailPrice: p.middlemanRetailPriceINR || Math.round((p.fairPriceINR || 2400) * 2.3),
                artisanActualMiddlemanPayout: Math.round((p.fairPriceINR || 2400) * 0.42),
                recommendedFairPrice: p.fairPriceINR || 2400,
                demandForecastNext30Days: 135,
                demandGrowthRate: 19.4,
                confidenceScore: p.authenticityConfidenceScore || 96.5,
                featuresDetected: p.visualHallmarks || p.traditionalTechniques || ['Authentic Handcrafted Texture', 'Natural Pigments'],
                imageUrl: base64,
                artisanName: matchedArtisan?.artisanName || (p.state ? `${p.state} Master Artisan` : 'Registered Master Artisan'),
                artisanExperienceYears: matchedArtisan?.experienceYears || 28,
                artisanVoiceQuote: p.voiceQuote || {
                  en: p.historicalSummary || 'Every stitch and curve carries the living memory of our ancestors.',
                  hi: 'इस शिल्प की हर रेखा और रंग हमारे पूर्वजों की सदियों पुरानी विरासत की गवाही देता है।',
                  gu: 'આ કળાનો દરેક તાંતણો અમારા પૂર્વજોના આશીર્વાદ અને પરંપરાનું જીવંત પ્રતીક છે.',
                  bn: 'এই কারুশিল্পের প্রতিটি সূক্ষ্ম কাজ আমাদের পূর্বপুরুষদের সমৃদ্ধ ঐতিহ্য বহন করে।',
                  ta: 'இந்த கைவினைப் பொருளின் ஒவ்வொரு இழையும் எங்கள் மூதாதையர்களின் பரம்பரை கலையைக் காட்டுகிறது.'
                },
                story: p.historicalSummary || `Traditional authentic craft originating from ${p.districtCluster || 'India'}. Preserved across generations with natural materials.`
              };

              setSelectedCraft(dynamicCraft);
              setMaterialCost(dynamicCraft.baseMaterialCost);
              setLaborHours(dynamicCraft.laborHours);
            }
          }
        } catch (error) {
          console.error('Failed to run live craft prediction on upload:', error);
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Audio Speech Synthesis simulation in chosen native language
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopNativeSpeech();
      setIsPlayingAudio(false);
    } else {
      const textToSpeak = selectedCraft.artisanVoiceQuote[currentLanguage] || selectedCraft.artisanVoiceQuote.en;
      setIsPlayingAudio(true);
      speakNativeLanguage(textToSpeak, currentLanguage, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  // Calculate pricing metrics dynamically
  const directLaborValue = laborHours * hourlyWage;
  const complexityFactor = 1.0 + (complexity - 1) * 0.25;
  const calculatedBaseCost = (materialCost + directLaborValue) * complexityFactor;
  const fairDirectPrice = Math.round((calculatedBaseCost * 1.15) / 10) * 10;
  const artisanNetTakeHome = Math.round(calculatedBaseCost / 10) * 10;
  
  // Traditional middleman comparison
  const middlemanRetail = Math.round((fairDirectPrice * 2.3) / 10) * 10;
  const traditionalArtisanPayout = Math.round((calculatedBaseCost * 0.38) / 10) * 10;
  const artisanWageLift = Math.round(((artisanNetTakeHome - traditionalArtisanPayout) / traditionalArtisanPayout) * 100);
  const buyerSavingPercent = Math.round(((middlemanRetail - fairDirectPrice) / middlemanRetail) * 100);

  // Filtered crafts for marketplace
  const filteredCrafts = marketFilter === 'all' 
    ? CRAFT_SAMPLES 
    : CRAFT_SAMPLES.filter(c => c.originState.toLowerCase().includes(marketFilter.toLowerCase()) || c.category.toLowerCase().includes(marketFilter.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Sub-tab Pills */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveSubTab('cataloger')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'cataloger'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            id="subtab-cataloger"
          >
            <Camera className="w-4 h-4" />
            1. {tProto.subTabs.cataloger}
          </button>

          <button
            onClick={() => setActiveSubTab('pricing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'pricing'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            id="subtab-pricing"
          >
            <Calculator className="w-4 h-4" />
            2. {tProto.subTabs.pricing}
          </button>

          <button
            onClick={() => setActiveSubTab('forecast')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'forecast'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            id="subtab-forecast"
          >
            <TrendingUp className="w-4 h-4" />
            3. {tProto.subTabs.forecast}
          </button>

          <button
            onClick={() => setActiveSubTab('marketplace')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'marketplace'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            id="subtab-marketplace"
          >
            <ShoppingBag className="w-4 h-4" />
            4. {tProto.subTabs.marketplace}
          </button>

          <button
            onClick={() => setActiveSubTab('training')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'training'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            id="subtab-training"
          >
            <Cpu className="w-4 h-4" />
            5. {tProto.subTabs.training}
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs text-amber-950 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
          <Zap className="w-3.5 h-3.5 text-amber-700" />
          <span className="font-semibold">Live Prototype Mode</span>
        </div>
      </div>

      {/* 1. AI SMART CATALOGER TAB */}
      {activeSubTab === 'cataloger' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel: Sample craft selector & camera capture */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-800" />
                  Artisan Photo Capture Simulation
                </h3>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  MobileNetV2 &bull; &lt;180ms
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-4">
                In rural workshops, artisans simply point their smartphone camera. The model detects craft category, material alloy, regional GI certification, and hallmarks.
              </p>

              {/* Main image preview */}
              <div className="relative rounded-xl overflow-hidden bg-stone-950 aspect-[4/3] border border-stone-300 shadow-inner group">
                <CraftImage 
                  src={customImage || selectedCraft.imageUrl} 
                  alt={selectedCraft.name} 
                  fallbackCategory={`${selectedCraft.originState} • ${selectedCraft.category}`}
                  badgeText={selectedCraft.giTagNumber}
                  className={`w-full h-full ${isAnalyzing ? 'scale-105 blur-xs' : ''}`}
                />

                {/* Simulated scanning animation overlay */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-amber-900/20 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                    <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mb-3"></div>
                    <span className="text-sm font-semibold tracking-wide font-mono">
                      Extracting Craft Features...
                    </span>
                    <span className="text-xs text-amber-200 font-mono mt-1">
                      TensorFlow MobileNetV2 Inference
                    </span>
                  </div>
                )}

                {/* Bounding Box & GI Tag HUD */}
                {!isAnalyzing && (
                  <div className="absolute inset-4 border-2 border-dashed border-amber-400/80 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                    <div className="flex justify-between items-start">
                      <span className="bg-amber-950/80 backdrop-blur-md text-amber-200 text-[10px] px-2 py-1 rounded font-mono border border-amber-500/40">
                        DETECTED: {selectedCraft.name.substring(0, 24)}...
                      </span>
                      <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] px-2 py-1 rounded font-mono border border-emerald-500/40 flex items-center gap-1">
                        <Award className="w-3 h-3" /> {selectedCraft.giTagNumber}
                      </span>
                    </div>
                    <div className="bg-black/70 backdrop-blur-md text-white text-[11px] p-1.5 rounded flex items-center justify-between font-mono">
                      <span>CONFIDENCE: {(selectedCraft.confidenceScore * 100).toFixed(1)}%</span>
                      <span className="text-amber-300">CLUSTER: {selectedCraft.originState}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Retrigger scan & Upload custom */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={triggerSimulateScan}
                  disabled={isAnalyzing}
                  className="flex-1 py-2 px-3 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                  id="re-scan-button"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Re-Run Vision Classifier
                </button>

                <label 
                  htmlFor={fileInputId} 
                  className="cursor-pointer py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Photo
                  <input 
                    id={fileInputId}
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
              </div>

              {/* Sample Craft Quick Switcher */}
              <div className="mt-5 pt-4 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                  Or Test Preset Indian Heritage Crafts:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CRAFT_SAMPLES.slice(0, 4).map((craft) => (
                    <button
                      key={craft.id}
                      onClick={() => handleSelectCraft(craft)}
                      className={`text-left p-2 rounded-lg border text-xs transition flex items-center gap-2 ${
                        selectedCraft.id === craft.id
                          ? 'border-amber-700 bg-amber-50 font-bold text-amber-950'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                      id={`select-craft-${craft.id}`}
                    >
                      <CraftImage 
                        src={craft.imageUrl} 
                        alt={craft.name} 
                        fallbackCategory={craft.originState}
                        className="w-8 h-8 rounded flex-shrink-0" 
                      />
                      <div className="truncate">
                        <div className="truncate font-semibold">{craft.name}</div>
                        <div className="text-[10px] text-stone-600">{craft.originState}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: AI Catalog Card & Multilingual Audio Readout */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
              {/* Header with GI certification tag */}
              <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    {selectedCraft.category} &bull; {selectedCraft.originState}
                  </span>
                  <h2 className="text-xl font-serif-heritage font-bold text-stone-900 mt-0.5">
                    {selectedCraft.name}
                  </h2>
                  <p className="text-sm font-medium text-amber-900/80">
                    {selectedCraft.regionalName}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Verified GI Tag: {selectedCraft.giTagNumber}
                  </div>
                  <span className="text-[10px] text-stone-600 mt-1 font-mono">
                    Cluster: {selectedCraft.cluster}
                  </span>
                </div>
              </div>

              {/* Audio Voice Synthesizer Card for Low-Literacy Artisans */}
              <div className="bg-gradient-to-r from-amber-950 to-stone-900 text-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
                      <Volume2 className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Voice Assistant for Rural Artisans
                      </h4>
                      <p className="text-[11px] text-stone-300">
                        Speaks in native dialect &bull; No reading or writing required
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleAudio}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                      isPlayingAudio 
                        ? 'bg-rose-600 text-white animate-pulse' 
                        : 'bg-amber-600 hover:bg-amber-500 text-white'
                    }`}
                    id="listen-audio-button"
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" /> Stop Audio
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" /> Listen in Native Voice
                      </>
                    )}
                  </button>
                </div>

                <blockquote className="text-xs text-stone-200 italic bg-black/30 p-3 rounded-lg border-l-2 border-amber-400">
                  "{selectedCraft.artisanVoiceQuote[currentLanguage] || selectedCraft.artisanVoiceQuote.en}"
                </blockquote>
                <div className="mt-2 text-right text-[11px] text-amber-200 font-medium">
                  &mdash; Master Craftsman {selectedCraft.artisanName} ({selectedCraft.artisanExperienceYears} yrs experience)
                </div>
              </div>

              {/* AI Identified Features & Hallmarks */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  Hallmarks Identified by Vision Model
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCraft.featuresDetected.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs bg-stone-50 border border-stone-200 p-2.5 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-stone-800 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Story & Lineage */}
              <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-xl">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-800" />
                  Artisanal Heritage & Craft Story
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {selectedCraft.story}
                </p>
              </div>

              {/* Quick Jump to Pricing Engine */}
              <div className="pt-2 flex justify-between items-center">
                <div className="text-xs text-stone-600">
                  Ready to calculate fair wage valuation for this craft?
                </div>
                <button
                  onClick={() => setActiveSubTab('pricing')}
                  className="px-4 py-2 bg-amber-900 hover:bg-amber-850 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                  id="jump-to-pricing-button"
                >
                  Proceed to Fair Pricing Engine
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FAIR PRICING ENGINE TAB */}
      {activeSubTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls: Material, Labor Hours, Living Wage Sliders */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-5">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-800" />
                  Scientific Cost & Fair-Wage Regressor
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Replaces arbitrary middleman exploitation with empirical cost + dignity living wage calculations.
                </p>
              </div>

              {/* Craft Selection reminder */}
              <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-600 uppercase font-semibold">Active Craft:</span>
                  <div className="text-xs font-bold text-stone-900">{selectedCraft.name}</div>
                </div>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono font-bold">
                  {selectedCraft.originState}
                </span>
              </div>

              {/* Slider 1: Raw Material Cost */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-700">Raw Materials & Fuel (₹):</span>
                  <span className="text-amber-900 font-mono font-bold">₹{materialCost.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="50"
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className="w-full accent-amber-800 cursor-pointer"
                  id="material-cost-slider"
                />
                <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                  <span>₹100 (Clay/wood)</span>
                  <span>₹5,000 (Silk/Brass)</span>
                  <span>₹10,000 (Zari/Gems)</span>
                </div>
              </div>

              {/* Slider 2: Crafting Hours */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-700">Artisan Crafting Labor (Hours):</span>
                  <span className="text-amber-900 font-mono font-bold">{laborHours} hrs ({Math.round(laborHours / 8)} full workdays)</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="120" 
                  step="1"
                  value={laborHours}
                  onChange={(e) => setLaborHours(Number(e.target.value))}
                  className="w-full accent-amber-800 cursor-pointer"
                  id="labor-hours-slider"
                />
                <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                  <span>2 hrs (Small toy)</span>
                  <span>24 hrs (Carving)</span>
                  <span>120 hrs (Jacquard Saree)</span>
                </div>
              </div>

              {/* Slider 3: Living Wage Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-700">Living Wage Rate (₹ / Hour):</span>
                  <span className="text-emerald-700 font-mono font-bold">₹{hourlyWage}/hr</span>
                </div>
                <input 
                  type="range" 
                  min="60" 
                  max="350" 
                  step="10"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                  id="hourly-wage-slider"
                />
                <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                  <span>₹60/hr (Subsistence)</span>
                  <span className="text-emerald-700 font-semibold">₹160/hr (Dignified Living)</span>
                  <span>₹350/hr (Master)</span>
                </div>
              </div>

              {/* Complexity Tier */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-stone-700 block">Artisanal Skill & Complexity Tier:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { tier: 1, label: 'Standard', desc: 'Baseline craft' },
                    { tier: 2, label: 'Intricate', desc: 'Specialized skill' },
                    { tier: 3, label: 'Masterpiece', desc: 'Museum / GI elite' }
                  ].map((item) => (
                    <button
                      key={item.tier}
                      onClick={() => setComplexity(item.tier)}
                      className={`p-2 rounded-lg border text-center transition ${
                        complexity === item.tier
                          ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                      id={`complexity-tier-${item.tier}`}
                    >
                      <div className="text-xs">{item.label}</div>
                      <div className="text-[10px] text-stone-600">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Math Breakdown Pill */}
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs space-y-1 text-stone-600">
                <div className="flex justify-between">
                  <span>Direct Labor Valuation:</span>
                  <span className="font-mono font-semibold text-stone-900">{laborHours}h × ₹{hourlyWage} = ₹{directLaborValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Raw Materials Allocation:</span>
                  <span className="font-mono font-semibold text-stone-900">₹{materialCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-1 font-bold text-stone-900">
                  <span>Artisan Base Remuneration:</span>
                  <span className="font-mono text-emerald-800">₹{artisanNetTakeHome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Comparison: Middleman Exploitation vs KarigarAI Direct */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    Model Comparison & Economic Justice
                  </span>
                  <h3 className="font-serif-heritage font-bold text-stone-900 text-lg">
                    Traditional Middleman vs SrijanSetu Direct Linkage
                  </h3>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2.5 py-1 rounded-full border border-emerald-300">
                    +{artisanWageLift}% Artisan Gain
                  </span>
                </div>
              </div>

              {/* Comparative Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Traditional Middleman Chain */}
                <div className="bg-stone-50 border border-rose-200/80 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wide flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Traditional Middleman Chain
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-900 px-2 py-0.5 rounded font-semibold">
                      Exploitative
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-black text-stone-900 font-mono">
                      ₹{middlemanRetail.toLocaleString()}
                    </div>
                    <div className="text-xs text-stone-600">Final Retail Price paid by City Buyer</div>
                  </div>

                  {/* Waterfall breakdown */}
                  <div className="space-y-2 text-xs pt-2 border-t border-stone-200">
                    <div className="flex justify-between items-center text-rose-800 font-semibold">
                      <span>Artisan Receives:</span>
                      <span className="font-mono text-sm">₹{traditionalArtisanPayout.toLocaleString()} ({(traditionalArtisanPayout / middlemanRetail * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Village Broker Markup:</span>
                      <span className="font-mono">₹{Math.round(middlemanRetail * 0.25).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Urban Wholesaler Markup:</span>
                      <span className="font-mono">₹{Math.round(middlemanRetail * 0.35).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Metro Boutique Cut:</span>
                      <span className="font-mono">₹{Math.round(middlemanRetail * 0.25).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-rose-50 border border-rose-200 p-2.5 rounded text-[11px] text-rose-900 font-medium">
                    Artisan receives barely subsistence wages (~₹35/hr), forcing monotonous production.
                  </div>
                </div>

                {/* KarigarAI Direct Model */}
                <div className="bg-amber-50/50 border-2 border-amber-700/80 rounded-xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> SrijanSetu Direct Fair Model
                    </span>
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
                      Fair Living Wage
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-black text-amber-950 font-mono">
                      ₹{fairDirectPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-emerald-800 font-semibold">
                      Buyer Saves {buyerSavingPercent}% vs Metro Showroom
                    </div>
                  </div>

                  {/* Waterfall breakdown */}
                  <div className="space-y-2 text-xs pt-2 border-t border-amber-200">
                    <div className="flex justify-between items-center text-emerald-800 font-bold bg-emerald-50/80 p-1 rounded">
                      <span>Artisan Take-Home Cash:</span>
                      <span className="font-mono text-sm">₹{artisanNetTakeHome.toLocaleString()} (90%)</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>India Post / ONDC Logistics:</span>
                      <span className="font-mono">₹{Math.round(fairDirectPrice * 0.06).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Platform Maintenance (4%):</span>
                      <span className="font-mono">₹{Math.round(fairDirectPrice * 0.04).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded text-[11px] text-emerald-900 font-semibold">
                    Artisan earns ₹{hourlyWage}/hr dignified wage. Monthly income doubles from ₹4,200 to ₹8,500+.
                  </div>
                </div>
              </div>

              {/* Visual Income Multiplier Bar */}
              <div className="p-4 bg-stone-900 text-white rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider">
                    Direct Artisan Take-Home Comparison (This Piece):
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    +₹{(artisanNetTakeHome - traditionalArtisanPayout).toLocaleString()} More Cash
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-stone-400">Traditional Middleman Payout:</span>
                      <span className="font-mono text-rose-400">₹{traditionalArtisanPayout.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (traditionalArtisanPayout / artisanNetTakeHome) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-amber-200 font-semibold">SrijanSetu Direct Fair Payout:</span>
                      <span className="font-mono text-emerald-400 font-bold">₹{artisanNetTakeHome.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveSubTab('forecast')}
                  className="px-4 py-2 bg-amber-900 hover:bg-amber-850 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                  id="pricing-to-forecast-button"
                >
                  View 30-Day Demand Forecast for This Craft
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DEMAND FORECASTER TAB */}
      {activeSubTab === 'forecast' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Predictive Intelligence (Missing in KalaSetu)
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                    ARIMA (1,1,1) Time-Series
                  </span>
                </div>
                <h3 className="text-xl font-serif-heritage font-bold text-stone-900 mt-1">
                  Seasonal Demand Forecasting & Inventory Guidance
                </h3>
                <p className="text-xs text-stone-600">
                  Predicts festival spikes (Diwali, Navratri, Weddings, Exports) 30-90 days in advance to eliminate monotonous distress overproduction.
                </p>
              </div>

              {/* Horizon Switcher */}
              <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
                <span className="text-stone-600 font-semibold px-2">Forecast Horizon:</span>
                <button
                  onClick={() => setForecastHorizon('30')}
                  className={`px-3 py-1 rounded font-bold transition ${
                    forecastHorizon === '30'
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                  id="horizon-30-btn"
                >
                  Next 30 Days (Oct-Nov)
                </button>
                <button
                  onClick={() => setForecastHorizon('90')}
                  className={`px-3 py-1 rounded font-bold transition ${
                    forecastHorizon === '90'
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                  id="horizon-90-btn"
                >
                  Next 90 Days (Q4 Peak)
                </button>
              </div>
            </div>

            {/* AI Production Guidance Banner */}
            <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-white p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    AI Production Advisory
                  </span>
                  <span className="text-xs text-amber-200 font-medium">
                    Cluster: {selectedCraft.cluster}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Diwali & Festive Surge Approaching: Produce {Math.round(selectedCraft.demandForecastNext30Days * 0.85)} Units by Oct 20
                </h4>
                <p className="text-xs text-stone-300">
                  Projected regional demand increases by <span className="text-emerald-400 font-bold">+{selectedCraft.demandGrowthRate}%</span> over the next 30 days. Stockout risk if unaddressed.
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 bg-black/40 px-4 py-3 rounded-lg border border-amber-600/30">
                <div className="text-center">
                  <div className="text-xs text-stone-400">Predicted Demand</div>
                  <div className="text-xl font-black text-amber-300 font-mono">
                    {selectedCraft.demandForecastNext30Days} units
                  </div>
                </div>
                <div className="w-px h-8 bg-stone-700"></div>
                <div className="text-center">
                  <div className="text-xs text-stone-400">Estimated Revenue</div>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    ₹{(selectedCraft.demandForecastNext30Days * selectedCraft.recommendedFairPrice).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive SVG Demand Chart */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-800" />
                  Monthly Order Volume (Historical vs ARIMA Prediction)
                </span>
                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <span className="w-3 h-3 bg-stone-400 rounded-sm"></span> Historical Actuals
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-800 font-bold">
                    <span className="w-3 h-3 bg-amber-800 rounded-sm"></span> ARIMA Predicted
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span> Festive Spike
                  </span>
                </div>
              </div>

              {/* Responsive SVG Chart Container */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 overflow-x-auto">
                <div className="min-w-[640px] h-64 relative">
                  {/* SVG Canvas */}
                  <svg className="w-full h-full" viewBox="0 0 700 240">
                    {/* Grid horizontal lines */}
                    {[0, 60, 120, 180].map((y, idx) => (
                      <g key={idx}>
                        <line x1="50" y1={y + 20} x2="680" y2={y + 20} stroke="#E5E7EB" strokeDasharray="3 3" />
                        <text x="15" y={y + 24} fill="#9CA3AF" fontSize="10" fontFamily="monospace">
                          {450 - idx * 100}
                        </text>
                      </g>
                    ))}

                    {/* Bars for historical */}
                    {DEMAND_FORECAST_SERIES.map((d, i) => {
                      const x = 70 + i * 50;
                      const isFuture = d.historical === null;
                      const val = isFuture ? d.predicted : d.historical;
                      const barHeight = (val / 450) * 180;
                      const y = 200 - barHeight;

                      return (
                        <g key={i} className="group cursor-pointer">
                          {/* Bar */}
                          <rect
                            x={x - 12}
                            y={y}
                            width="24"
                            height={barHeight}
                            rx="4"
                            fill={isFuture ? '#B45309' : '#9CA3AF'}
                            opacity={isFuture ? 0.9 : 0.6}
                            className="transition hover:opacity-100"
                          />

                          {/* Top value */}
                          <text
                            x={x}
                            y={y - 6}
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="bold"
                            fill={isFuture ? '#92400E' : '#4B5563'}
                            fontFamily="monospace"
                          >
                            {val}
                          </text>

                          {/* Month label on X axis */}
                          <text
                            x={x}
                            y="222"
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight={isFuture ? 'bold' : 'normal'}
                            fill={isFuture ? '#B45309' : '#6B7280'}
                          >
                            {d.month.split(' ')[0]}
                          </text>

                          {/* Festival indicator marker */}
                          {d.festival && (
                            <circle
                              cx={x}
                              cy="234"
                              r="3"
                              fill="#DC2626"
                              className="animate-pulse"
                            />
                          )}
                        </g>
                      );
                    })}

                    {/* Base axis */}
                    <line x1="50" y1="200" x2="680" y2="200" stroke="#9CA3AF" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* Festival Legend Table */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-xs">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5 text-rose-700">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    Oct-Nov: Diwali & Navratri
                  </div>
                  <p className="text-stone-600 mt-1">
                    Peak domestic gifting season. Demand expands +35% to +60% across brass, pottery, and textiles.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-xs">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5 text-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-700"></span>
                    Dec-Jan: Winter Weddings & Exports
                  </div>
                  <p className="text-stone-600 mt-1">
                    NRI visits and high-ticket trousseau purchases (Banarasi silk sarees, Pashmina stoles).
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-xs">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5 text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Feb: Surajkund International Fair
                  </div>
                  <p className="text-stone-600 mt-1">
                    Wholesale buyer tie-ups and institutional orders from luxury hospitality chains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. DIRECT BUYER MARKETPLACE TAB */}
      {activeSubTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-5">
            {/* Header & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Direct Artisan-to-Consumer Market Linkage
                </span>
                <h3 className="text-xl font-serif-heritage font-bold text-stone-900 mt-0.5">
                  Verified GI Artisan Marketplace
                </h3>
                <p className="text-xs text-stone-600">
                  Every product is directly linked to an artisan workshop with verified GI tag certificates and 100% price transparency.
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
                {['all', 'Odisha', 'Bihar', 'Rajasthan', 'Uttar Pradesh', 'Karnataka'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setMarketFilter(st)}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      marketFilter === st
                        ? 'bg-amber-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                    id={`filter-${st}`}
                  >
                    {st === 'all' ? 'All Heritage Clusters' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCrafts.map((craft) => {
                const savings = craft.traditionalMiddlemanRetailPrice - craft.recommendedFairPrice;
                const savingsPercent = Math.round((savings / craft.traditionalMiddlemanRetailPrice) * 100);

                return (
                  <div 
                    key={craft.id}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Image container with GI Badge */}
                      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                        <CraftImage 
                          src={craft.imageUrl} 
                          alt={craft.name} 
                          fallbackCategory={`${craft.originState} • ${craft.category}`}
                          badgeText={craft.giTagNumber}
                          className="w-full h-full group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="bg-amber-950/90 backdrop-blur-md text-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-400/40">
                            <Award className="w-3.5 h-3.5 text-amber-300" />
                            GI Tag: {craft.giTagNumber}
                          </span>
                        </div>

                        <div className="absolute bottom-3 right-3">
                          <span className="bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/40">
                            Save {savingsPercent}% vs Retail
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div>
                          <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                            {craft.category} &bull; {craft.originState}
                          </span>
                          <h4 className="font-bold text-stone-900 text-base leading-snug">
                            {craft.name}
                          </h4>
                          <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                            {craft.story}
                          </p>
                        </div>

                        {/* Artisan Badge */}
                        <div className="flex items-center gap-2.5 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs">
                          <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-100 font-bold flex items-center justify-center text-xs flex-shrink-0">
                            {craft.artisanName.charAt(0)}
                          </div>
                          <div className="truncate">
                            <div className="font-bold text-stone-900 truncate">{craft.artisanName}</div>
                            <div className="text-[10px] text-stone-600">{craft.cluster} &bull; {craft.artisanExperienceYears} yrs experience</div>
                          </div>
                        </div>

                        {/* Price Transparency Breakdown */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-xl font-black text-amber-950 font-mono">
                                ₹{craft.recommendedFairPrice.toLocaleString()}
                              </span>
                              <span className="text-xs text-stone-600 line-through ml-2 font-mono">
                                ₹{craft.traditionalMiddlemanRetailPrice.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              Direct Price
                            </span>
                          </div>

                          {/* Where your money goes badge */}
                          <div className="bg-amber-50/80 border border-amber-200 p-2 rounded text-[11px] space-y-1 text-amber-950">
                            <div className="flex justify-between font-semibold">
                              <span>To Artisan {craft.artisanName.split(' ')[0]}:</span>
                              <span className="font-mono text-emerald-800 font-bold">
                                ₹{Math.round(craft.recommendedFairPrice * 0.92).toLocaleString()} (92%)
                              </span>
                            </div>
                            <div className="flex justify-between text-stone-600 text-[10px]">
                              <span>India Post / Logistics:</span>
                              <span className="font-mono">₹{Math.round(craft.recommendedFairPrice * 0.08).toLocaleString()} (8%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => alert(`Direct Order inquiry initiated for "${craft.name}" with Artisan ${craft.artisanName}. Direct UPI Escrow & India Post shipping label generation simulated.`)}
                        className="w-full py-2 px-3 rounded-lg bg-amber-900 hover:bg-amber-850 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                        id={`order-btn-${craft.id}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Direct Order (Bypass Middlemen)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. MODEL TRAINING & DATASET FINE-TUNING TAB */}
      {activeSubTab === 'training' && (
        <ModelTrainingView currentLanguage={currentLanguage} />
      )}
    </div>
  );
};
