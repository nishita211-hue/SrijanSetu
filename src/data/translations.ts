import { LanguageCode } from '../types';

export interface Translations {
  brandSubtitle: string;
  heritageMissionBanner: string;
  hackathonReady: string;
  targetWageLift: string;
  downloadMasterKit: string;
  navTabs: {
    prototype: string;
    modelTraining: string;
    allIndia: string;
    gujaratArtisans?: string;
    roadmap?: string;
    quickref?: string;
    pitch?: string;
    problem: string;
    globalDataset: string;
  };
  prototype: {
    title: string;
    subtitle: string;
    subTabs: {
      cataloger: string;
      pricing: string;
      forecast: string;
      marketplace: string;
      training: string;
    };
    cataloger: {
      cameraTitle: string;
      cameraSubtitle: string;
      giVerified: string;
      selectSample: string;
      analyzingCraft: string;
      detectCraft: string;
      artisanStory: string;
      listenStory: string;
      readingVoice: string;
      stopVoice: string;
      confidence: string;
      featuresDetected: string;
    };
    pricing: {
      title: string;
      subtitle: string;
      materialCost: string;
      laborHours: string;
      livingWageRate: string;
      comparisonTitle: string;
      middlemanExploitation: string;
      karigarFairModel: string;
      middlemanMarkup: string;
      artisanShare: string;
      buyerPrice: string;
      takeHomeLift: string;
    };
    forecast: {
      title: string;
      subtitle: string;
      projectedGrowth: string;
      recommendedBatch: string;
      festivalSurge: string;
    };
    marketplace: {
      title: string;
      subtitle: string;
      buyDirect: string;
      fairWageCertified: string;
      artisanPayout: string;
    };
  };
  allIndiaView: {
    title: string;
    subtitle: string;
    predictorTitle: string;
    predictorSubtitle: string;
    runPredictor: string;
    predicting: string;
    predictedState: string;
    predictedCraft: string;
    cluster: string;
    giNumber: string;
    fairPrice: string;
    middlemanPrice: string;
    middlemanMargin: string;
    listenPredictionAudio: string;
    exportJSON: string;
    exportCSV: string;
    filterState: string;
    allStates: string;
    filterCategory: string;
    allCategories: string;
    searchPlaceholder: string;
    showingCrafts: string;
  };
  roadmap?: {
    title: string;
    subtitle: string;
    copyMarkdown: string;
    downloadMarkdown: string;
    timelineTitle: string;
    rolesTitle: string;
    checklistTitle: string;
  };
  quickref?: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    copyCode: string;
    copied: string;
  };
  pitch?: {
    title: string;
    subtitle: string;
    teleprompterTitle: string;
    startTimer: string;
    resetTimer: string;
    slidesTitle: string;
    qaTitle: string;
  };
  problem: {
    title: string;
    subtitle: string;
    totalArtisans: string;
    povertyRate: string;
    marketSize: string;
    waterfallTitle: string;
  };
  footer: {
    builtFor: string;
    bypassingMiddlemen: string;
  };
}

export const APP_TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    brandSubtitle: 'AI Cataloging • Fair Wage Pricing • ARIMA Forecasting',
    heritageMissionBanner: 'AI-Driven Market Linkage for 6.5M Indian Artisans • Heritage Theme',
    hackathonReady: '24h Hackathon Ready',
    targetWageLift: 'Target: +40% Net Wage Lift',
    downloadMasterKit: 'Download Master Kit',
    navTabs: {
      prototype: 'Solution Prototype',
      modelTraining: 'ML Model Training Studio',
      allIndia: 'All-India Craft & State Predictor',
      gujaratArtisans: 'Gujarat Artisans & Products (INDEXT-C)',
      roadmap: '24h Roadmap & War Room',
      quickref: 'Quick Reference Code',
      pitch: 'Pitch Guide & Defense',
      problem: 'Market Reality & Data',
      globalDataset: 'Global Craft Dataset & AI'
    },
    prototype: {
      title: 'SrijanSetu Interactive Solution Engine',
      subtitle: 'Simulating the complete artisan flow: MobileNetV2 vision classification, ethical RandomForest pricing, and ARIMA seasonal demand forecasting.',
      subTabs: {
        cataloger: 'AI Smart Cataloger',
        pricing: 'Fair Pricing Engine',
        forecast: 'Demand Forecaster',
        marketplace: 'Direct Marketplace',
        training: 'Train with New Dataset'
      },
      cataloger: {
        cameraTitle: 'Simulated Mobile Camera Stream (MobileNetV2)',
        cameraSubtitle: 'Edge vision classification with 180ms latency & GI tag verification',
        giVerified: 'Govt. GI Certified Authentic',
        selectSample: 'Select Craft Specimen to Classify:',
        analyzingCraft: 'Analyzing Craft Specimen...',
        detectCraft: 'Trigger AI Classification & GI Verification',
        artisanStory: 'Artisan Lineage & Heritage Story',
        listenStory: 'Listen to Artisan in Native Language',
        readingVoice: 'Speaking in Native Language...',
        stopVoice: 'Stop Audio',
        confidence: 'Confidence Score',
        featuresDetected: 'Visual Hallmarks Detected'
      },
      pricing: {
        title: 'RandomForest Fair-Wage Pricing Regressor',
        subtitle: 'Empirical price calculation ensuring ethical living wages while exposing middleman price gouging.',
        materialCost: 'Raw Material Cost (₹)',
        laborHours: 'Production Labor (Hours)',
        livingWageRate: 'Ethical Living Wage Rate (₹/hour)',
        comparisonTitle: 'Economic Comparison: Middleman Exploitation vs. SrijanSetu Linkage',
        middlemanExploitation: 'Traditional Middleman Trap',
        karigarFairModel: 'SrijanSetu Direct Fair Model',
        middlemanMarkup: 'Middleman Profit Extraction',
        artisanShare: 'Artisan Net Share of Retail',
        buyerPrice: 'Final Buyer Price',
        takeHomeLift: 'Net Artisan Income Increase'
      },
      forecast: {
        title: 'ARIMA (1,1,1) Time-Series Demand Forecaster',
        subtitle: 'Predicting regional craft surges 30-90 days ahead to prevent distress production.',
        projectedGrowth: 'Projected 30-Day Demand Growth',
        recommendedBatch: 'Recommended Production Volume',
        festivalSurge: 'Seasonal Festival Surge Detected'
      },
      marketplace: {
        title: 'Direct-to-Buyer Ethical Marketplace',
        subtitle: 'Connecting conscious consumers with verified GI master artisans without intermediaries.',
        buyDirect: 'Order Directly from Artisan',
        fairWageCertified: '100% Fair Wage Certified',
        artisanPayout: 'Artisan Receives 92% of Amount'
      }
    },
    allIndiaView: {
      title: 'All-India Craft Dataset & Accurate State Predictor',
      subtitle: 'Forensic state and craft prediction model across all Indian states and Union Territories with GI verification.',
      predictorTitle: 'AI State & Craft Recognition Engine',
      predictorSubtitle: 'Accurately predicts both the specific Craft and the Indian State of Origin.',
      runPredictor: 'Predict Craft & State of Origin',
      predicting: 'Identifying State & Craft Lineage...',
      predictedState: 'Predicted Indian State',
      predictedCraft: 'Predicted Traditional Craft',
      cluster: 'District / Production Cluster',
      giNumber: 'GI Tag Registration',
      fairPrice: 'Ethical Fair Price (Direct)',
      middlemanPrice: 'Traditional Middleman Retail',
      middlemanMargin: 'Middleman Extraction Margin',
      listenPredictionAudio: 'Listen to Forensic Explanation in Native Language',
      exportJSON: 'Export India Dataset (JSON)',
      exportCSV: 'Export India Dataset (CSV)',
      filterState: 'Filter by State',
      allStates: 'All Indian States (Pan-India)',
      filterCategory: 'Filter by Craft Category',
      allCategories: 'All Craft Categories',
      searchPlaceholder: 'Search any Indian craft, state, or material...',
      showingCrafts: 'Showing Indian Heritage Crafts'
    },
    roadmap: {
      title: 'Engineering War Room & 24h Execution Roadmap',
      subtitle: 'Hour-by-hour role allocation, dependencies, risk buffers, and checkpoint gates for 6 team members.',
      copyMarkdown: 'Copy Markdown',
      downloadMarkdown: 'Download ROADMAP.md',
      timelineTitle: 'Hour-by-Hour Checkpoint Gates (0h → 24h)',
      rolesTitle: '6-Person Specialization & Hourly Deliverables',
      checklistTitle: 'Pre-Submission Verification Checklist'
    },
    quickref: {
      title: 'Hackathon Quick Reference & Code Snippets',
      subtitle: 'Tested implementations for FastAPI, MobileNetV2, RandomForest, ARIMA, and AWS deployment.',
      searchPlaceholder: 'Search code snippets (fastapi, mobilenet, docker)...',
      copyCode: 'Copy Code',
      copied: 'Copied!'
    },
    pitch: {
      title: 'Presentation, Pitch Script & Jury Defense Guide',
      subtitle: '2-minute elevator pitch teleprompter, 10-slide storyboard, and top 5 jury defenses.',
      teleprompterTitle: '120-Second Pitch Teleprompter & Pacing Stopwatch',
      startTimer: 'Start Timer',
      resetTimer: 'Reset',
      slidesTitle: 'The 10-Slide Hackathon Presentation Framework',
      qaTitle: 'Top 5 Tough Jury Questions & Bulletproof Answers'
    },
    problem: {
      title: 'Market Data, Economic Asymmetry & Heritage Crisis',
      subtitle: 'Why 6.5M artisans earn under ₹5,000/month despite powering a ₹40,500 Crore industry.',
      totalArtisans: 'Total Indian Artisans',
      povertyRate: 'Severe Income Poverty',
      marketSize: 'Handicrafts Market (2025)',
      waterfallTitle: 'The Middleman Waterfall: How a ₹1,000 Craft Becomes ₹10,000 Retail'
    },
    footer: {
      builtFor: 'Built for 6.5 Million Indian Handloom & Handicraft Artisans',
      bypassingMiddlemen: 'Bypassing Middlemen with AI'
    }
  },

  hi: {
    brandSubtitle: 'एआई कैटलॉगिंग • निष्पक्ष पारिश्रमिक मूल्य निर्धारण • एआरआईएमए मांग पूर्वानुमान',
    heritageMissionBanner: '65 लाख भारतीय कारीगरों हेतु एआई-संचालित बाज़ार लिंकेज • विरासत एवं संस्कृति थीम',
    hackathonReady: '24 घंटे हैकाथॉन रेडी',
    targetWageLift: 'लक्ष्य: +40% शुद्ध आय वृद्धि',
    downloadMasterKit: 'मास्टर किट डाउनलोड करें',
    navTabs: {
      prototype: 'समाधान प्रोटोटाइप',
      modelTraining: 'एमएल मॉडल प्रशिक्षण स्टूडियो',
      allIndia: 'अखिल भारतीय शिल्प व राज्य पहचानकर्ता',
      gujaratArtisans: 'गुजरात शिल्पकार व उत्पाद (INDEXT-C)',
      roadmap: '24 घंटे रोडमैप व वॉर रूम',
      quickref: 'त्वरित संदर्भ कोड',
      pitch: 'पिच गाइड व जूरी रक्षा',
      problem: 'बाज़ार आंकड़े व समस्या',
      globalDataset: 'वैश्विक शिल्प डेटासेट व एआई'
    },
    prototype: {
      title: 'सृजनसेतु इंटरएक्टिव समाधान इंजन',
      subtitle: 'कारीगरों की संपूर्ण कार्यप्रणाली का अनुकरण: मोबाइलनेट दृष्टि पहचान, रैंडमफॉरेस्ट मूल्य निर्धारण और एआरआईएमए मौसमी मांग पूर्वानुमान।',
      subTabs: {
        cataloger: 'एआई स्मार्ट कैटलॉगर',
        pricing: 'उचित मूल्य इंजन',
        forecast: 'मांग पूर्वानुमान',
        marketplace: 'प्रत्यक्ष बाज़ार',
        training: 'नए डेटासेट से प्रशिक्षित करें'
      },
      cataloger: {
        cameraTitle: 'सिम्युलेटेड मोबाइल कैमरा स्ट्रीम (MobileNetV2)',
        cameraSubtitle: '180 मिलीसेकंड में छवि पहचान एवं जीआई प्रमाण पत्र सत्यापन',
        giVerified: 'सरकारी जीआई प्रमाणित प्रामाणिक शिल्प',
        selectSample: 'पहचान हेतु शिल्प का चयन करें:',
        analyzingCraft: 'शिल्प नमूने का विश्लेषण किया जा रहा है...',
        detectCraft: 'एआई पहचान व जीआई सत्यापन शुरू करें',
        artisanStory: 'कारीगर परंपरा व विरासत की कहानी',
        listenStory: 'मातृभाषा में कारीगर की आवाज़ सुनें',
        readingVoice: 'मातृभाषा में बोला जा रहा है...',
        stopVoice: 'आवाज़ रोकें',
        confidence: 'विश्वसनीयता स्कोर',
        featuresDetected: 'पहचाने गए शिल्प लक्षण'
      },
      pricing: {
        title: 'रैंडमफॉरेस्ट निष्पक्ष पारिश्रमिक मूल्य निर्धारक',
        subtitle: 'बिचौलियों की लूट को उजागर करते हुए कारीगरों के लिए सम्मानजनक आजीविका सुनिश्चित करने वाला वैज्ञानिक मॉडल।',
        materialCost: 'कच्चे माल की लागत (₹)',
        laborHours: 'निर्माण में लगे घंटे',
        livingWageRate: 'सम्मानजनक दैनिक दर (₹/घंटा)',
        comparisonTitle: 'आर्थिक तुलना: बिचौलिया शोषण बनाम सृजनसेतु सीधा लिंकेज',
        middlemanExploitation: 'पारंपरिक बिचौलिया शोषण चक्र',
        karigarFairModel: 'सृजनसेतु प्रत्यक्ष निष्पक्ष मॉडल',
        middlemanMarkup: 'बिचौलिये का मुनाफा',
        artisanShare: 'कारीगर की शुद्ध हिस्सेदारी',
        buyerPrice: 'ग्राहक का अंतिम मूल्य',
        takeHomeLift: 'कारीगर की आय में शुद्ध वृद्धि'
      },
      forecast: {
        title: 'एआरआईएमए टाइम-सीरीज़ मांग पूर्वानुमान मॉडल',
        subtitle: 'संकटकालीन उत्पादन रोकने हेतु 30 से 90 दिन पूर्व त्योहारों की मांग का सटीक अनुमान।',
        projectedGrowth: '30 दिनों में संभावित मांग वृद्धि',
        recommendedBatch: 'अनुशंसित उत्पादन मात्रा',
        festivalSurge: 'मौसमी त्योहारी मांग दर्ज'
      },
      marketplace: {
        title: 'सीधा उपभोक्ता बाज़ार (डायरेक्ट मार्केटप्लेस)',
        subtitle: 'जागरूक खरीदारों को प्रमाणित जीआई शिल्पकारों से बिना किसी बिचौलिये के सीधे जोड़ना।',
        buyDirect: 'कारीगर से सीधे ऑर्डर करें',
        fairWageCertified: '100% उचित पारिश्रमिक प्रमाणित',
        artisanPayout: 'कारीगर को मिलती है 92% सीधी राशि'
      }
    },
    allIndiaView: {
      title: 'अखिल भारतीय शिल्प डेटासेट व सटीक राज्य पहचानकर्ता',
      subtitle: 'सभी भारतीय राज्यों एवं केंद्र शासित प्रदेशों के शिल्पों और उनके गृह राज्य की सटीक पहचान प्रणाली।',
      predictorTitle: 'एआई शिल्प व राज्य पहचान इंजन',
      predictorSubtitle: 'शिल्प की तस्वीर व विशेषताओं से उसके गृह राज्य और जिले की सटीक भविष्यवाणी करता है।',
      runPredictor: 'शिल्प व गृह राज्य की पहचान करें',
      predicting: 'राज्य और शिल्प की पहचान जारी है...',
      predictedState: 'पहचाना गया भारतीय राज्य',
      predictedCraft: 'पहचाना गया पारंपरिक शिल्प',
      cluster: 'जिला / उत्पादन क्लस्टर',
      giNumber: 'जीआई टैग पंजीकरण संख्या',
      fairPrice: 'उचित प्रत्यक्ष मूल्य (कारीगर हेतु)',
      middlemanPrice: 'पारंपरिक बिचौलिया खुदरा मूल्य',
      middlemanMargin: 'बिचौलिया मुनाफा मार्जिन',
      listenPredictionAudio: 'मातृभाषा में संपूर्ण विवरण सुनें',
      exportJSON: 'भारतीय डेटासेट निर्यात करें (JSON)',
      exportCSV: 'भारतीय डेटासेट निर्यात करें (CSV)',
      filterState: 'राज्य अनुसार फ़िल्टर करें',
      allStates: 'सभी भारतीय राज्य (संपूर्ण भारत)',
      filterCategory: 'शिल्प श्रेणी अनुसार फ़िल्टर',
      allCategories: 'सभी शिल्प श्रेणियां',
      searchPlaceholder: 'किसी भी भारतीय शिल्प, राज्य या सामग्री को खोजें...',
      showingCrafts: 'प्रदर्शित भारतीय विरासत शिल्प'
    },
    roadmap: {
      title: 'सृजनसेतु वॉर रूम व 24 घंटे का इंजीनियरिंग रोडमैप',
      subtitle: '6 सदस्यीय दल हेतु प्रति घंटे की भूमिका, निर्भरता, जोखिम और चेकपॉइंट गेट्स का विस्तृत विवरण।',
      copyMarkdown: 'मार्कडाउन कॉपी करें',
      downloadMarkdown: 'ROADMAP.md डाउनलोड करें',
      timelineTitle: 'प्रति घंटे के चेकपॉइंट गेट्स (0 घंटे → 24 घंटे)',
      rolesTitle: '6 सदस्यों का कार्य विभाजन व डिलीवरी लक्ष्य',
      checklistTitle: 'अंतिम सबमिशन पूर्व सत्यापन चेकलिस्ट'
    },
    quickref: {
      title: 'हैकाथॉन त्वरित संदर्भ व कोड स्निपेट्स',
      subtitle: 'फास्टएपीआई, मोबाइलनेट, रैंडमफॉरेस्ट, एआरआईएमए और एडब्ल्यूएस परिनियोजन हेतु परीक्षित कोड।',
      searchPlaceholder: 'कोड खोजें (fastapi, mobilenet, docker)...',
      copyCode: 'कोड कॉपी करें',
      copied: 'कॉपी हो गया!'
    },
    pitch: {
      title: 'प्रस्तुति, 2 मिनट की पिच स्क्रिप्ट व जूरी सुरक्षा गाइड',
      subtitle: '120 सेकंड का टेलीप्रॉम्प्टर, 10 स्लाइडों का रूपरेखा खाका और जूरी के 5 कठिन प्रश्नों के उत्तर।',
      teleprompterTitle: '120 सेकंड पिच टेलीप्रॉम्प्टर व अभ्यास स्टॉपवॉच',
      startTimer: 'समय शुरू करें',
      resetTimer: 'रीसेट',
      slidesTitle: '10-स्लाइड हैकाथॉन प्रस्तुति रूपरेखा',
      qaTitle: 'जूरी के शीर्ष 5 कठिन प्रश्न व अचूक उत्तर'
    },
    problem: {
      title: 'बाज़ार आंकड़े, आर्थिक असमानता व सांस्कृतिक संकट',
      subtitle: '40,500 करोड़ रुपये का उद्योग होने के बावजूद 66% कारीगर 5,000 रुपये प्रति माह से कम क्यों कमाते हैं।',
      totalArtisans: 'कुल भारतीय कारीगर',
      povertyRate: 'गंभीर आय गरीबी दर',
      marketSize: 'हस्तशिल्प बाज़ार आकार (2025)',
      waterfallTitle: 'बिचौलिया शोषण वॉटरफॉल: कैसे ₹1,000 का शिल्प ₹10,000 का बन जाता है'
    },
    footer: {
      builtFor: '65 लाख भारतीय हथकरघा व हस्तशिल्प कारीगरों के उत्थान हेतु समर्पित',
      bypassingMiddlemen: 'एआई की शक्ति से बिचौलियों का पूर्ण खात्मा'
    }
  },

  gu: {
    brandSubtitle: 'એઆઈ કેટલોગિંગ • ન્યાયી મહેનતાણું કિંમત નિર્ધારણ • અરીમા માંગ પૂર્વાનુમાન',
    heritageMissionBanner: '65 લાખ ભારતીય કારીગરો માટે એઆઈ બજાર જોડાણ • સંસ્કૃતિ અને વારસો થીમ',
    hackathonReady: '24 કલાક હેકાથોન તૈયાર',
    targetWageLift: 'લક્ષ્ય: +40% ચોખ્ખી આવક વધારો',
    downloadMasterKit: 'માસ્ટર કીટ ડાઉનલોડ કરો',
    navTabs: {
      prototype: 'ઉકેલ પ્રોટોટાઇપ',
      modelTraining: 'એમએલ મોડેલ ટ્રેનિંગ સ્ટુડિયો',
      allIndia: 'અખિલ ભારતીય શિલ્પ અને રાજ્ય ઓળખ',
      gujaratArtisans: 'ગુજરાત શિલ્પીઓ અને ઉત્પાદનો (INDEXT-C)',
      roadmap: '24 કલાક રોડમેપ અને વૉર રૂમ',
      quickref: 'ઝડપી સંદર્ભ કોડ',
      pitch: 'પીચ માર્ગદર્શિકા અને બચાવ',
      problem: 'બજાર વાસ્તવિકતા અને ડેટા',
      globalDataset: 'વૈશ્વિક કળા ડેટાસેટ અને એઆઈ'
    },
    prototype: {
      title: 'સૃજનસેતુ ઇન્ટરેક્ટિવ સોલ્યુશન એન્જિન',
      subtitle: 'કારીગરો માટે સંપૂર્ણ પ્રક્રિયા: મોબાઇલનેટ વિઝન, ન્યાયી કિંમત નિર્ધારણ અને સીઝનલ માંગ પૂર્વાનુમાન.',
      subTabs: {
        cataloger: 'એઆઈ સ્માર્ટ કેટલોગર',
        pricing: 'વાજબી કિંમત એન્જિન',
        forecast: 'માંગ પૂર્વાનુમાન',
        marketplace: 'સીધું બજાર',
        training: 'નવા ડેટાસેટ સાથે તાલીમ આપો'
      },
      cataloger: {
        cameraTitle: 'મોબાઇલ કેમેરા સ્ટ્રીમ (MobileNetV2)',
        cameraSubtitle: '180 મિલિસેકન્ડમાં છબી ઓળખ અને જીઆઈ પ્રમાણપત્ર ચકાસણી',
        giVerified: 'સરકારી જીઆઈ પ્રમાણિત અસલી કળા',
        selectSample: 'ઓળખ માટે કળા નમૂનો પસંદ કરો:',
        analyzingCraft: 'શિલ્પ નમૂનાનું વિશ્લેષણ થઈ રહ્યું છે...',
        detectCraft: 'એઆઈ ઓળખ અને જીઆઈ ચકાસણી શરૂ કરો',
        artisanStory: 'કારીગર વારસો અને ઇતિહાસ',
        listenStory: 'માતૃભાષામાં કારીગરનો અવાજ સાંભળો',
        readingVoice: 'માતૃભાષામાં બોલાઈ રહ્યું છે...',
        stopVoice: 'અવાજ બંધ કરો',
        confidence: 'વિશ્વાસ સ્કોર',
        featuresDetected: 'ઓળખાયેલ શિલ્પ લક્ષણો'
      },
      pricing: {
        title: 'વાજબી મહેનતાણું કિંમત નિર્ધારણ મોડેલ',
        subtitle: 'વચેટિયાઓની લૂંટ અટકાવી કારીગરોને માનભેર વળતર આપતું ગાણિતિક મોડેલ.',
        materialCost: 'કાચા માલનો ખર્ચ (₹)',
        laborHours: 'કામના કલાકો',
        livingWageRate: 'વાજબી દૈનિક દર (₹/કલાક)',
        comparisonTitle: 'આર્થિક સરખામણી: વચેટિયા શોષણ વિરુદ્ધ સૃજનસેતુ સીધું જોડાણ',
        middlemanExploitation: 'પરંપરાગત વચેટિયા શોષણ',
        karigarFairModel: 'સૃજનસેતુ ન્યાયી સીધું મોડેલ',
        middlemanMarkup: 'વચેટિયાનો નફો',
        artisanShare: 'કારીગરનો ચોખ્ખો હિસ્સો',
        buyerPrice: 'ગ્રાહક માટે અંતિમ કિંમત',
        takeHomeLift: 'કારીગરની ચોખ્ખી આવકમાં વધારો'
      },
      forecast: {
        title: 'અરીમા (ARIMA) માંગ પૂર્વાનુમાન મોડેલ',
        subtitle: 'નકામું ઉત્પાદન રોકવા 30 થી 90 દિવસ અગાઉ તહેવારોની માંગનું સચોટ અનુમાન.',
        projectedGrowth: '30 દિવસમાં અપેક્ષિત માંગ વધારો',
        recommendedBatch: 'ભલામણ કરેલ ઉત્પાદન જથ્થો',
        festivalSurge: 'તહેવારોની વધારાની માંગ નોંધાઈ'
      },
      marketplace: {
        title: 'ગ્રાહક સાથે સીધું બજાર (ડાયરેક્ટ માર્કેટપ્લેસ)',
        subtitle: 'વચેટિયાઓ વગર ગ્રાહકોને પ્રમાણિત કારીગરો સાથે સીધા જોડતું માધ્યમ.',
        buyDirect: 'કારીગર પાસેથી સીધો ઓર્ડર કરો',
        fairWageCertified: '100% વાજબી વેતન પ્રમાણિત',
        artisanPayout: 'કારીગરને મળે છે 92% સીધી રકમ'
      }
    },
    allIndiaView: {
      title: 'અખિલ ભારતીય શિલ્પ ડેટાસેટ અને ચોક્કસ રાજ્ય ઓળખ',
      subtitle: 'ભારતના તમામ રાજ્યો અને કેન્દ્રશાસિત પ્રદેશોના શિલ્પ અને તેમના મૂળ રાજ્યની સચોટ ઓળખ.',
      predictorTitle: 'એઆઈ શિલ્પ અને રાજ્ય ઓળખ એન્જિન',
      predictorSubtitle: 'છબી અને લક્ષણો પરથી ચોક્કસ કળા અને ભારતીય રાજ્યની આગાહી કરે છે.',
      runPredictor: 'શિલ્પ અને મૂળ રાજ્ય ઓળખો',
      predicting: 'રાજ્ય અને કળાની ઓળખ ચાલુ છે...',
      predictedState: 'ઓળખાયેલ ભારતીય રાજ્ય',
      predictedCraft: 'ઓળખાયેલ પરંપરાગત શિલ્પ',
      cluster: 'જિલ્લો / ઉત્પાદન કેન્દ્ર',
      giNumber: 'જીઆઈ ટેગ નોંધણી નંબર',
      fairPrice: 'વાજબી સીધી કિંમત (કારીગર માટે)',
      middlemanPrice: 'પરંપરાગત વચેટિયા રિટેલ કિંમત',
      middlemanMargin: 'વચેટિયાનો નફા માર્જિન',
      listenPredictionAudio: 'માતૃભાષામાં સંપૂર્ણ વિગત સાંભળો',
      exportJSON: 'ભારતીય ડેટાસેટ નિકાસ (JSON)',
      exportCSV: 'ભારતીય ડેટાસેટ નિકાસ (CSV)',
      filterState: 'રાજ્ય મુજબ ફિલ્ટર',
      allStates: 'બધા ભારતીય રાજ્યો (સમગ્ર ભારત)',
      filterCategory: 'કળા શ્રેણી મુજબ ફિલ્ટર',
      allCategories: 'બધી કળા શ્રેણીઓ',
      searchPlaceholder: 'કોઈપણ ભારતીય કળા, રાજ્ય કે સામગ્રી શોધો...',
      showingCrafts: 'દર્શાવેલ ભારતીય વારસાગત કળાઓ'
    },
    roadmap: {
      title: 'સૃજનસેતુ વૉર રૂમ અને 24 કલાક એન્જિનિયરિંગ રોડમેપ',
      subtitle: '6 સભ્યોની ટીમ માટે કલાકવાર ભૂમિકા, જોખમો અને મહત્વપૂર્ણ ચેકપોઇન્ટ્સ.',
      copyMarkdown: 'માર્કડાઉન કોપી કરો',
      downloadMarkdown: 'ROADMAP.md ડાઉનલોડ',
      timelineTitle: 'કલાકવાર ચેકપોઇન્ટ ગેટ્સ (0 કલાક → 24 કલાક)',
      rolesTitle: '6 સભ્યોની વિશેષતા અને સમયસર પહોંચાડવાના લક્ષ્યો',
      checklistTitle: 'અંતિમ સબમિશન પહેલાં ચકાસણી યાદી'
    },
    quickref: {
      title: 'હેકાથોન ઝડપી સંદર્ભ અને કોડ સ્નિપેટ્સ',
      subtitle: 'ફાસ્ટએપીઆઈ, મોબાઇલનેટ, રેન્ડમફોરેસ્ટ અને અરીમા માટે ચકાસાયેલ કોડ.',
      searchPlaceholder: 'કોડ શોધો (fastapi, mobilenet, docker)...',
      copyCode: 'કોડ કોપી કરો',
      copied: 'કોપી થઈ ગયું!'
    },
    pitch: {
      title: 'પ્રેઝન્ટેશન, 2 મિનિટની પીચ અને જ્યુરી બચાવ',
      subtitle: '120 સેકન્ડ ટેલિપ્રોમ્પ્ટર, 10 સ્લાઇડ્સ ફ્રેમવર્ક અને જ્યુરીના 5 અઘરા પ્રશ્નોના ઉત્તરો.',
      teleprompterTitle: '120 સેકન્ડ પીચ ટેલિપ્રોમ્પ્ટર અને સ્ટોપવોચ',
      startTimer: 'સમય શરૂ કરો',
      resetTimer: 'રીસેટ',
      slidesTitle: '10 સ્લાઇડ્સ હેકાથોન પ્રેઝન્ટેશન માળખું',
      qaTitle: 'જ્યુરીના ટોચના 5 મુશ્કેલ પ્રશ્નો અને સચોટ જવાબો'
    },
    problem: {
      title: 'બજાર વાસ્તવિકતા, આર્થિક શોષણ અને સંસ્કૃતિ કટોકટી',
      subtitle: '₹40,500 કરોડનો ઉદ્યોગ હોવા છતાં 66% કારીગરો મહિને ₹5,000 થી ઓછું કેમ કમાય છે.',
      totalArtisans: 'કુલ ભારતીય કારીગરો',
      povertyRate: 'ગંભીર ગરીબી દર',
      marketSize: 'હસ્તકળા બજાર કદ (2025)',
      waterfallTitle: 'વચેટિયા શોષણ: ₹1,000 ની વસ્તુ ₹10,000 માં કેવી રીતે વેચાય છે'
    },
    footer: {
      builtFor: '65 લાખ ભારતીય હાથવણાટ અને હસ્તકળા કારીગરો માટે સમર્પિત',
      bypassingMiddlemen: 'એઆઈ દ્વારા વચેટિયાઓનું સંપૂર્ણ નિવારણ'
    }
  },

  bn: {
    brandSubtitle: 'এআই ক্যাটালগিং • ন্যায্য মজুরি মূল্য নির্ধারণ • আরিমা চাহিদা পূর্বাভাস',
    heritageMissionBanner: '৬৫ লক্ষ ভারতীয় কারিগরদের জন্য এআই-চালিত বাজার সংযোগ • ঐতিহ্য ও সংস্কৃতি থিম',
    hackathonReady: '২৪ ঘণ্টা হ্যাকাথন প্রস্তুত',
    targetWageLift: 'লক্ষ্য: +৪০% নিট মজুরি বৃদ্ধি',
    downloadMasterKit: 'মাস্টার কিট ডাউনলোড করুন',
    navTabs: {
      prototype: 'সমাধান প্রোটোটাইপ',
      modelTraining: 'এমএল মডেল ট্রেনিং স্টুডিও',
      allIndia: 'সর্বভারতীয় কারুশিল্প ও রাজ্য শনাক্তকারী',
      gujaratArtisans: 'গুজরাট শিল্পী ও পণ্য পোর্টাল (INDEXT-C)',
      roadmap: '২৪ ঘণ্টা রোডম্যাপ ও ওয়ার রুম',
      quickref: 'কুইক রেফারেন্স কোড',
      pitch: 'পিচ গাইড ও জুরি ডিফেন্স',
      problem: 'বাজারের বাস্তবতা ও তথ্য',
      globalDataset: 'বিশ্ব কারুশিল্প ডেটাসেট ও এআই'
    },
    prototype: {
      title: 'সৃজনসেতু ইন্টারঅ্যাক্টিভ সলিউশন ইঞ্জিন',
      subtitle: 'কারিগরদের সম্পূর্ণ কর্মপ্রবাহ: মোবাইলনেট দৃষ্টি শনাক্তকরণ, ন্যায্য মূল্য নির্ধারণ ও আরিমা চাহিদা পূর্বাভাস।',
      subTabs: {
        cataloger: 'এআই স্মার্ট ক্যাটালগার',
        pricing: 'ন্যায্য মূল্য ইঞ্জিন',
        forecast: 'চাহিদা পূর্বাভাস',
        marketplace: 'সরাসরি বাজার',
        training: 'নতুন ডেটাসেট দিয়ে প্রশিক্ষণ দিন'
      },
      cataloger: {
        cameraTitle: 'সিমুলেটেড মোবাইল ক্যামেরা স্ট্রিম (MobileNetV2)',
        cameraSubtitle: '১৮০ মিলিসেকেন্ডে ছবি শনাক্তকরণ এবং জিআই ট্যাগ যাচাইকরণ',
        giVerified: 'সরকারি জিআই প্রত্যয়িত আসল শিল্প',
        selectSample: 'শনাক্তকরণের জন্য নমুনা নির্বাচন করুন:',
        analyzingCraft: 'কারুশিল্প নমুনা বিশ্লেষণ করা হচ্ছে...',
        detectCraft: 'এআই শনাক্তকরণ ও জিআই যাচাই শুরু করুন',
        artisanStory: 'কারিগর ঐতিহ্য ও ইতিহাসের গল্প',
        listenStory: 'মাতৃভাষায় কারিগরের কণ্ঠ শুনুন',
        readingVoice: 'মাতৃভাষায় পাঠ করা হচ্ছে...',
        stopVoice: 'শব্দ থামান',
        confidence: 'নির্ভুলতার মাত্রা',
        featuresDetected: 'শনাক্তকৃত কারুশিল্পের বৈশিষ্ট্য'
      },
      pricing: {
        title: 'র্যান্ডমফরেস্ট ন্যায্য মজুরি মূল্য নির্ধারণ',
        subtitle: 'মধ্যস্বত্বভোগীদের শোষণ দূর করে কারিগরদের জন্য সম্মানজনক জীবিকা নিশ্চিত করার মডেল।',
        materialCost: 'কাঁচামাল খরচ (₹)',
        laborHours: 'কাজের সময় (ঘণ্টা)',
        livingWageRate: 'ন্যায্য পারিশ্রমিক হার (₹/ঘণ্টা)',
        comparisonTitle: 'অর্থনৈতিক তুলনা: মধ্যস্বত্বভোগী শোষণ বনাম সৃজনসেতু সরাসরি সংযোগ',
        middlemanExploitation: 'ঐতিহ্যবাহী মধ্যস্বত্বভোগীর ফাঁদ',
        karigarFairModel: 'সৃজনসেতু সরাসরি ন্যায্য মডেল',
        middlemanMarkup: 'মধ্যস্বত্বভোগীর অতিরিক্ত মুনাফা',
        artisanShare: 'কারিগরের নিট অংশ',
        buyerPrice: 'ক্রেতার চূড়ান্ত মূল্য',
        takeHomeLift: 'কারিগরের নিট আয় বৃদ্ধি'
      },
      forecast: {
        title: 'আরিমা সময়-সিরিজ চাহিদা পূর্বাভাস',
        subtitle: 'অপ্রয়োজনীয় উৎপাদন রোধে ৩০-৯০ দিন আগে উৎসবের চাহিদার পূর্বাভাস।',
        projectedGrowth: '৩০ দিনে সম্ভাব্য চাহিদা বৃদ্ধি',
        recommendedBatch: 'সুপারিশকৃত উৎপাদন পরিমাণ',
        festivalSurge: 'মৌসুমি উৎসবের চাহিদা রেকর্ড'
      },
      marketplace: {
        title: 'সরাসরি ক্রেতা বাজার (ডিরেক্ট মার্কেটপ্লেস)',
        subtitle: 'দালাল ছাড়াই সচেতন ক্রেতাদের সরাসরি অনুমোদিত জিআই শিল্পীদের সাথে সংযুক্ত করা।',
        buyDirect: 'কারিগর থেকে সরাসরি অর্ডার করুন',
        fairWageCertified: '১০০% ন্যায্য মজুরি প্রত্যয়িত',
        artisanPayout: 'কারিগর সরাসরি পায় ৯২% অর্থ'
      }
    },
    allIndiaView: {
      title: 'সর্বভারতীয় কারুশিল্প ডেটাসেট ও নির্ভুল রাজ্য প্রেডিক্টর',
      subtitle: 'ভারতের প্রতিটি রাজ্য ও কেন্দ্রশাসিত অঞ্চলের কারুশিল্প এবং তাদের গৃহরাজ্য নির্ভুলভাবে শনাক্তকরণের ব্যবস্থা।',
      predictorTitle: 'এআই কারুশিল্প ও রাজ্য প্রেডিকশন ইঞ্জিন',
      predictorSubtitle: 'ছবি ও বৈশিষ্ট্যের মাধ্যমে সঠিক শিল্প এবং ভারতীয় রাজ্য শনাক্ত করে।',
      runPredictor: 'কারুশিল্প ও গৃহরাজ্য শনাক্ত করুন',
      predicting: 'রাজ্য ও কারুশিল্প শনাক্ত করা হচ্ছে...',
      predictedState: 'শনাক্তকৃত ভারতীয় রাজ্য',
      predictedCraft: 'শনাক্তকৃত ঐতিহ্যবাহী কারুশিল্প',
      cluster: 'জেলা / উৎপাদন ক্লাস্টার',
      giNumber: 'জিআই ট্যাগ নিবন্ধন নম্বর',
      fairPrice: 'ন্যায্য সরাসরি মূল্য (কারিগরের জন্য)',
      middlemanPrice: 'ঐতিহ্যবাহী খুচরা মূল্য',
      middlemanMargin: 'মধ্যস্বত্বভোগীর অতিরিক্ত মুনাফা',
      listenPredictionAudio: 'মাতৃভাষায় বিস্তারিত বিবরণ শুনুন',
      exportJSON: 'ভারতীয় ডেটাসেট রপ্তানি (JSON)',
      exportCSV: 'ভারতীয় ডেটাসেট রপ্তানি (CSV)',
      filterState: 'রাজ্য অনুসারে ফিল্টার',
      allStates: 'সকল ভারতীয় রাজ্য (সমগ্র ভারত)',
      filterCategory: 'শিল্প বিভাগ অনুসারে ফিল্টার',
      allCategories: 'সকল শিল্প বিভাগ',
      searchPlaceholder: 'যেকোনো ভারতীয় কারুশিল্প, রাজ্য বা কাঁচামাল খুঁজুন...',
      showingCrafts: 'প্রদর্শিত ভারতীয় ঐতিহ্যবাহী কারুশিল্প'
    },
    roadmap: {
      title: 'সৃজনসেতু ওয়ার রুম ও ২৪ ঘণ্টার ইঞ্জিনিয়ারিং রোডম্যাপ',
      subtitle: '৬ সদস্যের দলের জন্য ঘণ্টাওয়ারি দায়িত্ব, নির্ভরতা ও চেকপয়েন্টের সুনির্দিষ্ট পরিকল্পনা।',
      copyMarkdown: 'মার্কডাউন কপি করুন',
      downloadMarkdown: 'ROADMAP.md ডাউনলোড',
      timelineTitle: 'ঘণ্টাওয়ারি চেকপয়েন্ট গেট (০ ঘণ্টা → ২৪ ঘণ্টা)',
      rolesTitle: '৬ জনের ভূমিকা ও সময়মতো সমাপ্তির লক্ষ্য',
      checklistTitle: 'চূড়ান্ত জমা দেওয়ার আগে যাচাইকরণ চেকলিস্ট'
    },
    quickref: {
      title: 'হ্যাকাথন কুইক রেফারেন্স ও কোড স্নিপেট',
      subtitle: 'ফাস্টএপিআই, মোবাইলনেট, র্যান্ডমফরেস্ট ও আরিমার জন্য সম্পূর্ণ পরীক্ষিত কোড।',
      searchPlaceholder: 'কোড খুঁজুন (fastapi, mobilenet, docker)...',
      copyCode: 'কোড কপি করুন',
      copied: 'কপি হয়েছে!'
    },
    pitch: {
      title: 'উপস্থাপনা, ২ মিনিটের পিচ স্ক্রিপ্ট ও জুরি ডিফেন্স',
      subtitle: '১২০ সেকেন্ডের টেলিপ্রম্পটার, ১০ স্লাইডের কাঠামো এবং জুরির ৫টি কঠিন প্রশ্নের উত্তর।',
      teleprompterTitle: '১২০ সেকেন্ড পিচ টেলিপ্রম্পটার ও স্টপওয়াচ',
      startTimer: 'সময় শুরু করুন',
      resetTimer: 'রিসেট',
      slidesTitle: '১০ স্লাইডের হ্যাকাথন উপস্থাপনা কাঠামো',
      qaTitle: 'জুরির শীর্ষ ৫টি কঠিন প্রশ্ন ও নির্ভুল উত্তর'
    },
    problem: {
      title: 'বাজারের তথ্য, অর্থনৈতিক বৈষম্য ও ঐতিহ্য সংকট',
      subtitle: '৪০,৫০০ কোটি টাকার শিল্প হওয়া সত্ত্বেও ৬৬% কারিগর মাসে ৫,০০০ টাকার কম কেন আয় করে।',
      totalArtisans: 'মোট ভারতীয় কারিগর',
      povertyRate: 'চরম দারিদ্র্য হার',
      marketSize: 'হস্তশিল্প বাজার আকার (২০২৫)',
      waterfallTitle: 'মধ্যস্বত্বভোগী শোষণ: কীভাবে ১,০০০ টাকার জিনিস ১০,০০০ টাকায় বিক্রি হয়'
    },
    footer: {
      builtFor: '৬৫ লক্ষ ভারতীয় তাঁত ও হস্তশিল্প কারিগরদের জন্য নিবেদিত',
      bypassingMiddlemen: 'এআই-এর সাহায্যে মধ্যস্বত্বভোগীদের সম্পূর্ণ বিলোপ'
    }
  },

  ta: {
    brandSubtitle: 'ஏஐ விபரம் • நியாயமான கூலி விலை நிர்ணயம் • அரிமா தேவை முன்கணிப்பு',
    heritageMissionBanner: '65 லட்சம் இந்திய கைவினைஞர்களுக்கான ஏஐ சந்தை இணைப்பு • கலாச்சார பாரம்பரிய தீம்',
    hackathonReady: '24 மணிநேர ஹேக்கத்தான் தயார்',
    targetWageLift: 'இலக்கு: +40% நிகர வருமான உயர்வு',
    downloadMasterKit: 'மாஸ்டர் கிட் பதிவிறக்கம்',
    navTabs: {
      prototype: 'தீர்வு முன்மாதிரி',
      modelTraining: 'எம்எல் மாதிரி பயிற்சி அரங்கம்',
      allIndia: 'அகில இந்திய கைவினை & மாநில கணிப்பான்',
      gujaratArtisans: 'குஜராத் கைவினைஞர்கள் & பொருட்கள் (INDEXT-C)',
      roadmap: '24 மணிநேர திட்டம் & வார் ரூம்',
      quickref: 'விரைவு குறிப்பு குறியீடு',
      pitch: 'விளக்க உரை & நடுவர் பாதுகாப்பு',
      problem: 'சந்தை உண்மை & தரவு',
      globalDataset: 'உலகளாவிய கைவினை தரவு & ஏஐ'
    },
    prototype: {
      title: 'சிருஜன்சேது ஊடாடும் தீர்வு இயந்திரம்',
      subtitle: 'கைவினைஞர்களுக்கான முழுமையான பணிப்பாய்வு: பார்வை வகைப்பாடு, நியாயமான விலை நிர்ணயம் மற்றும் தேவை முன்கணிப்பு.',
      subTabs: {
        cataloger: 'ஏஐ ஸ்மார்ட் அட்டவணை',
        pricing: 'நியாய விலை இயந்திரம்',
        forecast: 'தேவை முன்கணிப்பாளர்',
        marketplace: 'நேரடி சந்தை',
        training: 'புதிய தரவுத்தொகுப்பில் பயிற்றுவிக்கவும்'
      },
      cataloger: {
        cameraTitle: 'மொபைல் கேமரா ஸ்ட்ரீம் (MobileNetV2)',
        cameraSubtitle: '180 மில்லி விநாடிகளில் பட வகைப்பாடு மற்றும் புவிசார் குறியீடு சரிபார்ப்பு',
        giVerified: 'அரசு ஜிஐ சான்றளிக்கப்பட்ட அசல் கலை',
        selectSample: 'வகைப்படுத்த கைவினை மாதிரியைத் தேர்ந்தெடுக்கவும்:',
        analyzingCraft: 'கைவினை மாதிரி ஆய்வு செய்யப்படுகிறது...',
        detectCraft: 'ஏஐ வகைப்பாடு மற்றும் ஜிஐ சரிபார்ப்பைத் தொடங்கு',
        artisanStory: 'கைவினைஞர் பரம்பரை மற்றும் கதை',
        listenStory: 'தாய்மொழியில் கைவினைஞரின் குரலைக் கேளுங்கள்',
        readingVoice: 'தாய்மொழியில் படிக்கப்படுகிறது...',
        stopVoice: 'குரலை நிறுத்து',
        confidence: 'நம்பகத்தன்மை அளவு',
        featuresDetected: 'கண்டறியப்பட்ட கைவினை அம்சங்கள்'
      },
      pricing: {
        title: 'நியாயமான கூலி விலை நிர்ணய மாதிரி',
        subtitle: 'இடைத்தரகர்களின் சுரண்டலைத் தடுத்து கைவினைஞர்களுக்கு நியாயமான ஊதியம் வழங்கும் கணக்கீட்டு முறை.',
        materialCost: 'மூலப்பொருள் செலவு (₹)',
        laborHours: 'உழைத்த நேரம் (மணிநேரம்)',
        livingWageRate: 'நியாயமான கூலி விகிதம் (₹/மணிநேரம்)',
        comparisonTitle: 'பொருளாதார ஒப்பீடு: இடைத்தரகர் சுரண்டல் vs சிருஜன்சேது நேரடி இணைப்பு',
        middlemanExploitation: 'பாரம்பரிய இடைத்தரகர் வலை',
        karigarFairModel: 'சிருஜன்சேது நேரடி நியாய மாதிரி',
        middlemanMarkup: 'இடைத்தரகரின் அதீத லாபம்',
        artisanShare: 'கைவினைஞரின் நிகர பங்கு',
        buyerPrice: 'வாங்குபவரின் இறுதி விலை',
        takeHomeLift: 'கைவினைஞர் வருமானத்தில் நேரடி உயர்வு'
      },
      forecast: {
        title: 'அரிமா (ARIMA) காலவரிசை தேவை முன்கணிப்பு',
        subtitle: 'வீணான உற்பத்தியைத் தடுக்க 30-90 நாட்களுக்கு முன்பே திருவிழா தேவைகளைத் துல்லியமாகக் கணிக்கும் மாதிரி.',
        projectedGrowth: '30 நாட்களில் எதிர்பார்க்கப்படும் தேவை வளர்ச்சி',
        recommendedBatch: 'பரிந்துரைக்கப்பட்ட உற்பத்தி அளவு',
        festivalSurge: 'பண்டிகை கால கூடுதல் தேவை பதிவு'
      },
      marketplace: {
        title: 'நேரடி நுகர்வோர் சந்தை (டைரக்ட் மார்க்கெட்பிளேஸ்)',
        subtitle: 'இடைத்தரகர்கள் இல்லாமல் நுகர்வோரை சான்றளிக்கப்பட்ட ஜிஐ கைவினைஞர்களுடன் நேரடியாக இணைக்கிறது.',
        buyDirect: 'கைவினைஞரிடம் நேரடியாக ஆர்டர் செய்யுங்கள்',
        fairWageCertified: '100% நியாயமான கூலி சான்றளிக்கப்பட்டது',
        artisanPayout: 'கைவினைஞருக்கு 92% நேரடித் தொகை கிடைக்கிறது'
      }
    },
    allIndiaView: {
      title: 'அகில இந்திய கைவினை தரவுத்தொகுப்பு & துல்லிய மாநில கணிப்பான்',
      subtitle: 'அனைத்து இந்திய மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்களின் பாரம்பரிய கைவினை மற்றும் அவற்றின் தாயக மாநிலத்தை அடையாளம் காணும் அமைப்பு.',
      predictorTitle: 'ஏஐ கைவினை & மாநில கணிப்பு இயந்திரம்',
      predictorSubtitle: 'புகைப்படம் மற்றும் அம்சங்களிலிருந்து துல்லியமான கைவினை மற்றும் இந்திய மாநிலத்தைக் கணிக்கிறது.',
      runPredictor: 'கைவினை மற்றும் தாயக மாநிலத்தைக் கண்டறி',
      predicting: 'மாநிலம் மற்றும் கைவினை அடையாளம் காணப்படுகிறது...',
      predictedState: 'கண்டறியப்பட்ட இந்திய மாநிலம்',
      predictedCraft: 'கண்டறியப்பட்ட பாரம்பரிய கைவினை',
      cluster: 'மாவட்டம் / உற்பத்தி மையம்',
      giNumber: 'ஜிஐ டேக் பதிவு எண்',
      fairPrice: 'நியாயமான நேரடி விலை (கைவினைஞருக்கு)',
      middlemanPrice: 'பாரம்பரிய இடைத்தரகர் சில்லறை விலை',
      middlemanMargin: 'இடைத்தரகர் லாப வரம்பு',
      listenPredictionAudio: 'தாய்மொழியில் முழுமையான விளக்கத்தைக் கேளுங்கள்',
      exportJSON: 'இந்திய தரவுத்தொகுப்பு ஏற்றுமதி (JSON)',
      exportCSV: 'இந்திய தரவுத்தொகுப்பு ஏற்றுமதி (CSV)',
      filterState: 'மாநில வாரியாக வடிகட்டு',
      allStates: 'அனைத்து இந்திய மாநிலங்கள் (முழு இந்தியா)',
      filterCategory: 'கைவினை பிரிவு வாரியாக வடிகட்டு',
      allCategories: 'அனைத்து கைவினை பிரிவுகள்',
      searchPlaceholder: 'எந்தவொரு இந்திய கைவினை, மாநிலம் அல்லது மூலப்பொருளைத் தேடுங்கள்...',
      showingCrafts: 'காட்டப்படும் இந்திய பாரம்பரிய கைவினைகள்'
    },
    roadmap: {
      title: 'சிருஜன்சேது வார் ரூம் & 24 மணிநேர பொறியியல் வரைபடம்',
      subtitle: '6 நபர் குழுவிற்கான மணிநேர பணிகள், சார்புகள் மற்றும் சோதனை சாவடிகளின் முழுமையான வரைபடம்.',
      copyMarkdown: 'மார்க் டவுன் நகலெடு',
      downloadMarkdown: 'ROADMAP.md பதிவிறக்கு',
      timelineTitle: 'மணிநேர சோதனை வாயில்கள் (0 மணிநேரம் → 24 மணிநேரம்)',
      rolesTitle: '6 நபர்களின் பொறுப்புகள் மற்றும் விநியோக இலக்குகள்',
      checklistTitle: 'இறுதி சமர்ப்பிப்புக்கு முந்தைய சரிபார்ப்பு பட்டியல்'
    },
    quickref: {
      title: 'ஹேக்கத்தான் விரைவு குறிப்பு & குறியீட்டு தொகுப்புகள்',
      subtitle: 'ஃபாஸ்ட்ஏபிஐ, மொபைல்நெட், ரேண்டம்பாரெஸ்ட் மற்றும் அரிமாவிற்கான முழுமையான குறியீடுகள்.',
      searchPlaceholder: 'குறியீட்டைத் தேடுங்கள் (fastapi, mobilenet, docker)...',
      copyCode: 'குறியீட்டை நகலெடு',
      copied: 'நகலெடுக்கப்பட்டது!'
    },
    pitch: {
      title: 'விளக்கக்காட்சி, 2 நிமிட உரை மற்றும் நடுவர் பாதுகாப்பு',
      subtitle: '120 வினாடி டெலிபிராம்ப்டர், 10 ஸ்லைடுகள் கட்டமைப்பு மற்றும் நடுவரின் 5 கடினமான கேள்விகளுக்கான பதில்கள்.',
      teleprompterTitle: '120 வினாடி டெலிபிராம்ப்டர் & பயிற்சி கடிகாரம்',
      startTimer: 'நேரத்தைத் தொடங்கு',
      resetTimer: 'மீட்டமை',
      slidesTitle: '10 ஸ்லைடுகள் ஹேக்கத்தான் விளக்கக்காட்சி கட்டமைப்பு',
      qaTitle: 'நடுவர் குழுவின் முதல் 5 கடினமான கேள்விகள் & துல்லிய பதில்கள்'
    },
    problem: {
      title: 'சந்தை உண்மை, பொருளாதார ஏற்றத்தாழ்வு & கலாச்சார நெருக்கடி',
      subtitle: '₹40,500 கோடி தொழில் இருந்தும் 66% கைவினைஞர்கள் மாதம் ₹5,000 க்கும் குறைவாக சம்பாதிப்பது ஏன்.',
      totalArtisans: 'மொத்த இந்திய கைவினைஞர்கள்',
      povertyRate: 'கடுமையான வறுமை விகிதம்',
      marketSize: 'கைவினைப்பொருட்கள் சந்தை அளவு (2025)',
      waterfallTitle: 'இடைத்தரகர் சுரண்டல்: ₹1,000 பொருள் எவ்வாறு ₹10,000 ஆக மாறுகிறது'
    },
    footer: {
      builtFor: '65 லட்சம் இந்திய கைத்தறி மற்றும் கைவினை கலைஞர்களுக்காக உருவாக்கப்பட்டது',
      bypassingMiddlemen: 'ஏஐ மூலம் இடைத்தரகர்களை முழுமையாக ஒழித்தல்'
    }
  }
};

/**
 * Text-to-Speech synthesizer helper that speaks strictly in the selected native language!
 */
export function speakNativeLanguage(text: string, lang: LanguageCode, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported');
    onEnd?.();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Language tag mapping
  const langTagMap: Record<LanguageCode, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    gu: 'gu-IN',
    bn: 'bn-IN',
    ta: 'ta-IN'
  };

  utterance.lang = langTagMap[lang] || 'en-IN';
  utterance.rate = 0.92; // slightly measured, natural cadence
  utterance.pitch = 1.0;

  // Try to find a voice that matches the language tag
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.replace('_', '-').startsWith(utterance.lang));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn('SpeechSynthesis error:', e);
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopNativeSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
