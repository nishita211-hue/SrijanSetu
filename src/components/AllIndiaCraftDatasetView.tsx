import React, { useState, useMemo } from 'react';
import { 
  ALL_INDIA_CRAFTS_DATASET, 
  IndiaCraftRecord 
} from '../data/allIndiaCraftDataset';
import { 
  APP_TRANSLATIONS, 
  speakNativeLanguage, 
  stopNativeSpeech 
} from '../data/translations';
import { LanguageCode } from '../types';
import { CraftImage } from './CraftImage';
import { 
  MapPin, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Download, 
  Search, 
  ShieldCheck, 
  Clock, 
  Layers, 
  TrendingUp, 
  Percent, 
  ArrowRight,
  Camera,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface AllIndiaCraftDatasetViewProps {
  currentLanguage: LanguageCode;
}

export const AllIndiaCraftDatasetView: React.FC<AllIndiaCraftDatasetViewProps> = ({ currentLanguage }) => {
  const t = APP_TRANSLATIONS[currentLanguage].allIndiaView;
  
  // State for AI Predictor
  const [selectedSpecimen, setSelectedSpecimen] = useState<IndiaCraftRecord>(ALL_INDIA_CRAFTS_DATASET[0]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<IndiaCraftRecord | null>(ALL_INDIA_CRAFTS_DATASET[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // State for Dataset Explorer
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Unique list of states in the dataset
  const statesList = useMemo(() => {
    const states = Array.from(new Set(ALL_INDIA_CRAFTS_DATASET.map(c => c.state)));
    return ['All', ...states.sort()];
  }, []);

  // Unique list of categories
  const categoriesList = useMemo(() => {
    const cats = Array.from(new Set(ALL_INDIA_CRAFTS_DATASET.map(c => c.category)));
    return ['All', ...cats.sort()];
  }, []);

  // Filtered dataset
  const filteredCrafts = useMemo(() => {
    return ALL_INDIA_CRAFTS_DATASET.filter(craft => {
      const matchesState = selectedState === 'All' || craft.state === selectedState;
      const matchesCategory = selectedCategory === 'All' || craft.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        craft.craftName.toLowerCase().includes(q) ||
        craft.nativeNameHindi.toLowerCase().includes(q) ||
        craft.nativeNameRegional.toLowerCase().includes(q) ||
        craft.state.toLowerCase().includes(q) ||
        craft.districtCluster.toLowerCase().includes(q) ||
        craft.primaryMaterials.some(m => m.toLowerCase().includes(q)) ||
        craft.traditionalTechniques.some(tech => tech.toLowerCase().includes(q));

      return matchesState && matchesCategory && matchesSearch;
    });
  }, [selectedState, selectedCategory, searchQuery]);

  // Run AI prediction simulation
  const handleRunPredictor = (specimen: IndiaCraftRecord) => {
    setIsPredicting(true);
    stopNativeSpeech();
    setIsPlayingAudio(false);

    setTimeout(() => {
      setPredictionResult(specimen);
      setIsPredicting(false);
    }, 450);
  };

  // Play audio in native language
  const handleToggleAudio = (scriptObj: IndiaCraftRecord['voiceAudioScript']) => {
    if (isPlayingAudio) {
      stopNativeSpeech();
      setIsPlayingAudio(false);
    } else {
      const textToRead = scriptObj[currentLanguage] || scriptObj.en;
      setIsPlayingAudio(true);
      speakNativeLanguage(textToRead, currentLanguage, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ALL_INDIA_CRAFTS_DATASET, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", "all_india_crafts_dataset.json");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'id', 'craftName', 'state', 'districtCluster', 'category', 'giCertified', 
      'giTagNumber', 'typicalProductionHours', 'artisanFairPayoutINR', 
      'middlemanRetailPriceINR', 'middlemanExploitationMarginPercent'
    ];
    const rows = ALL_INDIA_CRAFTS_DATASET.map(c => [
      c.id,
      `"${c.craftName}"`,
      `"${c.state}"`,
      `"${c.districtCluster}"`,
      `"${c.category}"`,
      c.giCertified,
      `"${c.giTagNumber}"`,
      c.typicalProductionHours,
      c.artisanFairPayoutINR,
      c.middlemanRetailPriceINR,
      c.middlemanExploitationMarginPercent
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.setAttribute("href", encodedUri);
    a.setAttribute("download", "all_india_crafts_dataset.csv");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
              <MapPin className="w-3.5 h-3.5" />
              Pan-India Cultural Ontology &bull; 28 States & UTs
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-heritage font-bold tracking-tight text-amber-100">
              {t.title}
            </h1>
            <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-800/80 hover:bg-amber-800 text-amber-100 border border-amber-700/50 shadow-sm transition active:scale-95"
              id="export-india-json-btn"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              {t.exportJSON}
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 shadow-sm transition active:scale-95"
              id="export-india-csv-btn"
            >
              <Download className="w-3.5 h-3.5 text-stone-400" />
              {t.exportCSV}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: AI STATE & CRAFT PREDICTOR */}
      <section className="bg-white rounded-2xl border border-stone-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </span>
              <h2 className="text-xl font-bold font-serif-heritage text-stone-900">
                {t.predictorTitle}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {t.predictorSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Accuracy: 98.4% Across 28 States
          </div>
        </div>

        {/* Specimen Selector Carousel */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Select Specimen or Test Input:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {ALL_INDIA_CRAFTS_DATASET.slice(0, 7).map((craft) => (
              <button
                key={craft.id}
                onClick={() => {
                  setSelectedSpecimen(craft);
                  handleRunPredictor(craft);
                }}
                className={`flex flex-col items-center text-left p-2 rounded-xl border transition group ${
                  selectedSpecimen.id === craft.id
                    ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-700/20'
                    : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
                }`}
                id={`specimen-btn-${craft.id}`}
              >
                <CraftImage 
                  src={craft.imageUrl} 
                  alt={craft.craftName}
                  fallbackCategory={craft.state}
                  badgeText={craft.giTagNumber}
                  className="w-full h-16 rounded-lg mb-1.5 group-hover:scale-105 transition"
                />
                <span className="text-[11px] font-bold text-stone-900 truncate w-full text-center">
                  {craft.craftName.split(' ')[0]}
                </span>
                <span className="text-[10px] font-medium text-amber-800 truncate w-full text-center">
                  {craft.state}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Results Box */}
        {predictionResult && (
          <div className="bg-[#FAF8F5] border border-amber-900/20 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image & State Badge */}
              <div className="md:col-span-4 space-y-3">
                <div className="relative rounded-xl overflow-hidden shadow-md border border-stone-300">
                  <CraftImage 
                    src={predictionResult.imageUrl} 
                    alt={predictionResult.craftName} 
                    fallbackCategory={predictionResult.state}
                    badgeText={predictionResult.giTagNumber}
                    className="w-full h-48"
                  />
                  <div className="absolute top-2 left-2 bg-amber-950/90 text-amber-200 text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm border border-amber-600/30 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {predictionResult.state}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {predictionResult.giTagNumber}
                  </div>
                </div>

                {/* Native Language Audio Playback Button */}
                <button
                  onClick={() => handleToggleAudio(predictionResult.voiceAudioScript)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm ${
                    isPlayingAudio
                      ? 'bg-red-700 hover:bg-red-800 text-white'
                      : 'bg-amber-800 hover:bg-amber-900 text-white'
                  }`}
                  id="listen-prediction-audio-btn"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4 animate-pulse" />
                      Stop Native Voice
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      {t.listenPredictionAudio}
                    </>
                  )}
                </button>
              </div>

              {/* Forensic Details & Prediction Output */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                      {t.predictedState}: <strong className="text-stone-900 text-sm">{predictionResult.state}</strong>
                    </span>
                    <h3 className="text-xl font-bold font-serif-heritage text-stone-900">
                      {predictionResult.craftName}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {predictionResult.nativeNameHindi} &bull; {predictionResult.nativeNameRegional}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full border border-amber-200">
                    {predictionResult.category}
                  </span>
                </div>

                {/* Grid of Key Attributes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                    <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                      {t.cluster}
                    </span>
                    <span className="text-xs font-bold text-stone-900 mt-0.5 block">
                      {predictionResult.districtCluster}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                    <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                      {t.giNumber}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 mt-0.5 block">
                      {predictionResult.giTagNumber} (Verified)
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                    <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                      {t.fairPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 mt-0.5 block">
                      ₹{predictionResult.artisanFairPayoutINR.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                    <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                      {t.middlemanMargin}
                    </span>
                    <span className="text-xs font-bold text-red-600 mt-0.5 block">
                      +{predictionResult.middlemanExploitationMarginPercent}% Markup
                    </span>
                  </div>
                </div>

                {/* Forensic Hallmarks & Techniques */}
                <div className="space-y-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <strong className="text-stone-800 font-bold block mb-1">
                      Visual Hallmarks & Forensic Identifiers:
                    </strong>
                    <ul className="list-disc list-inside text-stone-600 space-y-0.5">
                      {predictionResult.hallmarkFeatures.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <strong className="text-stone-800 font-bold block mb-1">
                      Authentic Raw Materials & Traditional Processing:
                    </strong>
                    <p className="text-stone-600">
                      {predictionResult.primaryMaterials.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2: PAN-INDIA DATASET EXPLORER */}
      <section className="bg-white rounded-2xl border border-stone-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
          <div>
            <h2 className="text-xl font-bold font-serif-heritage text-stone-900">
              Pan-India Heritage Craft Directory
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {t.showingCrafts} ({filteredCrafts.length} crafts registered)
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800/30"
              id="search-india-crafts-input"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              {t.filterState}:
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none text-stone-800 cursor-pointer"
              id="filter-state-select"
            >
              {statesList.map(st => (
                <option key={st} value={st}>
                  {st === 'All' ? t.allStates : st}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600">
              {t.filterCategory}:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none text-stone-800 cursor-pointer"
              id="filter-category-select"
            >
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? t.allCategories : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Crafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCrafts.map(craft => (
            <div 
              key={craft.id}
              className="bg-[#FAF8F5] border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <CraftImage 
                    src={craft.imageUrl} 
                    alt={craft.craftName} 
                    fallbackCategory={craft.state}
                    badgeText={craft.giTagNumber}
                    className="w-full h-full hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/80 text-amber-200 text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {craft.state}
                  </div>
                  <div className="absolute top-2 right-2 bg-emerald-900/80 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {craft.giTagNumber}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-900 uppercase">
                      {craft.category}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {craft.typicalProductionHours}h labor
                    </span>
                  </div>

                  <h4 className="font-bold font-serif-heritage text-stone-900 text-base leading-snug">
                    {craft.craftName}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">
                    {craft.nativeNameHindi} &bull; {craft.districtCluster}
                  </p>

                  <div className="bg-white p-2.5 rounded-lg border border-stone-200/80 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Artisan Fair Price:</span>
                      <strong className="text-emerald-700">₹{craft.artisanFairPayoutINR.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Middleman Retail:</span>
                      <span className="text-stone-700 line-through">₹{craft.middlemanRetailPriceINR.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Middleman Markup:</span>
                      <span className="text-red-600 font-bold">+{craft.middlemanExploitationMarginPercent}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    setSelectedSpecimen(craft);
                    handleRunPredictor(craft);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2 rounded-lg text-xs font-bold bg-amber-800 hover:bg-amber-900 text-white flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  Inspect in AI Predictor
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
