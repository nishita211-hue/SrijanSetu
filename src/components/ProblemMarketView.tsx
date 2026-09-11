import React from 'react';
import { 
  TrendingUp, 
  AlertOctagon, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  EyeOff, 
  WifiOff, 
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { 
  MARKET_STATISTICS, 
  MIDDLEMAN_WATERFALL, 
  DIRECT_MODEL_COMPARISON, 
  COMPETITIVE_MATRIX 
} from '../data/marketData';

export const ProblemMarketView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Overview */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Empirical Reality
            </span>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
              National Heritage Initiative
            </span>
          </div>
          <h2 className="text-2xl font-serif-heritage font-bold text-stone-900">
            Market Data, Economic Asymmetry & Heritage Crisis
          </h2>
          <p className="text-xs text-stone-600 max-w-2xl">
            Why 6.5 million master artisans earn less than ₹5,000 per month despite powering a ₹40,500 Crore market—and how AI market linkage bridges the divide.
          </p>
        </div>
      </div>

      {/* 4 Core Macro Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
            Total Indian Artisans
          </span>
          <div className="text-2xl font-black text-amber-950 font-mono">
            {MARKET_STATISTICS.totalArtisans}
          </div>
          <p className="text-xs text-stone-600">
            Concentrated in UP, Rajasthan, Assam, Odisha, Bengal, and Tamil Nadu.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-rose-200 p-5 shadow-sm space-y-1 bg-rose-50/20">
          <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
            Severe Income Poverty
          </span>
          <div className="text-2xl font-black text-rose-900 font-mono">
            {MARKET_STATISTICS.artisansBelowPovertyLine}
          </div>
          <p className="text-xs text-rose-950 font-medium">
            Poverty-level wages despite contributing billions to India’s export basket.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
            Handicrafts Market (2025)
          </span>
          <div className="text-2xl font-black text-stone-900 font-mono">
            {MARKET_STATISTICS.handicraftMarketSize2025}
          </div>
          <p className="text-xs text-stone-600">
            Projected to expand to USD 8.29 Billion (~₹69,000 Cr) by 2034 (IMARC).
          </p>
        </div>

        <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm space-y-1 bg-emerald-50/20">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Projected AI Impact
          </span>
          <div className="text-2xl font-black text-emerald-900 font-mono">
            {MARKET_STATISTICS.projectedIncomeLift}
          </div>
          <p className="text-xs text-emerald-950 font-medium">
            Lifting monthly wages from ₹3,000-5,000 to ₹7,000-9,000+ per household.
          </p>
        </div>
      </div>

      {/* The Middleman Exploitation Waterfall (The 10x Markup Trap) */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Supply Chain Leakage
          </span>
          <h3 className="text-lg font-serif-heritage font-bold text-stone-900 mt-0.5">
            The Middleman Waterfall: How a ₹1,000 Craft Becomes ₹10,000 Retail
          </h3>
          <p className="text-xs text-stone-600">
            In India, intermediaries traditionally claim 60% to 200% markups. 88% of artisans in Gujarat cite middleman exploitation as their #1 barrier.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {MIDDLEMAN_WATERFALL.map((step, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border space-y-2 flex flex-col justify-between ${
                idx === 0 
                  ? 'bg-rose-50/80 border-rose-300' 
                  : idx === 3 
                  ? 'bg-amber-950 text-white border-amber-900' 
                  : 'bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              <div className="space-y-1">
                <span className={`text-[10px] font-mono font-bold uppercase ${idx === 3 ? 'text-amber-300' : 'text-stone-600'}`}>
                  {step.step}
                </span>
                <h4 className={`text-sm font-bold ${idx === 3 ? 'text-white' : 'text-stone-900'}`}>
                  {step.party}
                </h4>
                <div className={`text-xl font-black font-mono pt-1 ${idx === 0 ? 'text-rose-900' : idx === 3 ? 'text-amber-300' : 'text-stone-900'}`}>
                  ₹{step.costOrPrice.toLocaleString()}
                </div>
                <p className={`text-xs ${idx === 3 ? 'text-stone-300' : 'text-stone-600'}`}>
                  {step.markup}
                </p>
              </div>

              <div className={`pt-2 border-t text-[11px] font-medium ${idx === 3 ? 'border-amber-800 text-amber-200' : 'border-stone-200 text-stone-600'}`}>
                Artisan Share: <strong>{step.percentageOfRetail}</strong> of final retail
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Takeaway Note */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs flex items-start gap-3 text-amber-950">
          <AlertCircle className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">The Information Asymmetry Trap:</strong>
            Because artisans operate in complete information darkness with zero market visibility, they have no pricing power. Middlemen dictate purchase prices unilaterally and leave artisans with barely ₹1,000 for days of laborious master craft, while reselling to urban boutiques for ₹10,000.
          </div>
        </div>
      </div>

      {/* The 7 Core Systemic Breakdowns */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Root Cause Analysis
          </span>
          <h3 className="text-lg font-serif-heritage font-bold text-stone-900 mt-0.5">
            The 7 Systemic Crises Facing Indian Handicrafts
          </h3>
          <p className="text-xs text-stone-600">
            Why traditional interventions fail and how SrijanSetu specifically dismantles each blocker.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <Users className="w-4 h-4 text-amber-800" />
              1. Heritage & Cultural Decline
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              6.5M artisans preserve 4,000-year traditions (Dhokra, Madhubani). Dwindling incomes force younger generations into unorganized urban manual labor, extinguishing unique GI art forms forever.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <AlertOctagon className="w-4 h-4 text-rose-800" />
              2. Predatory Middleman Monopolies
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Village traders exploit lack of transport and immediate cash needs, pocketing 60% to 200% margins and giving artisans only 10% of retail worth.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <DollarSign className="w-4 h-4 text-amber-800" />
              3. Income Crisis vs Market Boom
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              66% of handloom weavers earn under ₹5,000/month, even while India’s handicraft economy commands ₹40,500 Crore and grows toward ₹69,000 Crore.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <EyeOff className="w-4 h-4 text-amber-800" />
              4. Complete Information Asymmetry
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Artisans have zero visibility into city consumer tastes, seasonal surges, or fair pricing. They produce monotonous distress items to earn immediate cash.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <WifiOff className="w-4 h-4 text-amber-800" />
              5. Digital & Logistics Exclusion
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              High shipping logistics, lack of English digital literacy, and complex cataloging forms keep rural artisans off e-commerce platforms like Amazon or Etsy.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <Layers className="w-4 h-4 text-amber-800" />
              6. Skills & Tooling Void
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              No scientific pricing models, no demand forecasting, and zero inventory guidance leave artisans vulnerable to sudden raw material inflation and unsold inventory.
            </p>
          </div>
        </div>
      </div>

      {/* Competitive Matrix: IndiaHandmade vs Amazon Karigar vs KalaSetu vs SrijanSetu */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Competitive Landscape
          </span>
          <h3 className="text-lg font-serif-heritage font-bold text-stone-900 mt-0.5">
            Competitive Differentiation: Why Existing Solutions Fall Short
          </h3>
          <p className="text-xs text-stone-600">
            Marketplaces are passive distribution channels; enterprise AI tools (Prediko, Blue Yonder) are unaffordable; and hackathon peers (KalaSetu) miss demand forecasting entirely.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-700">
                <th className="py-3 px-4 font-bold uppercase tracking-wider">Capability</th>
                <th className="py-3 px-4 font-semibold">IndiaHandmade (Govt)</th>
                <th className="py-3 px-4 font-semibold">Amazon Karigar</th>
                <th className="py-3 px-4 font-semibold">KalaSetu</th>
                <th className="py-3 px-4 font-bold text-amber-900 bg-amber-50/80">SrijanSetu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {COMPETITIVE_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50/60 transition">
                  <td className="py-3 px-4 font-bold text-stone-900">
                    {row.feature}
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    {row.indiaHandmade}
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    {row.amazonKarigar}
                  </td>
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    {row.kalaSetu}
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-950 bg-amber-50/50">
                    {row.srijanSetu}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
