export interface IndiaCraftRecord {
  id: string;
  craftName: string;
  nativeNameHindi: string;
  nativeNameRegional: string;
  state: string;
  districtCluster: string;
  category: 'Handloom & Textiles' | 'Pottery & Ceramics' | 'Metalware & Casting' | 'Woodcraft & Lacquer' | 'Paintings & Folk Art' | 'Stone Carving' | 'Natural Fiber & Cane' | 'Leathercraft' | 'Jewellery & Filigree';
  giCertified: boolean;
  giTagNumber: string;
  primaryMaterials: string[];
  traditionalTechniques: string[];
  hallmarkFeatures: string[];
  typicalProductionHours: number;
  artisanFairWageHourly: number;
  artisanFairPayoutINR: number;
  middlemanRetailPriceINR: number;
  middlemanExploitationMarginPercent: number;
  imageUrl: string;
  historicalSignificance: string;
  voiceAudioScript: {
    en: string;
    hi: string;
    gu: string;
    bn: string;
    ta: string;
  };
}

export const ALL_INDIA_CRAFTS_DATASET: IndiaCraftRecord[] = [
  // UTTAR PRADESH
  {
    id: 'banarasi-silk-up',
    craftName: 'Banarasi Brocade & Silk Weaving',
    nativeNameHindi: 'बनारसी रेशम व ज़री बुनाई',
    nativeNameRegional: 'बनारसी साड़ी (Kashi)',
    state: 'Uttar Pradesh',
    districtCluster: 'Varanasi, Chandauli, Mirzapur',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-99',
    primaryMaterials: ['Mulberry Katan silk yarn', 'Real Gold/Silver Zari alloy wire', 'Natural dye bath'],
    traditionalTechniques: ['Pit loom weaving', 'Naksha & Jaala jacquard patterning', 'Kadhwa un-clipped supplementary weft', 'Phekwa shuttle throwing'],
    hallmarkFeatures: ['Kadhwa weave with no floating raw threads at the back', 'Intricate Mughal Kalga and Shikargah motifs', 'Pure silver metallic weight and heavy hand drape'],
    typicalProductionHours: 180,
    artisanFairWageHourly: 160,
    artisanFairPayoutINR: 28800,
    middlemanRetailPriceINR: 75000,
    middlemanExploitationMarginPercent: 160,
    imageUrl: '/images/crafts/banarasi-silk.jpg',
    historicalSignificance: 'Referenced in Buddhist Jataka tales and Rigveda; flourished under Akbar and Shah Jahan blending Persian aesthetics with Hindu symbolism.',
    voiceAudioScript: {
      en: 'Banarasi Brocade from Varanasi, Uttar Pradesh. GI Tag 99. Authentic Kadhwa handloom with pure silver zari requires over 180 hours of master weaving.',
      hi: 'उत्तर प्रदेश के वाराणसी की बनारसी ब्रोकेड रेशम बुनाई। जीआई टैग 99। शुद्ध कढ़वा हथकरघा और ज़री में 180 घंटे से अधिक का समय लगता है।',
      gu: 'ઉત્તર પ્રદેશના વારાણસીની બનારસી રેશમ સાડી. જીઆઈ ટેગ 99. અસલી કઢવા હાથવણાટ માટે 180 કલાકથી વધુ સમય લાગે છે.',
      bn: 'উত্তরপ্রদেশের বারাণসীর বেনারসি রেশম বুনন। জিআই ট্যাগ ৯৯। খাঁটি কাধওয়া হ্যান্ডলুম কারুশিল্প তৈরিতে ১৮০ ঘণ্টার বেশি সময় লাগে।',
      ta: 'உத்தரபிரதேசத்தின் வாரணாசி பனாரசி பட்டு நெசவு. ஜிஐ டேக் 99. தூய வெள்ளி ஜரிகை கொண்ட கைத்தறி கலைக்கு 180 மணிநேரம் உழைப்பு தேவைப்படுகிறது.'
    }
  },
  {
    id: 'chikankari-lucknow-up',
    craftName: 'Lucknow Chikankari Shadow Embroidery',
    nativeNameHindi: 'लखनऊ चिकनकारी हस्तशिल्प',
    nativeNameRegional: 'चिकनकारी (Chikan)',
    state: 'Uttar Pradesh',
    districtCluster: 'Lucknow, Barabanki',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-119',
    primaryMaterials: ['Fine Mulmul muslin / Georgette', 'Untwisted white cotton thread (Tari)'],
    traditionalTechniques: ['Bakhiya shadow reverse herringbone', 'Tepchi running stitch', 'Keel Kangan knot stitch', 'Jaali needle hole trellis'],
    hallmarkFeatures: ['Translucent shadow effect visible on fabric face', 'Delicate un-pierced warp jaali lattice', 'Exclusively hand-stitched organic irregularities'],
    typicalProductionHours: 72,
    artisanFairWageHourly: 140,
    artisanFairPayoutINR: 10080,
    middlemanRetailPriceINR: 26000,
    middlemanExploitationMarginPercent: 158,
    imageUrl: '/images/crafts/chikankari-embroidery.jpg',
    historicalSignificance: 'Patronized by Empress Nur Jahan in the 17th century and perfected under the Nawabs of Awadh as aristocratic summer muslin attire.',
    voiceAudioScript: {
      en: 'Lucknow Chikankari from Uttar Pradesh. GI Tag 119. Intricate hand-embroidery featuring 36 distinct stitches including Bakhiya and Jaali.',
      hi: 'उत्तर प्रदेश की प्रसिद्ध लखनऊ चिकनकारी। जीआई टैग 119। बखिया और जाली सहित 36 विभिन्न हाथ की सुई टांकों से निर्मित।',
      gu: 'ઉત્તર પ્રદેશની લખનૌ ચિકનકારી. જીઆઈ ટેગ 119. બખીયા અને જાળી સહિત 36 વિશિષ્ટ હાથની સોય ટાંકાઓથી બનેલી.',
      bn: 'উত্তরপ্রদেশের লক্ষ্ণৌ চিকনকারি সূচিকর্ম। জিআই ট্যাগ ১১৯। বখিয়া এবং জালি সহ ৩৬টি জটিল হাতের সেলাইয়ে তৈরি।',
      ta: 'உத்தரபிரதேச லக்னோ சிக்கன்காரி கைவினை. ஜிஐ டேக் 119. பக்தியா மற்றும் ஜாலி உட்பட 36 தனித்துவமான தையல் முறைகளைக் கொண்டது.'
    }
  },
  {
    id: 'moradabad-brass-up',
    craftName: 'Moradabad Engraved Brassware',
    nativeNameHindi: 'मुरादाबाद पीतल नक्काशी शिल्प',
    nativeNameRegional: 'पीतलनगरी शिल्प',
    state: 'Uttar Pradesh',
    districtCluster: 'Moradabad, Sambhal',
    category: 'Metalware & Casting',
    giCertified: true,
    giTagNumber: 'GI-481',
    primaryMaterials: ['Brass (Copper-Zinc alloy)', 'Natural Lac pitch resin filler', 'Engraving chisels (Kalam)'],
    traditionalTechniques: ['Sand casting foundry molding', 'Naqqaashi fine hand champlevé engraving', 'Gidai surface chasing', 'Coloured lac filling & polishing'],
    hallmarkFeatures: ['Sharp deep chisel relief grooves', 'Vibrant black or colored lac inlays flush with polished brass', 'Heavy resonance sound when tapped'],
    typicalProductionHours: 36,
    artisanFairWageHourly: 150,
    artisanFairPayoutINR: 5400,
    middlemanRetailPriceINR: 14500,
    middlemanExploitationMarginPercent: 168,
    imageUrl: '/images/crafts/moradabad-brass.jpg',
    historicalSignificance: 'Established in the 16th century, earning Moradabad the global moniker Peetal Nagari (Brass City).',
    voiceAudioScript: {
      en: 'Moradabad Brassware from Uttar Pradesh. GI Tag 481. Hand-chiseled Naqqaashi metal craft with colored lac inlay.',
      hi: 'उत्तर प्रदेश का मुरादाबाद पीतल शिल्प। जीआई टैग 481। हाथ से नक्काशी और लाक इनले से तैयार अनूठी धातु कला।',
      gu: 'ઉત્તર પ્રદેશનું મુરાદાબાદ પિત્તળ શિલ્પ. જીઆઈ ટેગ 481. હાથથી કોતરણી અને રંગીન લાખ જડતર સાથે બનેલું.',
      bn: 'উত্তরপ্রদেশের মোরাদাবাদ পিতলের কারুশিল্প। জিআই ট্যাগ ৪৮১। হাতে নকশা কাটা সূক্ষ্ম ধাতব শিল্প।',
      ta: 'உத்தரபிரதேசத்தின் மொராதாபாத் பித்தளை கைவினை. ஜிஐ டேக் 481. கைகளால் செதுக்கப்பட்ட வண்ண அரக்கு பதிக்கப்பட்ட உலோகம்.'
    }
  },

  // RAJASTHAN
  {
    id: 'blue-pottery-jaipur-rj',
    craftName: 'Jaipur Blue Pottery',
    nativeNameHindi: 'जयपुर नीली मृदभांड कला',
    nativeNameRegional: 'जयपुर ब्लू पॉटरी',
    state: 'Rajasthan',
    districtCluster: 'Jaipur, Kot Jewar',
    category: 'Pottery & Ceramics',
    giCertified: true,
    giTagNumber: 'GI-43',
    primaryMaterials: ['Quartz powder', 'Fuller’s earth (Multani Mitti)', 'Katira natural gum', 'Cobalt oxide (Blue) & Copper oxide (Green)'],
    traditionalTechniques: ['Clay-free dough kneading', 'Open mold hand-pressing', 'Freehand squirrel-hair brush painting', 'Low-temperature kiln glazing (800°C)'],
    hallmarkFeatures: ['Zero clay used in dough; made of quartz stone powder', 'Brilliant Persian turquoise and cobalt glaze', 'Semi-translucent vitreous ceramic finish'],
    typicalProductionHours: 42,
    artisanFairWageHourly: 150,
    artisanFairPayoutINR: 6300,
    middlemanRetailPriceINR: 16500,
    middlemanExploitationMarginPercent: 162,
    imageUrl: '/images/crafts/blue-pottery-vase.jpg',
    historicalSignificance: 'Introduced to Jaipur by Maharaja Sawai Ram Singh II in the 19th century from Turko-Persian artisans.',
    voiceAudioScript: {
      en: 'Jaipur Blue Pottery from Rajasthan. GI Tag 43. Unique clay-free ceramic made from crushed quartz and cobalt mineral glaze.',
      hi: 'राजस्थान की जयपुर ब्लू पॉटरी। जीआई टैग 43। बिना मिट्टी के पिसे हुए क्वार्ट्ज और कोबाल्ट से बनी विश्व प्रसिद्ध नीली कला।',
      gu: 'રાજસ્થાનની જયપુર બ્લુ પોટરી. જીઆઈ ટેગ 43. માટી વગર ક્વાર્ટઝ પાઉડર અને કોબાલ્ટ ગ્લેઝથી બનેલી કળા.',
      bn: 'রাজস্থানের জয়পুর ব্লু পটারি। জিআই ট্যাগ ৪৩। মাটি ছাড়া কোয়ার্টজ পাথর গুঁড়ো ও কোবাল্ট রঙে তৈরি সিরামিক।',
      ta: 'ராஜஸ்தானின் ஜெய்ப்பூர் நீல மட்பாண்டம். ஜிஐ டேக் 43. களிமண் இல்லாமல் குவார்ட்ஸ் மற்றும் கோபால்ட் மூலம் வடிவமைக்கப்பட்டது.'
    }
  },
  {
    id: 'sanganeri-block-rj',
    craftName: 'Sanganeri Hand Block Printing',
    nativeNameHindi: 'सांगानेरी हस्त ठप्पा छपाई',
    nativeNameRegional: 'सांगानेरी प्रिंट (Dhoondhar)',
    state: 'Rajasthan',
    districtCluster: 'Jaipur (Sanganer)',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-52',
    primaryMaterials: ['Pure cotton/silk fabric', 'Teak wood carved printing blocks (Bunta)', 'Natural vegetable and mineral dyes'],
    traditionalTechniques: ['Teak block chisel carving', 'Gud-kachuka mud resist printing', 'Pinpoint manual registration stamping', 'Sun bleaching and river washing'],
    hallmarkFeatures: ['Crisp delicate floral sprigs (Bootis) with fine outlines', 'Pure white or pale off-white fabric backgrounds', 'Gentle block alignment variations proving manual stamping'],
    typicalProductionHours: 24,
    artisanFairWageHourly: 140,
    artisanFairPayoutINR: 3360,
    middlemanRetailPriceINR: 8500,
    middlemanExploitationMarginPercent: 153,
    imageUrl: '/images/crafts/ajrakh-block-print.jpg',
    historicalSignificance: 'Flourished during the 16th and 17th centuries under Rajput patronage, utilizing the unique mineral waters of the Sanjharia river.',
    voiceAudioScript: {
      en: 'Sanganeri Hand Block Print from Rajasthan. GI Tag 52. Intricate wooden block hand stamping on pure cotton using natural dyes.',
      hi: 'राजस्थान की सांगानेरी हस्त ठप्पा छपाई। जीआई टैग 52। सागवान की लकड़ी के ब्लॉकों और प्राकृतिक रंगों से हाथ से छपाई।',
      gu: 'રાજસ્થાનનું સાંગાનેરી બ્લોક પ્રિન્ટિંગ. જીઆઈ ટેગ 52. કુદરતી રંગો અને સાગના લાકડાના બ્લોક્સથી હાથથી છાપકામ.',
      bn: 'রাজস্থানের সাঙ্গানেরি হ্যান্ড ব্লক প্রিন্টিং। জিআই ট্যাগ ৫২। খাঁটি সুতির কাপড়ে প্রাকৃতিক রঙের নিখুঁত কাঠের ব্লক ছাপ।',
      ta: 'ராஜஸ்தானின் சங்கனேரி பிளாக் பிரிண்டிங். ஜிஐ டேக் 52. இயற்கை சாயங்கள் மற்றும் மர அச்சு கொண்டு கைகளால் அச்சிடப்படும் கலை.'
    }
  },

  // GUJARAT
  {
    id: 'patan-patola-gj',
    craftName: 'Patan Patola Double Ikat Silk',
    nativeNameHindi: 'पाटण पटोला डबल इकत रेशम',
    nativeNameRegional: 'પાટણનું પટોળું (Patan Patola)',
    state: 'Gujarat',
    districtCluster: 'Patan',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-232',
    primaryMaterials: ['Mulberry 8-ply silk yarn', 'Natural madder, turmeric, marigold, indigo dyes'],
    traditionalTechniques: ['Double Ikat resist tying (warp and weft both tied)', 'Geometric mathematical tie-dye alignment', 'Slanted rosewood sword handloom (Vaal)', 'Bamboo needle pick placement'],
    hallmarkFeatures: ['Identical color intensity and sharp design on BOTH front and back', 'Never loses color for over 300 years', 'Distinctive geometric Bhat motifs (Nari-Kunjar, Chhabdi)'],
    typicalProductionHours: 720,
    artisanFairWageHourly: 250,
    artisanFairPayoutINR: 180000,
    middlemanRetailPriceINR: 450000,
    middlemanExploitationMarginPercent: 150,
    imageUrl: '/images/crafts/patan-patola.jpg',
    historicalSignificance: 'Protected by the Salvi weaver family since King Kumarpal (12th century). Only 3 master families preserve this complex art today.',
    voiceAudioScript: {
      en: 'Patan Patola Double Ikat from Gujarat. GI Tag 232. Mathematical marvel requiring up to 6 months to weave with identical front and back vibrancy.',
      hi: 'गुजरात का विश्वविख्यात पाटण पटोला। जीआई टैग 232। गणितीय डबल इकत बुनाई, जिसमें आगे और पीछे दोनों तरफ एक समान चमक होती है।',
      gu: 'ગુજરાતનું અતિપ્રસિદ્ધ પાટણનું પટોળું. જીઆઈ ટેગ 232. બંને બાજુ એક સરખી ભાત ધરાવતું વિશ્વ વિખ્યાત ડબલ ઇકત વણાટ.',
      bn: 'গুজরাটের পাটন পাটোলা ডাবল ইকৎ রেশম। জিআই ট্যাগ ২৩২। সামনে ও পেছনে হুবহু একই রকম নিখুঁত নকশা তৈরিতে কয়েক মাস সময় লাগে।',
      ta: 'குஜராத்தின் பதான் படோலா பட்டு. ஜிஐ டேக் 232. முன்புறம் மற்றும் பின்புறம் சமமான துல்லியமான நிறம் கொண்ட டபுள் இக்கத் நெசவு.'
    }
  },
  {
    id: 'rogan-art-kutch-gj',
    craftName: 'Kutch Rogan Painting on Fabric',
    nativeNameHindi: 'कच्छ रोगन कला (कैस्टर ऑयल पेंटिंग)',
    nativeNameRegional: 'રોગન આર્ટ (Nirona Kutch)',
    state: 'Gujarat',
    districtCluster: 'Kutch (Nirona village)',
    category: 'Paintings & Folk Art',
    giCertified: true,
    giTagNumber: 'GI-602',
    primaryMaterials: ['Cold-pressed Castor oil (boiled 12 hours)', 'Natural earth and mineral stone pigments'],
    traditionalTechniques: ['Boiled castor oil paste thickening into residue', 'Palm-warmed thread stretching with iron stylus', 'Freehand thread guiding into air onto cloth', 'Fabric mirror-folding for bilateral symmetry'],
    hallmarkFeatures: ['Raised rubbery glossy paint relief on cloth', 'Stylus never touches cloth; guided in air by oil thread tension', 'Intricate Tree of Life (Kalpavriksha) motifs'],
    typicalProductionHours: 48,
    artisanFairWageHourly: 180,
    artisanFairPayoutINR: 8640,
    middlemanRetailPriceINR: 25000,
    middlemanExploitationMarginPercent: 189,
    imageUrl: '/images/crafts/rogan-art.jpg',
    historicalSignificance: 'Preserved by the Khatri family in Nirona village, Kutch for over 300 years; famously gifted by Prime Minister Modi to the US President.',
    voiceAudioScript: {
      en: 'Kutch Rogan Art from Gujarat. GI Tag 602. Hand-painted using boiled castor oil paste and metal stylus without touching the fabric directly.',
      hi: 'गुजरात के कच्छ की रोगन चित्रकला। जीआई टैग 602। उबले अरंडी के तेल और लोहे की सलाई से बिना कपड़े को छुए हवा में बनाई जाने वाली अद्भुत कला।',
      gu: 'ગુજરાતના કચ્છની રોગન આર્ટ. જીઆઈ ટેગ 602. ઉકાળેલા એરંડાના તેલ અને ધાતુની સળી વડે કાપડને અડ્યા વગર હવામાં દોરાતી અનોખી કળા.',
      bn: 'গুজরাটের কচ্ছ রোগান চিত্রশিল্প। জিআই ট্যাগ ৬০২। সেদ্ধ রেড়ির তেল ও ধাতব শলাকা দিয়ে তৈরি ত্রিমাত্রিক অসাধারণ শিল্প।',
      ta: 'குஜராத்தின் கட்ச் ரோகன் ஓவியம். ஜிஐ டேக் 602. கொதிக்க வைத்த ஆமணக்கு எண்ணெய் பசை கொண்டு துணியில் வரையப்படும் அரிய பாரம்பரிய கலை.'
    }
  },

  // WEST BENGAL
  {
    id: 'shantiniketan-leather-wb',
    craftName: 'Shantiniketan Embossed Leather Craft',
    nativeNameHindi: 'शांतिनिकेतन उत्कीर्ण चमड़ा शिल्प',
    nativeNameRegional: 'শান্তিনিকেতন চামড়ার কাজ',
    state: 'West Bengal',
    districtCluster: 'Birbhum (Bolpur, Sriniketan)',
    category: 'Leathercraft',
    giCertified: true,
    giTagNumber: 'GI-87',
    primaryMaterials: ['Vegetable-tanned E.I. goat skin and sheep skin', 'Natural spirit touch colors', 'Embossing wooden batons'],
    traditionalTechniques: ['Glass-plate leather softening', 'Batik wax resist on leather', 'Hand-press relief metal/wood plate embossing', 'Touch pad mineral spirit dye layering'],
    hallmarkFeatures: ['Tactile raised relief patterns with dual-tone shading', 'Intricate folk motifs of Santhal village life and floral vines', 'Natural vegetal aroma without synthetic chemical odor'],
    typicalProductionHours: 20,
    artisanFairWageHourly: 140,
    artisanFairPayoutINR: 2800,
    middlemanRetailPriceINR: 7500,
    middlemanExploitationMarginPercent: 167,
    imageUrl: '/images/crafts/wooden-carving.jpg',
    historicalSignificance: 'Pioneered by Rabindranath Tagore and Rathindranath Tagore at Sriniketan in the 1920s to revive rural self-reliance.',
    voiceAudioScript: {
      en: 'Shantiniketan Leather Craft from West Bengal. GI Tag 87. Handcrafted embossed vegetable-tanned leather featuring folk Santhal motifs.',
      hi: 'पश्चिम बंगाल का शांतिनिकेतन उभरा चमड़ा शिल्प। जीआई टैग 87। रवींद्रनाथ टैगोर द्वारा शुरू किया गया प्राकृतिक वनस्पति चमड़े का हस्तशिल्प।',
      gu: 'પશ્ચિમ બંગાળનું શાંતિનિકેતન ચર્મ શિલ્પ. જીઆઈ ટેગ 87. કુદરતી ચામડા પર હાથથી ઉપસાવેલી સુંદર લોકકળા.',
      bn: 'পশ্চিমবঙ্গের শান্তিনিকেতন এমবসড চামড়ার শিল্প। জিআই ট্যাগ ৮৭। রবীন্দ্রনাথ ঠাকুর প্রবর্তিত প্রাকৃতিক পাকা চামড়ার অসাধারণ হস্তশিল্প।',
      ta: 'மேற்கு வங்காளத்தின் சாந்திநிகேதன் தோல் கைவினை. ஜிஐ டேக் 87. தாவரப் பதனிடப்பட்ட தோலில் செதுக்கப்பட்ட அழகிய பாரம்பரிய கலை.'
    }
  },
  {
    id: 'dhokra-bengal-wb',
    craftName: 'Bikna Bankura Dhokra Casting',
    nativeNameHindi: 'बांकुरा ढोकरा धातु शिल्प',
    nativeNameRegional: 'বাঁকুড়া ডোকরা মেটাল ক্রাফট',
    state: 'West Bengal',
    districtCluster: 'Bankura (Bikna), Purulia',
    category: 'Metalware & Casting',
    giCertified: true,
    giTagNumber: 'GI-533',
    primaryMaterials: ['Recycled brass scrap & bronze', 'Natural wild bee wax & Dammar resin', 'River silt and red clay core'],
    traditionalTechniques: ['Wax wire extrusion through piston (Janta)', 'Beeswax spiral wrapping over clay core', 'Refractory earthen jacket enclosure', 'Open firewood pit lost-wax melting'],
    hallmarkFeatures: ['Fine spiraling thread-wound metallic texture', 'Zero joints or welds (monolithic casting)', 'Rustic antique matte finish without commercial high gloss'],
    typicalProductionHours: 26,
    artisanFairWageHourly: 150,
    artisanFairPayoutINR: 3900,
    middlemanRetailPriceINR: 10500,
    middlemanExploitationMarginPercent: 169,
    imageUrl: '/images/crafts/dhokra-bronze.jpg',
    historicalSignificance: 'Carried out by the nomadic Karmakar metal smiths for over four millennia, reflecting Indus Valley lost-wax metallurgy.',
    voiceAudioScript: {
      en: 'Dhokra Metal Craft from Bankura, West Bengal. GI Tag 533. 4,000-year-old lost-wax bell metal casting with distinct wax-wire textures.',
      hi: 'पश्चिम बंगाल के बांकुरा का ढोकरा धातु शिल्प। जीआई टैग 533। 4,000 साल पुरानी मोम-तार ढलाई पद्धति से निर्मित धातु कला।',
      gu: 'પશ્ચિમ બંગાળના બાંકુરાનું ધોકરા ધાતુ શિલ્પ. જીઆઈ ટેગ 533. 4000 વર્ષ જૂની લોસ્ટ-વેક્સ પદ્ધતિથી બનતી પ્રાચીન કળા.',
      bn: 'পশ্চিমবঙ্গের বাঁকুড়া ও বিকনার ডোকরা ধাতব শিল্প। জিআই ট্যাগ ৫৩৩। ৪,০০০ বছরের প্রাচীন মোম গলানো কাস্টিং পদ্ধতির মাস্টারপিস।',
      ta: 'மேற்கு வங்காள பாங்குரா டோக்ரா உலோகக் கைவினை. ஜிஐ டேக் 533. 4,000 ஆண்டுகள் பழமையான மெழுகு உருக்கல் உலோக கலை.'
    }
  },

  // ODISHA
  {
    id: 'pattachitra-raghurajpur-od',
    craftName: 'Raghurajpur Pattachitra Cloth Scroll',
    nativeNameHindi: 'रघुराजपुर पट्टचित्र चित्रकला',
    nativeNameRegional: 'ପଟ୍ଟଚିତ୍ର (Raghurajpur Pattachitra)',
    state: 'Odisha',
    districtCluster: 'Puri (Raghurajpur Heritage Village)',
    category: 'Paintings & Folk Art',
    giCertified: true,
    giTagNumber: 'GI-86',
    primaryMaterials: ['Cotton Patti cloth glued with tamarind seed gum', 'Conch shell white (Shankha)', 'Hingula cinnabar red', 'Haritala yellow', 'Lamp soot black'],
    traditionalTechniques: ['Tamarind gum chalk stone paste canvas priming', 'Fine mouse-hair brush drawing', 'Mineral color filling with tree gum binder', 'Lacquer glazing over glowing charcoal'],
    hallmarkFeatures: ['Strict classical iconographic rules of Lord Jagannath', 'Intricate decorative border frame surrounding every scene', 'All colors derived 100% from sea shells and crushed stones'],
    typicalProductionHours: 54,
    artisanFairWageHourly: 160,
    artisanFairPayoutINR: 8640,
    middlemanRetailPriceINR: 24000,
    middlemanExploitationMarginPercent: 177,
    imageUrl: '/images/crafts/folk-art-madhubani.jpg',
    historicalSignificance: 'Associated with the 12th-century Jagannath Temple Anavasara ritual, replacing deities during sacred bath seclusion.',
    voiceAudioScript: {
      en: 'Raghurajpur Pattachitra from Odisha. GI Tag 86. Ancient mythological cloth painting made with conch shell white and mineral pigments.',
      hi: 'ओडिशा का रघुराजपुर पट्टचित्र। जीआई टैग 86। शंख और प्राकृतिक खनिजों से कपड़े के पट्ट पर उकेरी गई पौराणिक कला।',
      gu: 'ઓડિશાનું રઘુરાજપુર પટ્ટચિત્ર. જીઆઈ ટેગ 86. શંખ અને કુદરતી ખનિજ પથ્થરોના રંગો વડે કાપડ પર દોરાયેલ પૌરાણિક ચિત્રકળા.',
      bn: 'ওড়িশার রঘুরাজপুর পট্টচিত্র। জিআই ট্যাগ ৮৬। শঙ্খ ও প্রাকৃতিক খনিজ রঙে কাপড়ের পটে আঁকা প্রাচীন ঐতিহ্যবাহী চিত্র।',
      ta: 'ஒடிசாவின் ரகுராஜ்பூர் பட்டச்சித்ரா ஓவியம். ஜிஐ டேக் 86. சங்கு சுண்ணாம்பு மற்றும் இயற்கை தாதுக்களால் துணியில் தீட்டப்படும் கலை.'
    }
  },
  {
    id: 'cuttack-silver-filigree-od',
    craftName: 'Cuttack Silver Filigree (Tarakasi)',
    nativeNameHindi: 'कटक तारकशी रजत शिल्प',
    nativeNameRegional: 'ତାରକସି (Cuttack Tarakasi)',
    state: 'Odisha',
    districtCluster: 'Cuttack',
    category: 'Jewellery & Filigree',
    giCertified: true,
    giTagNumber: 'GI-752',
    primaryMaterials: ['99.9% Pure fine silver ingot', 'Borax flux (Suhaga)', 'Charcoal soldering hearth'],
    traditionalTechniques: ['Silver bar drawing through diamond die plates to hair thinness', 'Wire crimping and zig-zag zigzagging', 'Framework soldering with blowpipe and borax', 'Tamarind water boiling and wire brushing'],
    hallmarkFeatures: ['Spider-web gossamer silver lightness', 'Made entirely of micro-thin twisted wires without solid plates', 'Intricate Konark wheel and rose motifs'],
    typicalProductionHours: 40,
    artisanFairWageHourly: 180,
    artisanFairPayoutINR: 7200,
    middlemanRetailPriceINR: 19500,
    middlemanExploitationMarginPercent: 170,
    imageUrl: '/images/crafts/brass-craft.jpg',
    historicalSignificance: 'Dating back over 500 years in Cuttack, connected to ancient maritime Kalinga trade with Indonesia and Persia.',
    voiceAudioScript: {
      en: 'Cuttack Silver Filigree Tarakasi from Odisha. GI Tag 752. Exquisite gossamer lace metalwork formed from hair-thin pure silver wires.',
      hi: 'ओडिशा के कटक की तारकशी रजत कला। जीआई टैग 752। बाल जितने पतले शुद्ध चांदी के तारों से हाथ से बुनी गई जाल जैसी कला।',
      gu: 'ઓડિશાના કટકનું તારકસી સિલ્વર ફિલિગ્રી. જીઆઈ ટેગ 752. વાળ જેવા પાતળા શુદ્ધ ચાંદીના તારથી ગૂંથેલી અદ્ભુત ધાતુ કળા.',
      bn: 'ওড়িশার কটক রৌপ্য তারকাশি শিল্প। জিআই ট্যাগ ৭৫২। চুলের মতো সূক্ষ্ম খাঁটি রূপার তার দিয়ে হাতে তৈরি অনন্য জালির কাজ।',
      ta: 'ஒடிசாவின் கட்டாக் தாரகாசி வெள்ளி கைவினை. ஜிஐ டேக் 752. முடி போன்ற மெல்லிய தூய வெள்ளி கம்பிகளால் பின்னப்படும் மாயாஜால கலை.'
    }
  },

  // ASSAM
  {
    id: 'muga-silk-sualkuchi-as',
    craftName: 'Assam Golden Muga Silk Weave',
    nativeNameHindi: 'असम मूगा स्वर्ण रेशम बुनाई',
    nativeNameRegional: 'মুগা ৰেচম (Muga Silk Sualkuchi)',
    state: 'Assam',
    districtCluster: 'Kamrup (Sualkuchi - Silk Village)',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-55',
    primaryMaterials: ['100% Wild endemic Muga silkworm silk (Antheraea assamensis)', 'Som and Soalu tree leaves'],
    traditionalTechniques: ['Outdoor wild silkworm rearing', 'Hand spinning on Takli / Charkha', 'Traditional Assam throw-shuttle / fly-shuttle handloom', 'Extra weft Kingkhap motif weaving'],
    hallmarkFeatures: ['Natural gleaming golden-yellow luster that intensifies with every wash', 'Endemic strictly to Assam; cannot be cultivated elsewhere', 'Naturally UV-resistant and outlasts the lifetime of the wearer'],
    typicalProductionHours: 120,
    artisanFairWageHourly: 180,
    artisanFairPayoutINR: 21600,
    middlemanRetailPriceINR: 58000,
    middlemanExploitationMarginPercent: 168,
    imageUrl: '/images/crafts/tussar-silk.jpg',
    historicalSignificance: 'Protected under Royal Ahom decree; commoners were once forbidden from wearing full Muga garments.',
    voiceAudioScript: {
      en: 'Assam Golden Muga Silk. GI Tag 55. Rare golden silk found only in the Brahmaputra valley that shines brighter with every wash.',
      hi: 'असम का स्वर्ण मूगा रेशम। जीआई टैग 55। दुनिया का एकमात्र प्राकृतिक सुनहरा रेशम, जो हर धुलाई के साथ और अधिक चमकता है।',
      gu: 'આસામનું ગોલ્ડન મુગા સિલ્ક. જીઆઈ ટેગ 55. કુદરતી સોનેરી ચમક ધરાવતું રેશમ, જે દરેક ધોવાણ પછી વધુ ચમકે છે.',
      bn: 'আসামের সোনালী মুগা সিল্ক। জিআই ট্যাগ ৫৫। বিশ্বের একমাত্র প্রাকৃতিক সোনালী রেশম যা ধোয়ার পর আরো উজ্জ্বল হয়।',
      ta: 'அசாமின் தங்க நிற முகா பட்டு. ஜிஐ டேக் 55. பிரம்மபுத்திரா பள்ளத்தாக்கில் மட்டுமே கிடைக்கும் துவைக்க துவைக்க பளபளக்கும் இயற்கை பட்டு.'
    }
  },

  // TAMIL NADU
  {
    id: 'kanchipuram-silk-tn',
    craftName: 'Kanchipuram Korvai Silk Saree',
    nativeNameHindi: 'कांचीपुरम कोरवई रेशम साड़ी',
    nativeNameRegional: 'காஞ்சிபுரம் பட்டு (Kanchipuram Pattu)',
    state: 'Tamil Nadu',
    districtCluster: 'Kanchipuram',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-4',
    primaryMaterials: ['South Indian 3-ply Mulberry silk yarn', 'Surat silver zari with 57% silver and 0.6% gold coating', 'Natural rice starch sizing'],
    traditionalTechniques: ['Interlocking Korvai weave with two weavers simultaneously', 'Three-shuttle body and border jointure', 'Petni border warp replacement technique', 'Mupperum temple motifs'],
    hallmarkFeatures: ['Contrast border interlocked so tightly that fabric will tear before border separates', 'Heavy weight exceeding 750 to 900 grams', 'Authentic temple gopuram and Mayil (peacock) motifs'],
    typicalProductionHours: 160,
    artisanFairWageHourly: 170,
    artisanFairPayoutINR: 27200,
    middlemanRetailPriceINR: 72000,
    middlemanExploitationMarginPercent: 164,
    imageUrl: '/images/crafts/kanchipuram-silk.jpg',
    historicalSignificance: 'Dating from the Chola and Vijayanagara dynasties; legendary weavers considered descendants of Sage Markanda.',
    voiceAudioScript: {
      en: 'Kanchipuram Silk from Tamil Nadu. GI Tag 4. Legendary Korvai interlocking handloom weave weighing over 800 grams of pure silk and gold zari.',
      hi: 'तमिलनाडु की कांचीपुरम कोरवई रेशम साड़ी। जीआई टैग 4। दो बुनकरों द्वारा एक साथ बुनी जाने वाली भारी रेशम और सोने की ज़री वाली कला।',
      gu: 'તમિલનાડુની કાંચીપુરમ કોરવઈ સિલ્ક સાડી. જીઆઈ ટેગ 4. બે વણકરો દ્વારા એકસાથે વણાતી શુદ્ધ સોના-ચાંદી જરીવાળી ભવ્ય સાડી.',
      bn: 'তামিলনাড়ুর কাঞ্চিপুরম কোরভাই সিল্ক শাড়ি। জিআই ট্যাগ ৪। দুই তাঁতীর যৌথ দক্ষতায় বোনা খাঁটি রেশম ও জরি নকশার বিশ্বখ্যাত শাড়ি।',
      ta: 'தமிழ்நாட்டின் காஞ்சிபுரம் பட்டு. ஜிஐ டேக் 4. இரண்டு நெசவாளர்களால் ஒரே நேரத்தில் நெய்யப்படும் பாரம்பரிய கோர்வை கைத்தறி கலை.'
    }
  },
  {
    id: 'thanjavur-paintings-tn',
    craftName: 'Thanjavur Gold Leaf Painting',
    nativeNameHindi: 'तंजாவूर स्वर्ण पत्र चित्रकला',
    nativeNameRegional: 'தஞ்சாவூர் ஓவியம் (Thanjavur Oviyam)',
    state: 'Tamil Nadu',
    districtCluster: 'Thanjavur, Trichy',
    category: 'Paintings & Folk Art',
    giCertified: true,
    giTagNumber: 'GI-22',
    primaryMaterials: ['Jackfruit wood board (Palagai)', 'Unbleached cloth and Arabic gum limestone paste (Chunnam)', '22K Pure Gold Foil', 'Jaipur glass gems and semi-precious stones'],
    traditionalTechniques: ['Palagai board cloth sizing with tamarind gum', 'Gesso relief work (Sukka) creating 3D raised jewelry and pillars', 'Gold leaf pressing and burnishing', 'Mineral dye face rendering'],
    hallmarkFeatures: ['Substantial 3D gesso relief underneath gleaming gold foil', 'Brilliant sparkle under ambient lamp light', 'Rounded divine faces with almond eyes'],
    typicalProductionHours: 60,
    artisanFairWageHourly: 160,
    artisanFairPayoutINR: 9600,
    middlemanRetailPriceINR: 26000,
    middlemanExploitationMarginPercent: 170,
    imageUrl: '/images/crafts/thanjavur-painting.jpg',
    historicalSignificance: 'Originated in the 16th century under Thanjavur Nayaks and perfected under Maratha ruler Serfoji II.',
    voiceAudioScript: {
      en: 'Thanjavur Painting from Tamil Nadu. GI Tag 22. Famous 3D relief painting adorned with pure 22-karat gold leaf and precious stones.',
      hi: 'तमिलनाडु की तंजौर स्वर्ण चित्रकला। जीआई टैग 22। 22 कैरेट शुद्ध सोने के वर्क और रत्नों से सजी उभरी हुई दिव्य कलाकृति।',
      gu: 'તમિલનાડુની તંજાવુર ચિત્રકળા. જીઆઈ ટેગ 22. 22 કેરેટ શુદ્ધ સોનાના વરખ અને રત્નોથી સજાવેલી ભવ્ય ત્રિ-પરિમાણીય ચિત્રકળા.',
      bn: 'তামিলনাড়ুর তাঞ্জাভুর চিত্রকর্ম। জিআই ট্যাগ ২২। খাঁটি ২২ ক্যারেট সোনার পাত ও রত্ন খচিত ত্রিমাত্রিক দেবমূর্তি চিত্র।',
      ta: 'தமிழ்நாட்டின் தஞ்சாவூர் ஓவியம். ஜிஐ டேக் 22. 22 காரட் தூய தங்க இலைகள் மற்றும் ரத்தினக் கற்கள் பதிக்கப்பட்ட முப்பரிமாண ஓவியக் கலை.'
    }
  },

  // JAMMU & KASHMIR
  {
    id: 'kashmir-pashmina-jk',
    craftName: 'Kashmir Handspun Pashmina Shawl',
    nativeNameHindi: 'कश्मीर हस्तनिर्मित पश्मीना शॉल',
    nativeNameRegional: 'کشمیر پشمینہ (Kashmiri Pashmina)',
    state: 'Jammu & Kashmir',
    districtCluster: 'Srinagar, Budgam, Ganderbal',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-46',
    primaryMaterials: ['Underfleece of Changthangi mountain goat (Capra hircus) 12-15 microns', 'Natural walnut and saffron dyes'],
    traditionalTechniques: ['Hand-spinning on Yinder wooden wheel', 'Handloom weaving with rice starch sizing', 'Needle Sozni embroidery (Kashidakari) or Kani wooden bobbin weave'],
    hallmarkFeatures: ['Microscopic fiber fineness (12-15 microns, 6x thinner than human hair)', 'Passes effortlessly through a small finger ring', 'Incredible warmth with virtually zero weight'],
    typicalProductionHours: 240,
    artisanFairWageHourly: 175,
    artisanFairPayoutINR: 42000,
    middlemanRetailPriceINR: 110000,
    middlemanExploitationMarginPercent: 161,
    imageUrl: '/images/crafts/pashmina-cashmere.jpg',
    historicalSignificance: 'Introduced by 14th-century saint Mir Sayyid Ali Hamadani; patronized by Napoleon Bonaparte who gifted it to Empress Joséphine.',
    voiceAudioScript: {
      en: 'Kashmir Pashmina Shawl. GI Tag 46. Hand-spun from Changthangi goat wool at 14 microns, passing effortlessly through a finger ring.',
      hi: 'कश्मीर का हस्तनिर्मित पश्मीना शॉल। जीआई टैग 46। लद्दाख की चांगथांगी बकरी की 14 माइक्रोन ऊन से हाथ से बुना गया दुनिया का सबसे हल्का व गर्म शॉल।',
      gu: 'કાશ્મીરનું પશ્મિના શાલ. જીઆઈ ટેગ 46. 14 માઇક્રોન ફાઇન ઊનમાંથી હાથથી કાંતેલી, વીંટીમાંથી સરળતાથી પસાર થતી શાલ.',
      bn: 'কাশ্মীরি হস্তনির্মিত পশমিনা শাল। জিআই ট্যাগ ৪৬। মাত্র ১৪ মাইক্রন সূক্ষ্ম ছাগলের পশম থেকে হাতে বোনা পৃথিবীর উষ্ণতম শাল।',
      ta: 'காஷ்மீர் கைத்தறி பஷ்மினா சால்வை. ஜிஐ டேக் 46. மோதிரத்திற்குள் நுழையும் அளவு 14 மைக்ரான் மெல்லிய ஆட்டு கம்பளியால் நெய்யப்பட்டது.'
    }
  },

  // BIHAR
  {
    id: 'madhubani-mithila-br',
    craftName: 'Madhubani Mithila Painting',
    nativeNameHindi: 'मधुबनी मिथिला लोक चित्रकला',
    nativeNameRegional: 'मिथिला चित्रकला (Madhubani)',
    state: 'Bihar',
    districtCluster: 'Madhubani, Darbhanga, Jitwarpur',
    category: 'Paintings & Folk Art',
    giCertified: true,
    giTagNumber: 'GI-105',
    primaryMaterials: ['Handmade cotton rag paper primed with cow dung wash', 'Bamboo twig pens (Nibh)', 'Kajal soot (Black)', 'Turmeric (Yellow)', 'Kusum flower (Red)', 'Indigo (Blue)'],
    traditionalTechniques: ['Cow dung and river clay paper treatment', 'Freehand double line contouring (Kachni)', 'Hatch filling with no empty spaces (Bharni & Godna)', 'Natural plant sap binding'],
    hallmarkFeatures: ['Double-line borders filled with micro-hatching', 'Fish, peacock, sun, and Kohbar fertility symbols', 'Prominent stylized side-profile faces with oversized eyes'],
    typicalProductionHours: 35,
    artisanFairWageHourly: 140,
    artisanFairPayoutINR: 4900,
    middlemanRetailPriceINR: 13500,
    middlemanExploitationMarginPercent: 175,
    imageUrl: '/images/crafts/folk-art-madhubani.jpg',
    historicalSignificance: 'Traced back to King Janaka commissioning artists to capture Rama and Sita’s divine wedding in Mithila.',
    voiceAudioScript: {
      en: 'Madhubani Mithila Painting from Bihar. GI Tag 105. Ancient geometric folk art painted using bamboo twigs and natural botanical extracts.',
      hi: 'बिहार की मधुबनी मिथिला चित्रकला। जीआई टैग 105। बांस की तीली और प्राकृतिक वनस्पति रंगों से बनाई जाने वाली पौराणिक लोककला।',
      gu: 'બિહારની મધુબની મિથિલા પેઇન્ટિંગ. જીઆઈ ટેગ 105. વાંસની સળી અને વનસ્પતિ રંગો વડે દોરાતી રામાયણ કાળની પૌરાણિક લોકકળા.',
      bn: 'বিহারের মধুবনী মিথিলা চিত্রকলা। জিআই ট্যাগ ১০৫। বাঁশের কাঠি ও উদ্ভিজ্জ রঙে আঁকা রামায়ণ যুগের পৌরাণিক লোকশিল্প।',
      ta: 'பீகாரின் மதுபனி மிதிலா ஓவியம். ஜிஐ டேக் 105. மூங்கில் குச்சிகள் மற்றும் தாவர சாறுகள் கொண்டு வரையப்படும் பழமையான நாட்டுப்புற கலை.'
    }
  },

  // KARNATAKA
  {
    id: 'channapatna-toys-ka',
    craftName: 'Channapatna Lacquer Wooden Toys',
    nativeNameHindi: 'चन्नपटनम खराद काठ खिलौने',
    nativeNameRegional: 'ಚನ್ನಪಟ್ಟಣ ಗೊಂಬೆಗಳು (Channapatna)',
    state: 'Karnataka',
    districtCluster: 'Ramanagara (Channapatna)',
    category: 'Woodcraft & Lacquer',
    giCertified: true,
    giTagNumber: 'GI-23',
    primaryMaterials: ['Ivory wood (Wrightia tinctoria / Aale mara)', 'Natural button shellac', 'Turmeric, kumkum, indigo, and spinach vegetable dyes'],
    traditionalTechniques: ['Lathe wood turning (Patri)', 'Friction heating with colored lac sticks', 'Polishing with dried Pandanus screw-pine leaves (Talagari)', 'Seamless curve contouring'],
    hallmarkFeatures: ['100% Non-toxic vegetable-colored baby-safe lacquer', 'Silky mirror gloss achieved without chemical varnish', 'Rounded edges with zero sharp joins or splinters'],
    typicalProductionHours: 14,
    artisanFairWageHourly: 140,
    artisanFairPayoutINR: 1960,
    middlemanRetailPriceINR: 5200,
    middlemanExploitationMarginPercent: 165,
    imageUrl: '/images/crafts/channapatna-toys.jpg',
    historicalSignificance: 'Introduced by Tipu Sultan in the 18th century by inviting Persian artisans to train local woodturners.',
    voiceAudioScript: {
      en: 'Channapatna Lacquer Toys from Karnataka. GI Tag 23. Non-toxic wooden toys turned on lathes and polished with screw-pine leaves.',
      hi: 'कर्नाटक के चन्नपटनम खिलौने। जीआई टैग 23। टीपू सुल्तान द्वारा स्थापित 100% प्राकृतिक वनस्पति रंगों से खरादे गए सुरक्षित खिलौने।',
      gu: 'કર્ણાટકના ચન્નપટ્ટણા રમકડાં. જીઆઈ ટેગ 23. કુદરતી લાકડા અને વનસ્પતિ રંગોમાંથી લેથ મશીન પર ઘડાતા સુરક્ષિત રમકડાં.',
      bn: 'কর্ণাটকের চান্নাপাটনা কাঠের খেলনা। জিআই ট্যাগ ২৩। টিপু সুলতানের আমলের সম্পূর্ণ প্রাকৃতিক রঙে তৈরি চকচকে কাঠের খেলনা।',
      ta: 'கர்நாடகாவின் சன்னபட்டணா மர பொம்மைகள். ஜிஐ டேக் 23. குழந்தைகளுக்கான பாதுகாப்பான இயற்கை அரக்கு பூசப்பட்ட மரக் கைவினை.'
    }
  },
  {
    id: 'bidriware-karnataka-ka',
    craftName: 'Bidriware Silver Inlay Metalwork',
    nativeNameHindi: 'बीदरीवेयर रजत जड़ाई शिल्प',
    nativeNameRegional: 'ಬಿದ್ರಿ ಕಲೆ (Bidriware)',
    state: 'Karnataka',
    districtCluster: 'Bidar',
    category: 'Metalware & Casting',
    giCertified: true,
    giTagNumber: 'GI-11',
    primaryMaterials: ['Zinc-Copper alloy base (96% Zinc)', 'Pure Silver sheet and wire', 'Bidar Fort 15th-century soil containing potassium nitrate'],
    traditionalTechniques: ['Sand casting of alloy base', 'Stylus pattern engraving', 'Cold hammering pure silver wire into carved grooves', 'Oxidation boiling with Bidar fort mud turning zinc jet-black'],
    hallmarkFeatures: ['Striking contrast of lustrous white silver embedded in velvety matte jet-black zinc', 'Silver never tarnishes or pops out', 'Authentic soil chemical oxidation from historic Bidar Fort'],
    typicalProductionHours: 32,
    artisanFairWageHourly: 170,
    artisanFairPayoutINR: 5440,
    middlemanRetailPriceINR: 15000,
    middlemanExploitationMarginPercent: 175,
    imageUrl: '/images/crafts/bidriware.jpg',
    historicalSignificance: 'Developed under Bahmani Sultans in the 14th century, blending Persian inlays with Deccan metallurgy.',
    voiceAudioScript: {
      en: 'Bidriware from Bidar, Karnataka. GI Tag 11. Pure silver wire inlaid into jet-black alloy oxidized using historic Bidar Fort soil.',
      hi: 'कर्नाटक के बीदर का बीदरीवेयर शिल्प। जीआई टैग 11। ऐतिहासिक बीदर किले की मिट्टी से काले किए गए धातु में शुद्ध चांदी की जड़ाई।',
      gu: 'કર્ણાટકના બીદરનું બીદરીવેર શિલ્પ. જીઆઈ ટેગ 11. ઐતિહાસિક બીદર કિલ્લાની માટીથી કાળી કરેલી ધાતુમાં શુદ્ધ ચાંદીનું જડતર.',
      bn: 'কর্ণাটকের বিদার বিডরি শিল্প। জিআই ট্যাগ ১১। বিদার দুর্গের মাটিতে জারিত ঘন কালো ধাতুর ওপর খাঁটি রূপার তারের খোদাই।',
      ta: 'கர்நாடகாவின் பித்ரி கைவினை. ஜிஐ டேக் 11. வரலாற்று சிறப்புமிக்க பிதர் கோட்டை மண்ணால் கருமையாக்கப்பட்ட உலோகத்தில் வெள்ளி பதித்தல்.'
    }
  },

  // ANDHRA PRADESH & TELANGANA
  {
    id: 'kalamkari-srikalahasti-ap',
    craftName: 'Srikalahasti Freehand Pen Kalamkari',
    nativeNameHindi: 'श्रीकालहस्ती कलमकारी चित्रकला',
    nativeNameRegional: 'శ్రీకాళహస్తి కలంకారీ (Kalamkari)',
    state: 'Andhra Pradesh',
    districtCluster: 'Tirupati (Srikalahasti)',
    category: 'Paintings & Folk Art',
    giCertified: true,
    giTagNumber: 'GI-19',
    primaryMaterials: ['Handspun Mangalagiri cotton fabric', 'Bamboo reed pen with hair reservoir (Kalam)', 'Buffalo milk and Myrobalan fruit wash', 'Fermented iron jaggery rust black'],
    traditionalTechniques: ['Myrobalan resin mordant cloth soaking', 'Freehand drawing with fermented iron pen', 'Alum mordant red painting', 'Washing in running waters of Swarnamukhi River'],
    hallmarkFeatures: ['Zero block printing used; every line is 100% freehand drawn with bamboo pen', 'Distinct earthy smell of buffalo milk and river earth', 'Mythological epics depicted in sequential horizontal panels'],
    typicalProductionHours: 50,
    artisanFairWageHourly: 150,
    artisanFairPayoutINR: 7500,
    middlemanRetailPriceINR: 20000,
    middlemanExploitationMarginPercent: 166,
    imageUrl: '/images/crafts/ajrakh-block-print.jpg',
    historicalSignificance: 'Patronized by Vijayanagara emperors to adorn temple chariots and sanctum draperies with sacred stories.',
    voiceAudioScript: {
      en: 'Srikalahasti Kalamkari from Andhra Pradesh. GI Tag 19. Entirely freehand drawn on organic cotton using bamboo pens and river washing.',
      hi: 'आंध्र प्रदेश की श्रीकालहस्ती कलमकारी। जीआई टैग 19। बिना किसी ब्लॉक के, बांस की कलम और प्राकृतिक रंगों से हाथ से बनाई गई मंदिर कला।',
      gu: 'આંધ્ર પ્રદેશની શ્રીકાલહસ્તી કલમકારી. જીઆઈ ટેગ 19. બ્લોક વગર માત્ર વાંસની કલમ અને નદીના પાણીમાં ધોવાતી પૌરાણિક કળા.',
      bn: 'অন্ধ্রপ্রদেশের শ্রীকালহস্তী কলমকারী। জিআই ট্যাগ ১৯। কোনো ব্লক ছাড়া বাঁশের কলম ও প্রাকৃতিক রঙে কাপড়ে আঁকা পৌরাণিক দৃশ্য।',
      ta: 'ஆந்திராவின் ஸ்ரீகாளஹஸ்தி கலம்காரி. ஜிஐ டேக் 19. மூங்கில் பேனா மற்றும் இயற்கை மூலிகைகள் கொண்டு துணியில் வரையப்படும் கோயில் ஓவியம்.'
    }
  },

  // KERALA
  {
    id: 'aranmula-kannadi-kl',
    craftName: 'Aranmula Metal Mirror (Kannadi)',
    nativeNameHindi: 'आरणमुला धातु दर्पण',
    nativeNameRegional: 'ആറന്മുള കണ്ണാടി (Aranmula Mirror)',
    state: 'Kerala',
    districtCluster: 'Pathanamthitta (Aranmula)',
    category: 'Metalware & Casting',
    giCertified: true,
    giTagNumber: 'GI-1',
    primaryMaterials: ['Secret Copper and Tin alloy (speculum metal)', 'Paddy husk and local clay molds', 'Velvet cloth with marigold seed oil'],
    traditionalTechniques: ['Secret metallurgy ratio casting', 'Manual burnishing on jute cloth for days', 'Front-surface non-refractive optical finishing', 'Ornate brass filigree framing'],
    hallmarkFeatures: ['First-surface reflection: zero secondary refraction or glass distortion', 'When a finger touches mirror, reflection touches finger directly with zero gap', 'Traditional Vaalkannadi handled mirror silhouette'],
    typicalProductionHours: 45,
    artisanFairWageHourly: 190,
    artisanFairPayoutINR: 8550,
    middlemanRetailPriceINR: 24000,
    middlemanExploitationMarginPercent: 180,
    imageUrl: '/images/crafts/aranmula-kannadi.jpg',
    historicalSignificance: 'India’s very first GI Tag (GI-1)! Craft secret held exclusively by a single hereditary master guild in Aranmula village.',
    voiceAudioScript: {
      en: 'Aranmula Kannadi from Kerala. GI Tag 1. India’s first registered GI craft; front-surface reflective metal mirror with no glass distortion.',
      hi: 'केरल का आरणमुला धातु दर्पण। भारत का पहला जीआई टैग (GI-1)। बिना कांच के केवल शुद्ध धातु से निर्मित अद्भुत front-surface दर्पण।',
      gu: 'કેરળનું આરણમુલા ધાતુ દર્પણ. ભારતનો પ્રથમ જીઆઈ ટેગ (GI-1). કાચ વગર માત્ર શુદ્ધ ધાતુમાંથી બનતો અદ્ભુત અરીસો.',
      bn: 'কেরালার আরনমুলা ধাতব দর্পণ। ভারতের প্রথম জিআই ট্যাগ (GI-1)। কাঁচ ছাড়া কেবল খাঁটি ধাতুর মিশ্রণে তৈরি নিখুঁত প্রতিফলক আয়না।',
      ta: 'கேரளாவின் ஆரன்முலா உலோக கண்ணாடி. இந்தியாவின் முதல் ஜிஐ டேக் (GI-1). கண்ணாடி இல்லாமல் உலோகத்தில் முகம் காட்டும் அதிசய கைவினை.'
    }
  },

  // MADHYA PRADESH
  {
    id: 'chanderi-saree-mp',
    craftName: 'Chanderi Gossamer Silk Cotton Saree',
    nativeNameHindi: 'चंदेरी रेशम-कपास पारदर्शी बुनाई',
    nativeNameRegional: 'चंदेरी साड़ी (Bundelkhand)',
    state: 'Madhya Pradesh',
    districtCluster: 'Ashoknagar (Chanderi)',
    category: 'Handloom & Textiles',
    giCertified: true,
    giTagNumber: 'GI-24',
    primaryMaterials: ['High-twist Katan silk warp', 'Fine 100s-120s cotton weft', 'Gold/Silver tested Zari'],
    traditionalTechniques: ['Throw shuttle pit loom', 'Glue sizing of degummed silk', 'Manual needle Doodi motif insertion', 'Sheer gossamer tensioning'],
    hallmarkFeatures: ['Feather-light sheer transparency (Shimmering gossamer)', 'Distinct crinkly crispy handfeel', 'Intricate Ashrafi, Nalferma, and peacock gold zari bootis'],
    typicalProductionHours: 80,
    artisanFairWageHourly: 150,
    artisanFairPayoutINR: 12000,
    middlemanRetailPriceINR: 32000,
    middlemanExploitationMarginPercent: 166,
    imageUrl: '/images/crafts/mysore-silk.jpg',
    historicalSignificance: 'Flourished since the Vedic period; praised in Ain-i-Akbari for being so fine that an entire length could pass through a signet ring.',
    voiceAudioScript: {
      en: 'Chanderi Saree from Madhya Pradesh. GI Tag 24. Ethereal sheer silk-cotton handloom weave with gold zari bootis praised since the Mughal era.',
      hi: 'मध्य प्रदेश की विश्वप्रसिद्ध चंदेरी साड़ी। जीआई टैग 24। रेशम और सूती धागों से बनी पारदर्शी, हल्की और सुनहरी ज़री वाली शाही बुनाई।',
      gu: 'મધ્ય પ્રદેશની ચંદેરી સાડી. જીઆઈ ટેગ 24. રેશમ અને સુતરાઉ ધાગાની અતિ પાતળી, ઝીણી અને સોનેરી જરીવાળી શાહી સાડી.',
      bn: 'মধ্যপ্রদেশের চান্দেরি শাড়ি। জিআই ট্যাগ ২৪। রেশম ও সুতির অপূর্ব সংমিশ্রণে বোনা অত্যন্ত হালকা ও জমকালো জরি পাড়ের শাড়ি।',
      ta: 'மத்திய பிரதேசத்தின் சந்தேரி பட்டு-பருத்தி சேலை. ஜிஐ டேக் 24. எடை குறைந்த ஒளிபுகும் பட்டு மற்றும் தங்க ஜரிகை பூட்டாக்களால் ஆனது.'
    }
  }
];
