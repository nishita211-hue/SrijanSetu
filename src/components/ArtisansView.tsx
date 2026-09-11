import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { LanguageCode } from '../types';
import { speakNativeLanguage, stopNativeSpeech } from '../data/translations';
import { CraftImage } from './CraftImage';

interface ArtisansViewProps {
  currentLanguage: LanguageCode;
  onNavigateToShop?: () => void;
}

interface ArtisanProfile {
  id: string;
  name: string;
  craft: string;
  giTagNumber: string;
  location: string;
  state: string;
  experienceYears: number;
  familyGenerations: number;
  imageUrl: string;
  bio: string;
  voiceQuotes: Record<LanguageCode, string>;
  impactStat: string;
}

const ARTISAN_PROFILES: ArtisanProfile[] = [
  {
    id: 'sunita-devi',
    name: 'Sunita Devi',
    craft: 'Madhubani Painting (Mithila Art)',
    giTagNumber: 'GI-IN-0099',
    location: 'Jitwarpur, Madhubani',
    state: 'Bihar',
    experienceYears: 19,
    familyGenerations: 4,
    imageUrl: '/images/crafts/madhubani_painting.jpg',
    bio: 'Learned natural pigment extraction from cow dung, crushed flower petals, and lampblack soot from her grandmother. Specializes in ceremonial Kohbar and celestial Sun-Fish canvases.',
    voiceQuotes: {
      en: 'Every brushstroke on our handmade paper carries songs of our ancestors. With fair prices, my daughters can complete university while carrying forward our art.',
      hi: 'हमारे हर ब्रश के फेर में पुरखों के लोकगीत बसे हैं। जब हमें पूरा हक़ मिलता है, तो हमारी बेटियाँ कॉलेज की पढ़ाई पूरी कर सकती हैं।',
      gu: 'અમારા હાથથી બનેલા કાગળ પરનો દરેક લિસોટો અમારા પૂર્વજોના ગીતો લઈને આવે છે. વ્યાજબી ભાવ મળવાથી અમારા બાળકો ભણી શકે છે.',
      bn: 'আমাদের তুলির প্রতিটি টানে পূর্বপুরুষদের গান প্রতিধ্বনিত হয়। ন্যায্য পারিশ্রমিকের কারণে আমাদের মেয়েরা বিশ্ববিদ্যালয়ে পড়তে পারছে।',
      ta: 'எங்கள் கைவினை ஓவியத்தின் ஒவ்வொரு தூரிகையிலும் முன்னோர்களின் பாடல்கள் உள்ளன. நியாயமான விலை கிடைப்பதால் எங்கள் பிள்ளைகள் படிக்க முடிகிறது.'
    },
    impactStat: 'Supports a cooperative of 14 women village painters'
  },
  {
    id: 'gopal-lal-kumhar',
    name: 'Gopal Lal Kumhar',
    craft: 'Jaipur Blue Pottery',
    giTagNumber: 'GI-IN-0016',
    location: 'Kot Jewar, Jaipur',
    state: 'Rajasthan',
    experienceYears: 31,
    familyGenerations: 5,
    imageUrl: '/images/crafts/jaipur_blue_pottery.jpg',
    bio: 'Crafts non-clay quartz ceramic vessels ground from natural silica, fuller’s earth, and copper oxide turquoise glazes, fired in traditional kiln furnaces.',
    voiceQuotes: {
      en: 'Blue pottery uses no clay—only quartz and glass. The glaze takes 12 hours of precision firing. Fair trade gives us the dignity to keep our kilns burning.',
      hi: 'ब्लू पॉटरी में मिट्टी नहीं, सिर्फ क्वार्ट्ज और कांच का जादू है। सही दाम मिलने से हमारे भट्ठों की आग और कला दोनों जीवित रहते हैं।',
      gu: 'બ્લુ પોટરીમાં માટી નહીં પણ ક્વાર્ટ્ઝ અને કાચ વપરાય છે. યોગ્ય કિંમત મળવાથી અમારી પરંપરા જીવંત રહે છે.',
      bn: 'ব্লু পট্রি মাটিতে নয়, কোয়ার্টজ আর কাঁচের মিশ্রণে তৈরি হয়। ন্যায্য দাম পেলে আমাদের চুল্লি আর শিল্প দুটোই বেঁচে থাকে।',
      ta: 'நீல மண்பாண்டம் களிமண்ணால் செய்யப்படுவதில்லை, குவார்ட்ஸ் மற்றும் கண்ணாடியால் ஆனது. நியாயமான விலை எங்களை வாழ வைக்கிறது.'
    },
    impactStat: 'Preserves rare copper-oxide turquoise glaze formula'
  },
  {
    id: 'mohammad-rais-ansari',
    name: 'Mohammad Rais Ansari',
    craft: 'Banarasi Katan Silk Brocade',
    giTagNumber: 'GI-IN-0099',
    location: 'Kotwa, Varanasi',
    state: 'Uttar Pradesh',
    experienceYears: 35,
    familyGenerations: 6,
    imageUrl: '/images/crafts/banarasi_saree.jpg',
    bio: 'Weaves intricate pure gold and silver Zari brocades on pit looms using punched Jacquard cards, taking up to 45 days per ceremonial bridal saree.',
    voiceQuotes: {
      en: 'A single saree requires over 200,000 loom pedal strokes. When you buy directly, the fruits of two months of continuous weaving reach the weaver directly.',
      hi: 'एक साड़ी बनाने में दो लाख से ज्यादा ताने-बाने का खेल होता है। सीधा खरीदार मिलने से बुनकर के घर खुशहाली आती है।',
      gu: 'એક સાડી વણવામાં બે મહિનાની મહેનત લાગે છે. સીધો વેપાર થવાથી વણકર પરિવારને પૂરો હક મળે છે.',
      bn: 'একটি শাড়ি তৈরি করতে লক্ষাধিক সুতোর মেলবন্ধন লাগে। সরাসরি গ্রাহক আমাদের পরিশ্রমে ন্যায্য সম্মান ফিরিয়ে দেয়।',
      ta: 'ஒரு பட்டுச் சேலை நெய்ய இரண்டு மாதங்கள் தேவைப்படுகிறது. உங்கள் நேரடி ஆதரவு நெசவாளர் குடும்பங்களுக்கு நம்பிக்கையளிக்கிறது.'
    },
    impactStat: 'Trains 8 apprentice handloom weavers annually'
  },
  {
    id: 'b-venkatesh',
    name: 'B. Venkatesh',
    craft: 'Channapatna Lacquerware Toys',
    giTagNumber: 'GI-IN-0044',
    location: 'Channapatna Town, Ramanagara',
    state: 'Karnataka',
    experienceYears: 16,
    familyGenerations: 3,
    imageUrl: '/images/crafts/channapatna_toys.jpg',
    bio: 'Shapes ivory wood on high-speed turning lathes, polishing each piece with natural tree lac and organic plant dyes like turmeric and indigo to make 100% child-safe toys.',
    voiceQuotes: {
      en: 'Our wooden toys use pure vegetable dyes and soft ivory wood—safe for infants to chew on. Fair buying keeps our toy town thriving against cheap plastic imports.',
      hi: 'हमारे खिलौने हल्दी और नील के प्राकृतिक रंगों से बनते हैं, बच्चों के लिए पूरी तरह सुरक्षित हैं। आपका साथ इस प्राचीन शिल्प को बचाता है।',
      gu: 'અમારા લાકડાના રમકડાં કુદરતી રંગોથી બને છે જે બાળકો માટે સંપૂર્ણ સલામત છે. પ્લાસ્ટિકના જમાનામાં આ કળાને જીવાડો.',
      bn: 'আমাদের কাঠের খেলনা ভেষজ রঙে তৈরি, শিশুদের জন্য সম্পূর্ণ নিরাপদ। হস্তশিল্প টিকিয়ে রাখতে আপনার সহযোগিতা অপরিসীম।',
      ta: 'எங்கள் மர பொம்மைகள் இயற்கை வண்ணங்களால் செய்யப்படுகின்றன, குழந்தைகளுக்கு முற்றிலும் பாதுகாப்பானவை.'
    },
    impactStat: 'Certified 100% eco-friendly & child-safe'
  }
];

export const ArtisansView: React.FC<ArtisansViewProps> = ({ currentLanguage, onNavigateToShop }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleTogglePlay = (artisan: ArtisanProfile) => {
    if (playingId === artisan.id) {
      stopNativeSpeech();
      setPlayingId(null);
    } else {
      stopNativeSpeech();
      setPlayingId(artisan.id);
      const text = artisan.voiceQuotes[currentLanguage] || artisan.bio;
      speakNativeLanguage(text, currentLanguage, () => {
        setPlayingId(null);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            The Living Hands Behind Heritage
          </div>
          <h1 className="font-serif-heritage font-bold text-2xl sm:text-3xl text-stone-900">
            Meet the Master Artisans of SrijanSetu
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Every product on our platform has a face, a family lineage, and an authentic heritage story. 
            We guarantee 100% transparent fair-trade payouts directly into artisan accounts.
          </p>
        </div>

        {onNavigateToShop && (
          <button
            onClick={onNavigateToShop}
            className="self-start md:self-center px-4 py-2.5 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
          >
            Shop Masterpieces &rarr;
          </button>
        )}
      </div>

      {/* Fair Trade Promise Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-6 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Our Fair Trade & GI Guarantee
          </span>
          <h3 className="font-serif-heritage font-bold text-xl text-stone-900">
            How Direct Buying Multiplies Artisan Earnings by 3x–4x
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="bg-white/80 rounded-xl p-3 border border-amber-200">
              <span className="font-bold text-amber-950 block text-sm">Direct Bank Transfers</span>
              <p className="text-stone-600 mt-1">
                Zero intermediaries. Payment is credited directly to the verified artisan upon delivery.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-3 border border-amber-200">
              <span className="font-bold text-amber-950 block text-sm">Insured Packaging</span>
              <p className="text-stone-600 mt-1">
                Crafts are packaged in archival boxes with tamper-proof GI registry certificates.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-3 border border-amber-200">
              <span className="font-bold text-amber-950 block text-sm">Cultural Preservation</span>
              <p className="text-stone-600 mt-1">
                Fair wages keep youth engaged in generational crafts rather than migrating to manual labor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Artisan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTISAN_PROFILES.map((artisan) => {
          const isPlaying = playingId === artisan.id;

          return (
            <div
              key={artisan.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                    <CraftImage
                      src={artisan.imageUrl}
                      alt={artisan.name}
                      fallbackCategory={artisan.state}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                      <span>{artisan.craft}</span>
                    </div>

                    <h3 className="font-serif-heritage font-bold text-xl text-stone-900 mt-0.5">
                      {artisan.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-stone-600 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{artisan.location}, {artisan.state}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono mt-1">
                      <span>{artisan.experienceYears} Years Master</span>
                      <span>&bull;</span>
                      <span>{artisan.familyGenerations} Generations</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {artisan.bio}
                </p>

                {/* Artisan Voice Quote Box */}
                <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/70 space-y-2 text-xs">
                  <div className="italic text-stone-800 leading-relaxed">
                    &ldquo;{artisan.voiceQuotes[currentLanguage] || artisan.voiceQuotes.en}&rdquo;
                  </div>

                  <button
                    onClick={() => handleTogglePlay(artisan)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
                      isPlaying
                        ? 'bg-amber-800 text-white animate-pulse'
                        : 'bg-white border border-amber-300 text-amber-950 hover:bg-amber-100'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        Pause Voice
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                        Listen in {currentLanguage.toUpperCase()}
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {artisan.impactStat}
                </span>

                <span className="text-[10px] font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-bold">
                  {artisan.giTagNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
