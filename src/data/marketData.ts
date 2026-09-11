import { CraftSample } from '../types';

export const MARKET_STATISTICS = {
  totalArtisans: '64.66 Lakh (6.5 Million)',
  handicraftMarketSize2025: 'USD 4.85 Billion (~₹40,500 Crore)',
  handicraftMarketSize2034: 'USD 8.29 Billion (~₹69,000 Crore)',
  artisansBelowPovertyLine: '66% earn < ₹5,000 / month',
  middlemanProfitMargin: '60% - 200% claimed by intermediaries',
  artisanRetailShare: 'Only 10% - 15% of final retail price',
  gujaratArtisanStudy: '88% cite middlemen as primary barrier to livelihood',
  projectedIncomeLift: '40% - 80% direct net margin improvement'
};

export const MIDDLEMAN_WATERFALL = [
  {
    step: '1. Artisan Workshop',
    party: 'Rural Craftsperson',
    costOrPrice: 1000,
    markup: 'Baseline production cost & subsistence labor',
    timeTaken: '3-5 days manual labor',
    percentageOfRetail: '10%'
  },
  {
    step: '2. Village Trader / Aggregator',
    party: 'Middleman 1 (Local Broker)',
    costOrPrice: 2000,
    markup: '+100% markup (Buys on distress credit)',
    timeTaken: 'Immediate cash loan leverage',
    percentageOfRetail: '20%'
  },
  {
    step: '3. Regional Wholesaler / Exporter',
    party: 'Middleman 2 (Urban Distributor)',
    costOrPrice: 4000,
    markup: '+100% markup (Consolidation & transit)',
    timeTaken: 'Warehouse batching',
    percentageOfRetail: '40%'
  },
  {
    step: '4. Metro Showroom / Luxury Retail',
    party: 'Urban Retailer / Boutique',
    costOrPrice: 10000,
    markup: '+150% markup (Branding & storefront)',
    timeTaken: 'Retail markup',
    percentageOfRetail: '100%'
  }
];

export const DIRECT_MODEL_COMPARISON = {
  artisanCost: 1000,
  fairLaborWage: 1800, // Artisan gets paid fair living wage
  materialCost: 700,
  platformFee: 200, // 5% micro fee for hosting/payment gateway
  logisticsDelivery: 450,
  finalBuyerPrice: 3150,
  artisanNetTakeHome: 2500, // vs ₹1000 in traditional
  buyerSavings: '68% cheaper than metro luxury retail (₹3,150 vs ₹10,000)',
  artisanEarningsMultiplier: '2.5x higher income (₹2,500 vs ₹1,000)'
};

export const COMPETITIVE_MATRIX = [
  {
    feature: 'Target User',
    indiaHandmade: 'Government certified GI sellers',
    amazonKarigar: 'Established clusters with GST',
    kalaSetu: 'Rural B2B artisans',
    srijanSetu: 'Independent rural artisans & small SHGs'
  },
  {
    feature: 'AI Product Cataloging',
    indiaHandmade: '❌ Manual entry (English forms)',
    amazonKarigar: '❌ Seller self-onboarding',
    kalaSetu: '✅ Photo enhancement + basic voice',
    srijanSetu: '✅ MobileNetV2 auto-classify + GI tag verification + multilingual specs'
  },
  {
    feature: 'Fair Pricing Engine',
    indiaHandmade: '❌ Artisan sets arbitrary price',
    amazonKarigar: '❌ Algorithm sets discount pricing',
    kalaSetu: '⚠️ Basic wage-hour calculation',
    srijanSetu: '✅ Cost + RandomForest regression (raw materials, craft tier, market elasticity)'
  },
  {
    feature: 'Demand Forecasting',
    indiaHandmade: '❌ None',
    amazonKarigar: '❌ Internal enterprise only',
    kalaSetu: '❌ None',
    srijanSetu: '✅ ARIMA time-series with festival peaks (Diwali, Wedding seasons, Exports)'
  },
  {
    feature: 'Inventory & Batch Guidance',
    indiaHandmade: '❌ None',
    amazonKarigar: '❌ Strict warehouse penalties',
    kalaSetu: '❌ None',
    srijanSetu: '✅ Recommended batch production schedule (prevents monotonous overproduction)'
  },
  {
    feature: 'Language & Literacy Barrier',
    indiaHandmade: 'English & Hindi text only',
    amazonKarigar: 'Complex seller portal',
    kalaSetu: 'Voice in 6 languages',
    srijanSetu: 'Voice-guided UI in 5+ Indian languages with audio readout'
  },
  {
    feature: 'Intermediary Commission',
    indiaHandmade: '0% (Govt sponsored)',
    amazonKarigar: '8% - 15% referral fee',
    kalaSetu: 'B2B subscription / commission',
    srijanSetu: '0% commission for artisans, 3-5% nominal buyer logistics fee'
  }
];

export const CRAFT_SAMPLES: CraftSample[] = [
  {
    id: 'madhubani-sun-fish',
    name: 'Mithila Handpainted Kohbar Canvas',
    regionalName: 'मिथिला मधुबनी कोहबर पेंटिंग',
    category: 'Folk Art & Canvas',
    originState: 'Bihar',
    cluster: 'Ranti & Jitwarpur (Madhubani)',
    giCertified: true,
    giTagNumber: 'GI-IN-0016',
    baseMaterialCost: 420,
    laborHours: 26,
    artisanBaseRatePerHour: 150,
    traditionalMiddlemanRetailPrice: 8500,
    artisanActualMiddlemanPayout: 1200,
    recommendedFairPrice: 4600,
    demandForecastNext30Days: 215,
    demandGrowthRate: 42.1,
    confidenceScore: 0.97,
    featuresDetected: ['Natural bamboo quill strokes', 'Vegetable cow-dung pigment base', 'Double-line geometric borders', 'Fish & Lotus fertility motifs'],
    imageUrl: '/images/crafts/folk-art-madhubani.jpg',
    artisanName: 'Sunita Devi',
    artisanExperienceYears: 19,
    artisanVoiceQuote: {
      en: 'Middlemen would pick up 10 canvases for ₹10,000 total and resell them in Delhi galleries for ₹80,000. Now we know our market value.',
      hi: 'बिचौलिए हमसे ₹10,000 में 10 पेंटिंग ले जाकर दिल्ली की गैलरी में ₹80,000 में बेचते थे। अब हम अपनी कला की सही कीमत तय करते हैं।',
      gu: 'દલાલો અમારી પાસેથી ૧૦ પેઇન્ટિંગ ₹૧૦,૦૦૦માં લઈને શહેરમાં ₹૮૦,૦૦૦માં વેચતા હતા. હવે અમે અમારો સાચો ભાવ જાણીએ છીએ.',
      bn: 'দালালরা আমাদের কাজ নামমাত্র দামে নিয়ে শহরের আর্ট গ্যালারিতে বহুগুণ দামে বিক্রি করত। এখন আমরা ন্যায্য মূল্য পাই।',
      ta: 'இடைத்தரகர்கள் எங்களிடம் மிகக் குறைந்த விலையில் வாங்கி பெரிய நகரங்களில் பல மடங்கு லாபத்திற்கு விற்றனர். இப்போது எங்களுக்கு நியாயமான விலை கிடைக்கிறது.'
    },
    story: 'Painted using natural mineral pigments, soot, turmeric, and marigold extracts using twig tips and fountain nibs on handmade cotton rag paper.'
  },
  {
    id: 'jaipur-blue-pottery-vase',
    name: 'Turquoise Blue Pottery Floral Vase',
    regionalName: 'जयपुर ब्लू पॉटरी गुलदस्ता',
    category: 'Ceramics & Pottery',
    originState: 'Rajasthan',
    cluster: 'Sanganer & Kot Jewar (Jaipur)',
    giCertified: true,
    giTagNumber: 'GI-IN-0027',
    baseMaterialCost: 550,
    laborHours: 14,
    artisanBaseRatePerHour: 175,
    traditionalMiddlemanRetailPrice: 6200,
    artisanActualMiddlemanPayout: 950,
    recommendedFairPrice: 3250,
    demandForecastNext30Days: 180,
    demandGrowthRate: 35.0,
    confidenceScore: 0.92,
    featuresDetected: ['Quartz stone dough glaze (No clay)', 'Copper oxide turquoise hue', 'Mughal-Persian arabesque florets', 'Low temperature wood kiln fire'],
    imageUrl: '/images/crafts/blue-pottery-vase.jpg',
    artisanName: 'Gopal Lal Kumhar',
    artisanExperienceYears: 31,
    artisanVoiceQuote: {
      en: 'Tourists bought our vases for thousands, but we only got daily wages barely covering flour and fire. This AI pricing protects our master craft.',
      hi: 'पर्यटक हमारी कृतियों को हजारों में खरीदते थे पर हमें दिन की मजदूरी भी मुश्किल से मिलती थी। अब यह तकनीक हमें आत्मनिर्भर बनाती है।',
      gu: 'પર્યટકો હજારો રૂપિયા ખર્ચતા હતા પણ કારીગરોને નજીવો ફાયદો મળતો હતો. હવે AI અમને સાચો નફો આપે છે.',
      bn: 'পর্যটকরা চড়া দামে কিনলেও শিল্পীরা সামান্য মজুরি পেতেন। এখন আমরা যথাযথ পারিশ্রমিক ও সম্মান পাচ্ছি।',
      ta: 'சுற்றுலாப் பயணிகள் ஆயிரக்கணக்கில் பணம் செலுத்தினாலும், கைவினைஞர்களுக்கு சொற்ப கூலியே கிடைத்தது. இப்போது AI சரியான லாபத்தை உறுதி செய்கிறது.'
    },
    story: 'Crafted without clay, using a paste of ground quartz stone, Fuller’s earth, glass, and gum. Painted with cobalt and copper oxide before glazing.'
  },
  {
    id: 'banarasi-katan-silk-saree',
    name: 'Pure Katan Silk Handwoven Saree',
    regionalName: 'बनारसी कतान सिल्क हथकरघा साड़ी',
    category: 'Handloom Textiles',
    originState: 'Uttar Pradesh',
    cluster: 'Varanasi (Peeli Kothi)',
    giCertified: true,
    giTagNumber: 'GI-IN-0099',
    baseMaterialCost: 3200,
    laborHours: 72,
    artisanBaseRatePerHour: 180,
    traditionalMiddlemanRetailPrice: 38000,
    artisanActualMiddlemanPayout: 6500,
    recommendedFairPrice: 17500,
    demandForecastNext30Days: 95,
    demandGrowthRate: 51.2,
    confidenceScore: 0.98,
    featuresDetected: ['Pure mulberry Katan silk warp/weft', 'Zari brocade Kalga paisley butis', 'Hand Jacquard drawboy shuttle weave', 'Double-sided interlocking selvedge'],
    imageUrl: '/images/crafts/banarasi-silk.jpg',
    artisanName: 'Mohammad Rais Ansari',
    artisanExperienceYears: 35,
    artisanVoiceQuote: {
      en: 'It takes 15 days of continuous handloom weaving to finish this saree. Middlemen pay ₹6,500 and sell for ₹38,000 in Mumbai. Direct linkage gives me ₹17,500.',
      hi: 'एक साड़ी बुनने में 15 दिन लगते हैं। गद्दीदार ₹6,500 देते थे और बड़े शोरूम में ₹38,000 में बेचते थे। अब मुझे ₹17,500 मिलते हैं।',
      gu: 'આ સાડી વણવામાં ૧૫ દિવસની મહેનત થાય છે. વચેટીયાઓ ₹૬,૫૦૦ આપતા હતા, હવે સીધા ₹૧૭,૫૦૦ મળે છે.',
      bn: '১৫ দিনের অক্লান্ত পরিশ্রমে এই শাড়ি বোনা হয়। আগে মাত্র ৬৫০০ পেতাম, এখন সরাসরি ১৭৫০০ টাকা পাই।',
      ta: 'இந்த புடவையை நெய்ய 15 நாட்கள் ஆகும். இடைத்தரகர்கள் ₹6,500 கொடுத்தனர், இப்போது எனக்கு ₹17,500 கிடைக்கிறது.'
    },
    story: 'Woven on traditional pit looms in Varanasi. The intricate Jangla and Konia patterns are passed down from master weavers through oral traditions.'
  },
  {
    id: 'channapatna-wooden-toy',
    name: 'Natural Lacquer Wooden Stacking Tower',
    regionalName: 'चन्नापटना लकड़ी के खिलौने',
    category: 'Woodcraft & Toys',
    originState: 'Karnataka',
    cluster: 'Channapatna (Gombegala Ooru)',
    giCertified: true,
    giTagNumber: 'GI-IN-0023',
    baseMaterialCost: 280,
    laborHours: 6,
    artisanBaseRatePerHour: 160,
    traditionalMiddlemanRetailPrice: 2400,
    artisanActualMiddlemanPayout: 450,
    recommendedFairPrice: 1350,
    demandForecastNext30Days: 320,
    demandGrowthRate: 31.8,
    confidenceScore: 0.95,
    featuresDetected: ['Ivory wood (Wrightia tinctoria)', 'Vegetable dye natural lac (Turmeric, Indigo)', 'Lathe turnery polished with screw pine leaves', 'Non-toxic child-safe certified'],
    imageUrl: '/images/crafts/channapatna-wooden-toy.jpg',
    artisanName: 'B. Venkatesh',
    artisanExperienceYears: 16,
    artisanVoiceQuote: {
      en: 'Plastic toys almost destroyed our town. With demand forecasting, we produce ahead of the festive gifting season and earn fair income.',
      hi: 'प्लास्टिक के खिलौनों ने हमारी रोजी-रोटी छीन ली थी। अब मांग के पूर्वानुमान से हम पहले से तैयारी करते हैं और अच्छा मुनाफा कमाते हैं।',
      gu: 'પ્લાસ્ટિક રમકડાંઓએ અમારું કામ અટકાવી દીધું હતું. હવે AI ની માંગ આગાહીથી અમે સમયસર ઉત્પાદન કરીને સારી આવક મેળવીએ છીએ.',
      bn: 'প্লাস্টিকের ভিড়ে ঐতিহ্যবাহী খেলনা হারিয়ে যাচ্ছিল। এখন সঠিক চাহিদা পূর্বাভাস পাওয়ায় আমরা লাভবান হচ্ছি।',
      ta: 'பிளாஸ்டிக் பொம்மைகளால் எங்கள் வாழ்வாதாரம் பாதிக்கப்பட்டது. இப்போது தேவை முன்னறிவிப்பு மூலம் சிறந்த வருமானம் பெறுகிறோம்.'
    },
    story: 'Crafted from sustainable Aale mara wood, turned on lathes, and colored using natural non-toxic lacquer extracted from vegetable dyes and resin.'
  }
];

export const DEMAND_FORECAST_SERIES = [
  { month: 'Apr', historical: 120, predicted: 125, festival: '' },
  { month: 'May', historical: 110, predicted: 115, festival: 'Summer Craft Expo' },
  { month: 'Jun', historical: 95, predicted: 100, festival: '' },
  { month: 'Jul', historical: 130, predicted: 138, festival: 'Monsoon Rakhi Orders' },
  { month: 'Aug', historical: 175, predicted: 190, festival: 'Independence Day / Onam' },
  { month: 'Sep', historical: 230, predicted: 245, festival: 'Ganesh Utsav Prep' },
  { month: 'Oct (Current)', historical: 310, predicted: 340, festival: 'Navratri & Durga Puja Surge' },
  { month: 'Nov (Forecast)', historical: null, predicted: 420, festival: 'Diwali & Wedding Season Peak' },
  { month: 'Dec (Forecast)', historical: null, predicted: 390, festival: 'Winter NRI & Export Buying' },
  { month: 'Jan (Forecast)', historical: null, predicted: 260, festival: 'Sankranti / Pongal' },
  { month: 'Feb (Forecast)', historical: null, predicted: 210, festival: 'Surajkund International Fair' },
  { month: 'Mar (Forecast)', historical: null, predicted: 180, festival: 'Holi Craft Gifting' },
];
