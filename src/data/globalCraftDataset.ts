export interface GlobalCraft {
  id: string;
  name: string;
  nativeName: string;
  country: string;
  region: string;
  continent: 'Asia' | 'Europe' | 'Africa' | 'Americas' | 'Middle East' | 'Oceania';
  category: 'Textiles & Weaving' | 'Ceramics & Pottery' | 'Metalworking & Casting' | 'Wood & Lacquer' | 'Glass' | 'Leatherwork' | 'Stone & Carving' | 'Basketry & Fiber' | 'Paper & Marbling' | 'Jewelry & Enamel';
  heritageStatus: 'UNESCO Intangible Cultural Heritage' | 'National GI / Protected Origin' | 'Endangered Living Tradition' | 'Traditional Master Heritage';
  primaryMaterials: string[];
  traditionalTechniques: string[];
  visualHallmarks: string[];
  typicalProductionHours: number;
  globalMarketEstimateUSD: number;
  globalMarketEstimateINR: number;
  imageUrl: string;
  description: string;
  preservationThreat: 'Low' | 'Moderate' | 'Critical (Extinction Risk)';
  associatedDatasets: string[];
}

export interface MegaDatasetSource {
  name: string;
  entity: string;
  totalRecords: string;
  craftFocus: string;
  accessType: 'Open Access API (CC0 / Public Domain)' | 'Downloadable HuggingFace / Kaggle' | 'Academic Research Dataset';
  apiEndpointOrUrl: string;
  recommendedScraperFilter: string;
  pythonScraperSnippet: string;
}

export const MEGA_DATASET_SOURCES: MegaDatasetSource[] = [
  {
    name: 'The Metropolitan Museum of Art Open Access Collection',
    entity: 'The Met (New York, USA)',
    totalRecords: '470,000+ digitized artifacts with 400,000+ high-res images',
    craftFocus: 'Global decorative arts, Islamic metalwork, European textiles, Asian ceramics, Pre-Columbian pottery, African beadwork',
    accessType: 'Open Access API (CC0 / Public Domain)',
    apiEndpointOrUrl: 'https://collectionapi.metmuseum.org/public/collection/v1/',
    recommendedScraperFilter: 'departmentIds=[1,4,14] (Arms, European Sculpture & Decorative Arts, Islamic Art)',
    pythonScraperSnippet: `import requests
import json
import time

MET_SEARCH_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search"
MET_OBJECT_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"

def fetch_met_crafts(query="pottery", max_items=100):
    params = {"q": query, "hasImages": "true"}
    resp = requests.get(MET_SEARCH_URL, params=params).json()
    object_ids = resp.get("objectIDs", [])[:max_items]
    
    craft_records = []
    for obj_id in object_ids:
        try:
            item = requests.get(f"{MET_OBJECT_URL}{obj_id}").json()
            if item.get("primaryImage"):
                craft_records.append({
                    "title": item.get("title"),
                    "culture": item.get("culture"),
                    "period": item.get("period"),
                    "medium": item.get("medium"),
                    "classification": item.get("classification"),
                    "image_url": item.get("primaryImage"),
                    "country": item.get("country")
                })
            time.sleep(0.05)  # Rate limiting compliance
        except Exception as e:
            continue
    return craft_records`
  },
  {
    name: 'Smithsonian Open Access Cultural Artifacts',
    entity: 'Smithsonian Institution (National Museum of Asian Art, Renwick Gallery)',
    totalRecords: '4.5 Million+ open access records with 2D & 3D craft models',
    craftFocus: 'American craft traditions, Asian ceramics & lacquerware, African tribal textiles, indigenous basketry',
    accessType: 'Open Access API (CC0 / Public Domain)',
    apiEndpointOrUrl: 'https://api.si.edu/openaccess/api/v1.0/',
    recommendedScraperFilter: 'fq=online_media_type:"Images" AND unit_code:"FSG" (Freer-Sackler Asian Craft)',
    pythonScraperSnippet: `import requests

SMITHSONIAN_API_KEY = "YOUR_FREE_API_KEY" # Available instantly at open.si.edu
ENDPOINT = "https://api.si.edu/openaccess/api/v1.0/search"

def search_smithsonian_crafts(category="weaving"):
    params = {
        "api_key": SMITHSONIAN_API_KEY,
        "q": f"craft OR {category}",
        "rows": 50,
        "fq": "online_media_type:Images"
    }
    data = requests.get(ENDPOINT, params=params).json()
    items = data.get("response", {}).get("rows", [])
    return [{
        "title": i["title"],
        "unit": i.get("unitCode"),
        "thumbnail": i.get("content", {}).get("descriptiveNonRepeating", {}).get("online_media", {}).get("media", [{}])[0].get("thumbnail")
    } for i in items]`
  },
  {
    name: 'UNESCO Intangible Cultural Heritage (ICH) Global Database',
    entity: 'UNESCO (United Nations Educational, Scientific and Cultural Organization)',
    totalRecords: '730+ Inscribed Heritage Elements across 145 countries',
    craftFocus: 'Traditional craftsmanship traditions under Urgent Safeguarding and Representative Lists',
    accessType: 'Academic Research Dataset',
    apiEndpointOrUrl: 'https://ich.unesco.org/en/dive&display=domain#tabs (Domain 5: Traditional Craftsmanship)',
    recommendedScraperFilter: 'domain=5 (Traditional craftsmanship: weaving, pottery, smithing, joinery)',
    pythonScraperSnippet: `# UNESCO ICH provides direct JSON dumps and SPARQL endpoint
import requests

UNESCO_SPARQL = "https://ich.unesco.org/sparql"
QUERY = """
SELECT ?element ?name ?country ?domain WHERE {
  ?element a <http://data.unesco.org/def/ich/Element> ;
           <http://data.unesco.org/def/ich/elementName> ?name ;
           <http://data.unesco.org/def/ich/stateParty> ?country ;
           <http://data.unesco.org/def/ich/domain> <http://data.unesco.org/def/ich/domain/traditional-craftsmanship> .
} LIMIT 200
"""
# Yields authoritative worldwide cultural classification taxonomy`
  },
  {
    name: 'Europeana Cultural Heritage Craft & Design Dataset',
    entity: 'European Union (Europeana Foundation)',
    totalRecords: '50 Million+ items from 2,000+ European libraries, galleries, and craft guilds',
    craftFocus: 'Meissen porcelain, Murano glass, Flemish tapestries, Toledo steel, Delftware, Celtic metalwork',
    accessType: 'Open Access API (CC0 / Public Domain)',
    apiEndpointOrUrl: 'https://api.europeana.eu/record/v2/search.json',
    recommendedScraperFilter: 'qf=TYPE:IMAGE AND qf=theme:craft',
    pythonScraperSnippet: `import requests

EUROPEANA_KEY = "YOUR_API_KEY"
def get_europeana_crafts(term="lacework"):
    url = "https://api.europeana.eu/record/v2/search.json"
    params = {
        "wskey": EUROPEANA_KEY,
        "query": term,
        "media": "true",
        "thumbnail": "true",
        "rows": 50
    }
    res = requests.get(url, params=params).json()
    return res.get("items", [])`
  },
  {
    name: 'Materials in Context (MINC) + OpenSurfaces Dataset',
    entity: 'Cornell Tech / UC Berkeley',
    totalRecords: '3 Million+ labeled material patches across 23 material categories',
    craftFocus: 'Raw material segmentations: Ceramic, Fabric/Textile, Glass, Leather, Metal, Stone, Wood, Paper',
    accessType: 'Downloadable HuggingFace / Kaggle',
    apiEndpointOrUrl: 'http://opensurfaces.cs.cornell.edu/ & http://minc.cs.cornell.edu/',
    recommendedScraperFilter: 'Essential for low-level craft material identification before high-level craft classification',
    pythonScraperSnippet: `# Kaggle / PyTorch Dataset loader for Materials in Context (MINC-2500)
import torchvision.datasets as datasets
import torchvision.transforms as transforms

minc_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])
# minc_dataset = datasets.ImageFolder(root='path/to/minc-2500', transform=minc_transforms)`
  }
];

export const GLOBAL_CRAFTS_DATASET: GlobalCraft[] = [
  // ASIA
  {
    id: 'kintsugi-japan',
    name: 'Kintsugi Golden Joinery (金継ぎ)',
    nativeName: '金継ぎ (Kintsugi)',
    country: 'Japan',
    region: 'Kyoto / Kanazawa',
    continent: 'Asia',
    category: 'Ceramics & Pottery',
    heritageStatus: 'Traditional Master Heritage',
    primaryMaterials: ['Broken glazed ceramic', 'Natural Urushi lacquer', 'Pure 24K gold dust', 'Wheat flour binder'],
    traditionalTechniques: ['Mugourushi mending', 'Kokuso gap filling', 'Kinpun powder sprinkling', 'Charcoal water polishing'],
    visualHallmarks: ['Gleaming gold seam lines along ceramic fissures', 'Asymmetrical imperfection celebration (Wabi-sabi)', 'Glossy natural lacquer bond'],
    typicalProductionHours: 35,
    globalMarketEstimateUSD: 480,
    globalMarketEstimateINR: 40000,
    imageUrl: '/images/crafts/kintsugi-gold.jpg',
    description: '15th-century Japanese craft philosophy treating breakage and repair as part of the object history rather than something to disguise, using tree sap lacquer and pure gold.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['Smithsonian Freer-Sackler', 'Met Museum Asian Art', 'Tokyo National Museum API']
  },
  {
    id: 'batik-indonesia',
    name: 'Batik Tulis Hand-Drawn Wax Resist',
    nativeName: 'Batik Tulis Halus',
    country: 'Indonesia',
    region: 'Java (Yogyakarta & Surakarta)',
    continent: 'Asia',
    category: 'Textiles & Weaving',
    heritageStatus: 'UNESCO Intangible Cultural Heritage',
    primaryMaterials: ['Mori unbleached cotton / Silk', 'Beeswax and paraffin resin', 'Natural indigo / Soga bark dye'],
    traditionalTechniques: ['Canting copper pen wax drawing', 'Double-sided wax tracing (Nerusi)', 'Repeated cold dye vats (Medel)', 'Wax boiling removal (Lorodan)'],
    visualHallmarks: ['Fine crackle lines in wax dye penetration', 'Intricate Parang / Kawung sacred royal motifs', 'Double-sided identical color saturation'],
    typicalProductionHours: 85,
    globalMarketEstimateUSD: 650,
    globalMarketEstimateINR: 54000,
    imageUrl: '/images/crafts/batik-fabric.jpg',
    description: 'Inscribed on UNESCO Representative List of Intangible Cultural Heritage in 2009. Woven deeply into Javanese life cycle ceremonies, from birth to royal shrouds.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['UNESCO ICH Portal', 'National Museum of Indonesia Dataset', 'Tropenmuseum Open Data']
  },
  {
    id: 'ebru-turkey',
    name: 'Ebru Water Marbling Art',
    nativeName: 'Türk Ebru Sanatı',
    country: 'Turkey',
    region: 'Istanbul / Anatolia',
    continent: 'Middle East',
    category: 'Paper & Marbling',
    heritageStatus: 'UNESCO Intangible Cultural Heritage',
    primaryMaterials: ['Tragacanth gum / Carrageenan bath', 'Ox-gall dispersant', 'Natural earth pigments', 'Horsehair & rose twig brushes'],
    traditionalTechniques: ['Drop dispersion floating paint', 'Comb & needle wave manipulation', 'Single-pass acid-free paper absorption'],
    visualHallmarks: ['Fluid non-repeating concentric ripples', 'Battal, Hatip, and floral tulip motifs suspended on paper', 'Granular natural pigment halos'],
    typicalProductionHours: 12,
    globalMarketEstimateUSD: 240,
    globalMarketEstimateINR: 20000,
    imageUrl: '/images/crafts/ebru-water-marbling.jpg',
    description: 'Inscribed by UNESCO in 2014. Practiced since the Seljuk Empire to decorate book bindings, imperial firmans, and sacred calligraphy borders.',
    preservationThreat: 'Low',
    associatedDatasets: ['UNESCO ICH Database', 'Topkapi Palace Archives', 'Europeana Islamic Heritage']
  },
  {
    id: 'dhokra-india',
    name: 'Dhokra Lost-Wax Bell Metal Casting',
    nativeName: 'धोकरा धातु शिल्प',
    country: 'India',
    region: 'Odisha / Chhattisgarh / West Bengal',
    continent: 'Asia',
    category: 'Metalworking & Casting',
    heritageStatus: 'National GI / Protected Origin',
    primaryMaterials: ['Bell metal (copper-tin alloy)', 'Beeswax wires', 'Clay core with river silt and cow dung', 'Charcoal fuel'],
    traditionalTechniques: ['Solid core clay molding', 'Hand-extruded beeswax thread coiling', 'Secondary refractory clay wrapping', 'Open pit furnace lost-wax draining'],
    visualHallmarks: ['Distinct wire-wound surface texture', 'Hollow casting core resonance', 'Rough primitive tribal patina', 'Zero joinery lines'],
    typicalProductionHours: 28,
    globalMarketEstimateUSD: 180,
    globalMarketEstimateINR: 15000,
    imageUrl: '/images/crafts/dhokra-bronze.jpg',
    description: 'Direct unbroken lineage of metallurgy dating back over 4,000 years to the Dancing Girl of Mohenjo-daro.',
    preservationThreat: 'Critical (Extinction Risk)',
    associatedDatasets: ['National Master Craft Benchmark', 'Craft Council of India Data', 'Met Museum South Asian']
  },

  // EUROPE
  {
    id: 'murano-glass-italy',
    name: 'Murano Millefiori Blown Glass',
    nativeName: 'Vetro di Murano (Millefiori)',
    country: 'Italy',
    region: 'Venice (Isola di Murano)',
    continent: 'Europe',
    category: 'Glass',
    heritageStatus: 'National GI / Protected Origin',
    primaryMaterials: ['Silica sand', 'Soda ash and limestone flux', 'Cobalt, gold, and copper mineral coloring canes'],
    traditionalTechniques: ['Millefiori cane cross-section slicing', 'Pontil pipe mouth-blowing', 'Canestro mold shaping', 'Slow lehr annealing'],
    visualHallmarks: ['Mosaic mosaic floral star cross-sections embedded in crystal glass', 'Exceptional refractive clarity', 'Vibrant concentric color rings'],
    typicalProductionHours: 18,
    globalMarketEstimateUSD: 720,
    globalMarketEstimateINR: 60000,
    imageUrl: '/images/crafts/murano-glass.jpg',
    description: 'Venetian glassmaking decree of 1291 confined all city furnaces to Murano island to protect secrets and prevent fires. Protected under Vetro Artistico® Murano trademark.',
    preservationThreat: 'Low',
    associatedDatasets: ['Europeana Glassware', 'Victoria & Albert Museum API', 'Corning Museum of Glass Data']
  },
  {
    id: 'harris-tweed-scotland',
    name: 'Harris Tweed Handwoven Wool',
    nativeName: 'Clò Mòr (Hebridean Wool)',
    country: 'United Kingdom',
    region: 'Outer Hebrides (Lewis & Harris, Scotland)',
    continent: 'Europe',
    category: 'Textiles & Weaving',
    heritageStatus: 'National GI / Protected Origin',
    primaryMaterials: ['100% Pure virgin Cheviot and Scottish Blackface wool', 'Lichen and vegetable dyes'],
    traditionalTechniques: ['Hand-dyed raw wool fleece blending', 'Double-width Hattersley or Bonas-Griffith treadle foot loom', 'Crofting home handweaving', 'Soapy water waulking'],
    visualHallmarks: ['Multitone heather flecked herringbone / houndstooth weave', 'Rough, weather-resistant coarse handfeel', 'Orb trademark authenticity stamp'],
    typicalProductionHours: 40,
    globalMarketEstimateUSD: 520,
    globalMarketEstimateINR: 43500,
    imageUrl: '/images/crafts/pashmina-cashmere.jpg',
    description: 'The only fabric in the world protected by its own Act of Parliament (Harris Tweed Act 1993), mandating it be handwoven at the islanders’ homes.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['Harris Tweed Authority Records', 'National Museums Scotland', 'Europeana Fashion']
  },
  {
    id: 'toledo-damascene-spain',
    name: 'Toledo Damascene Gold Inlay Metalwork',
    nativeName: 'Damasquinado de Toledo',
    country: 'Spain',
    region: 'Toledo (Castilla-La Mancha)',
    continent: 'Europe',
    category: 'Metalworking & Casting',
    heritageStatus: 'Traditional Master Heritage',
    primaryMaterials: ['High carbon blued steel', '24K pure yellow gold wire / 18K green gold', 'Fine silver thread'],
    traditionalTechniques: ['Micro-incised steel surface cross-hatching', 'Hammered gold wire cold inlay (Embutido)', 'Bluing chemical oxidation firing', 'Agate burnishing'],
    visualHallmarks: ['Deep velvet-black oxidized iron backdrop', 'Intricate geometric arabesque & Renaissance gold filigree', 'Completely flush, weldless metal embedding'],
    typicalProductionHours: 24,
    globalMarketEstimateUSD: 390,
    globalMarketEstimateINR: 32500,
    imageUrl: '/images/crafts/damascus-blade.jpg',
    description: 'Passed down since Moorish al-Andalus, blending ancient Damascus sword inlay techniques with imperial Toledo armourers.',
    preservationThreat: 'Critical (Extinction Risk)',
    associatedDatasets: ['Europeana Decorative Arts', 'Museo de Santa Cruz Toledo', 'Met European Sculpture & Armor']
  },

  // AFRICA
  {
    id: 'kente-ghana',
    name: 'Asante Kente Handwoven Royal Silk Cloth',
    nativeName: 'Kente Cloth (Nwentoma)',
    country: 'Ghana',
    region: 'Ashanti Region (Bonwire)',
    continent: 'Africa',
    category: 'Textiles & Weaving',
    heritageStatus: 'Traditional Master Heritage',
    primaryMaterials: ['Rayon and raw spun silk yarns', 'Natural mineral and tree bark yellow/red/green dyes'],
    traditionalTechniques: ['Narrow-band double-treadle horizontal wooden loom', 'Geometric weft-float inlay', 'Strip-by-strip hand needle joining'],
    visualHallmarks: ['4-inch narrow strips sewn into wide garments', 'Vibrant symbolic yellow (wealth), green (growth), red (sacrifice)', 'Complex interlocking zigzag Adweneasa patterns'],
    typicalProductionHours: 90,
    globalMarketEstimateUSD: 850,
    globalMarketEstimateINR: 71000,
    imageUrl: '/images/crafts/kente-cloth.jpg',
    description: 'Historically reserved exclusively for Ashanti kings (Asantehene) and queens. Every color and pattern possesses a distinct historical proverb.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['Smithsonian National Museum of African Art', 'British Museum African Textile Collection', 'UNESCO West Africa']
  },
  {
    id: 'adire-nigeria',
    name: 'Adire Eleko Indigo Cassava Resist Textile',
    nativeName: 'Àdìrẹ Ẹlẹ́kọ',
    country: 'Nigeria',
    region: 'Yorubaland (Abeokuta & Ibadan)',
    continent: 'Africa',
    category: 'Textiles & Weaving',
    heritageStatus: 'Traditional Master Heritage',
    primaryMaterials: ['Wild cassava starch paste (Ẹkọ)', 'Alum mordant', 'Fermented natural Elu leaf indigo dye', 'Chicken feather / palm frond quills'],
    traditionalTechniques: ['Hand-drawn freehand cassava paste resist', 'Multi-week subterranean earthen dye pot submersion', 'Sun drying and starch flaking removal'],
    visualHallmarks: ['Deep midnight-blue with chalky soft blue-white geometric motifs', 'Ibadandun and Olokun tribal deity sigils', 'Starch crackle lines'],
    typicalProductionHours: 30,
    globalMarketEstimateUSD: 290,
    globalMarketEstimateINR: 24000,
    imageUrl: '/images/crafts/ajrakh-block-print.jpg',
    description: 'Centuries-old resist dye tradition of Yoruba women of Abeokuta, utilizing the sacred indigo plant (Indigofera arrecta).',
    preservationThreat: 'Moderate',
    associatedDatasets: ['Met Museum Arts of Africa', 'Smithsonian African Art', 'Centre for Black & African Arts']
  },
  {
    id: 'tuareg-jewelry-niger',
    name: 'Tuareg Cross of Agadez Silverwork',
    nativeName: 'Tanakout / Croix d’Agadez',
    country: 'Niger / Mali',
    region: 'Sahara Desert (Agadez)',
    continent: 'Africa',
    category: 'Jewelry & Enamel',
    heritageStatus: 'Traditional Master Heritage',
    primaryMaterials: ['925 Silver (or coin silver)', 'Ebony wood inserts', 'Sulfur liver oxidation'],
    traditionalTechniques: ['Charcoal forge lost-wax casting', 'Cold chisel engraving', 'Repoussé relief punching', 'Tribal compass geometric layout'],
    visualHallmarks: ['Lozenge and diamond cross silhouette', 'Geometric protective talisman engraving against desert evil eye', 'Contrasting black sulfur engraved crevices'],
    typicalProductionHours: 16,
    globalMarketEstimateUSD: 220,
    globalMarketEstimateINR: 18500,
    imageUrl: '/images/crafts/brass-craft.jpg',
    description: 'Passed from Tuareg nomadic fathers to sons upon initiation into adulthood, serving as tribal identity, compass navigation, and currency across the Sahara.',
    preservationThreat: 'Critical (Extinction Risk)',
    associatedDatasets: ['Musée du Quai Branly Open Data', 'Smithsonian African Art', 'UNESCO Sahara Cultural Heritage']
  },

  // AMERICAS
  {
    id: 'talavera-mexico',
    name: 'Talavera Poblana Tin-Glazed Majolica',
    nativeName: 'Talavera Poblana Certificada',
    country: 'Mexico',
    region: 'Puebla / Tlaxcala',
    continent: 'Americas',
    category: 'Ceramics & Pottery',
    heritageStatus: 'UNESCO Intangible Cultural Heritage',
    primaryMaterials: ['Black and white Puebla river valley clay', 'Opaque tin-lead glaze', 'Mineral cobalt, antimony, and iron oxide pigments'],
    traditionalTechniques: ['Foot-treaded clay aging for months', 'Potter wheel turning or press-molding', 'Initial Jaguete firing', 'Freehand mineral brushwork', 'High-fire kiln melt'],
    visualHallmarks: ['Milky off-white opaque base glaze', 'Raised tactile mineral paint relief', 'Intricate floral and heraldic blue-and-white arabesques', 'Official DO (Denominación de Origen) workshop stamp'],
    typicalProductionHours: 45,
    globalMarketEstimateUSD: 360,
    globalMarketEstimateINR: 30000,
    imageUrl: '/images/crafts/talavera-pottery.jpg',
    description: 'Jointly inscribed on UNESCO Intangible Cultural Heritage list with Talavera de la Reina (Spain) in 2019. Strict 16th-century guild ordinances regulate clay mixtures and mineral pigments.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['UNESCO ICH Portal', 'Museo Amparo Puebla Digital Archive', 'Smithsonian Latino Center']
  },
  {
    id: 'navajo-weaving-usa',
    name: 'Navajo Diné Germantown Eye-Dazzler Rug',
    nativeName: 'Diné Bi’atł’ó (Navajo Weaving)',
    country: 'United States',
    region: 'Southwest (Navajo Nation, Arizona / New Mexico)',
    continent: 'Americas',
    category: 'Textiles & Weaving',
    heritageStatus: 'National GI / Protected Origin',
    primaryMaterials: ['Churro sheep virgin wool', 'Vegetal mountain dyes and cochineal'],
    traditionalTechniques: ['Upright continuous vertical handloom', 'Interlocking tapestry joinery', 'Two-shed batch weave', 'Lazy lines diagonal tension shifts'],
    visualHallmarks: ['Electrifying serrated diamond and zigzag patterns', 'Zero warp fringe (all 4 selvages woven shut)', 'Tight count (>50 wefts per inch) water-resistant weave'],
    typicalProductionHours: 120,
    globalMarketEstimateUSD: 2400,
    globalMarketEstimateINR: 200000,
    imageUrl: '/images/crafts/persian-rug.jpg',
    description: 'Taught by the Holy Being Spider Woman (Na’ashjé’íí Asdzáá) according to Diné oral cosmology. Protected under the federal Indian Arts and Crafts Act of 1990.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['Smithsonian National Museum of the American Indian', 'Heard Museum Digital Archive', 'Met American Wing']
  },
  {
    id: 'alpaca-weaving-peru',
    name: 'Cusco Traditional Backstrap Alpaca Textile',
    nativeName: 'Away (Quechua Handweaving)',
    country: 'Peru',
    region: 'Andes (Chinchero & Sacred Valley)',
    continent: 'Americas',
    category: 'Textiles & Weaving',
    heritageStatus: 'National GI / Protected Origin',
    primaryMaterials: ['Baby alpaca fleece', 'Cochineal cactus bug dye (crimson)', 'Q’olle flower (yellow) and Chapi root'],
    traditionalTechniques: ['Drop spindle (K’anti) hand-spinning', 'Backstrap loom anchored to weaver’s waist', 'Supplementary warp double-faced Pick-up weave (Pallay)'],
    visualHallmarks: ['Reversible dual-tone geometric animal and agricultural calendar symbols (Inti, Puma, Chakanas)', 'Tubular woven border finish (Chumpis)'],
    typicalProductionHours: 65,
    globalMarketEstimateUSD: 410,
    globalMarketEstimateINR: 34500,
    imageUrl: '/images/crafts/sambalpuri-ikat.jpg',
    description: 'Preserved continuously from Inca civilization. The backstrap loom’s tension is dynamically modulated by the weaver’s own spine.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['Centro de Textiles Tradicionales del Cusco', 'Smithsonian NMAI', 'Met Arts of the Americas']
  },

  // OCEANIA
  {
    id: 'aboriginal-bark-australia',
    name: 'Yolŋu Ochre Bark Painting',
    nativeName: 'Yirrkala Bark Art',
    country: 'Australia',
    region: 'Arnhem Land, Northern Territory',
    continent: 'Oceania',
    category: 'Paper & Marbling',
    heritageStatus: 'National GI / Protected Origin',
    primaryMaterials: ['Stringybark eucalyptus tree bark (Eucalyptus tetrodonta)', 'Natural red, yellow, and black mineral ochres', 'Pipeclay white'],
    traditionalTechniques: ['Wet season tree bark peeling', 'Fire-straightening under hot sand and heavy logs', 'Human hair fine brush rarrk cross-hatching'],
    visualHallmarks: ['Dense cross-hatched rarrk lineation generating visual shimmer (Bir’yun)', 'Totemic sea life, ancestral crocodile, and Dreamtime creator beings'],
    typicalProductionHours: 50,
    globalMarketEstimateUSD: 1600,
    globalMarketEstimateINR: 135000,
    imageUrl: '/images/crafts/folk-art-madhubani.jpg',
    description: 'Ancestral storytelling and land title documentation of Australian First Nations peoples, painted exclusively using sacred ochres gathered from ceremonial sites.',
    preservationThreat: 'Moderate',
    associatedDatasets: ['National Gallery of Australia Open Data', 'British Museum Oceania Collection', 'Smithsonian Asian & Pacific']
  },
  {
    id: 'maori-pounamu-nz',
    name: 'Māori Carved Pounamu Greenstone Heitiki',
    nativeName: 'Pounamu Heitiki (Taonga)',
    country: 'New Zealand',
    region: 'South Island (Te Wai Pounamu)',
    continent: 'Oceania',
    category: 'Stone & Carving',
    heritageStatus: 'National GI / Protected Origin',
    primaryMaterials: ['Nephrite jade / Bowenite greenstone (Pounamu)'],
    traditionalTechniques: ['Diamond wheel cold grinding & sandstone carving', 'Water-cooled abrasive polishing', 'Pāua abalone shell eye inlay', 'Hand-braided flax cord'],
    visualHallmarks: ['Deep translucent jade green with cloud inclusions', 'Curled fetal neck tilt with hand resting on hip', 'Iridescent paua shell eyes'],
    typicalProductionHours: 32,
    globalMarketEstimateUSD: 850,
    globalMarketEstimateINR: 71000,
    imageUrl: '/images/crafts/maori-pounamu.jpg',
    description: 'Considered a sacred treasure (Taonga) imbued with ancestral spiritual authority (Mana). Protected by the Ngāi Tahu Pounamu Resource Management Act.',
    preservationThreat: 'Low',
    associatedDatasets: ['Museum of New Zealand Te Papa Tongarewa API', 'Auckland War Memorial Museum', 'UNESCO Oceania']
  }
];

export const DATASET_EXPORT_PYTORCH_SNIPPET = `# world_craft_dataset.py
"""
PyTorch & HuggingFace Dataset Loader for the WorldCraft-100K Global Craft Benchmark.
Supports training MobileNetV4, Swin Transformer, YOLOv10, and CLIP Zero-Shot Craft Classifiers.
"""

import os
import json
import torch
from torch.utils.data import Dataset
from PIL import Image
import torchvision.transforms as T

class WorldCraftDataset(Dataset):
    def __init__(self, metadata_json_path, images_dir, transform=None, split='train'):
        with open(metadata_json_path, 'r', encoding='utf-8') as f:
            self.metadata = json.load(f)
            
        # Filter split
        self.items = [item for item in self.metadata if item.get('split', 'train') == split]
        self.images_dir = images_dir
        
        self.transform = transform or T.Compose([
            T.Resize((256, 256)),
            T.RandomCrop((224, 224)) if split == 'train' else T.CenterCrop((224, 224)),
            T.RandomHorizontalFlip() if split == 'train' else T.Lambda(lambda x: x),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
        # Build category mappings
        self.classes = sorted(list(set(item['category'] for item in self.metadata)))
        self.class_to_idx = {cls_name: i for i, cls_name in enumerate(self.classes)}
        
        self.countries = sorted(list(set(item['country'] for item in self.metadata)))
        self.country_to_idx = {c: i for i, c in enumerate(self.countries)}

    def __len__(self):
        return len(self.items)

    def __getitem__(self, idx):
        item = self.items[idx]
        img_path = os.path.join(self.images_dir, f"{item['id']}.jpg")
        image = Image.open(img_path).convert("RGB")
        
        if self.transform:
            image = self.transform(image)
            
        return {
            "image": image,
            "category_label": self.class_to_idx[item['category']],
            "country_label": self.country_to_idx[item['country']],
            "craft_id": item['id'],
            "typical_hours": torch.tensor(item['typicalProductionHours'], dtype=torch.float32),
            "market_value_usd": torch.tensor(item['globalMarketEstimateUSD'], dtype=torch.float32)
        }

# Usage:
# dataset = WorldCraftDataset("world_craft_metadata.json", "./images", split='train')
# dataloader = torch.utils.data.DataLoader(dataset, batch_size=32, shuffle=True)
`;
