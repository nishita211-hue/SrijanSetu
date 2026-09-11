import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Database, 
  Play, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Layers, 
  Sliders, 
  FileCode, 
  Terminal, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  RefreshCw,
  Plus,
  BarChart3,
  FileSpreadsheet
} from 'lucide-react';
import { 
  LanguageCode, 
  ModelArchitecture, 
  TrainingConfig, 
  EpochLog, 
  ClassEvaluation, 
  TrainedModelStatus 
} from '../types';

interface ModelTrainingViewProps {
  currentLanguage: LanguageCode;
  onModelDeployed?: (modelStatus: TrainedModelStatus) => void;
}

interface CustomCraftRow {
  id: string;
  craftName: string;
  category: string;
  state: string;
  districtCluster: string;
  giCertified: boolean;
  baseMaterialCost: number;
  laborHours: number;
  marketPrice: number;
}

const PRELOADED_DATASETS = [
  {
    id: 'craft-master',
    name: 'All-India & Gujarat Master Craft Dataset',
    sampleCount: 5280,
    classesCount: 35,
    description: 'Comprehensive augmented dataset across all 28 states of India with high-resolution texture crops, material annotations, and GI registry mappings.',
    giCoverage: '100% Verified',
    origin: 'Ministry of Textiles & Gujarat Cottage Industries'
  },
  {
    id: 'indextc-gujarat',
    name: 'Gujarat INDEXT-C Master Artisans Registry Dataset',
    sampleCount: 1440,
    classesCount: 12,
    description: 'Official dataset directly mapped from the Gujarat Government Cottage & Rural Industries portal, including Patan Patola, Rogan, Mata ni Pachedi, and Tangaliya.',
    giCoverage: 'Govt Certified',
    origin: 'INDEXT-C, Gandhinagar'
  },
  {
    id: 'gi-textiles',
    name: 'Indian GI Handlooms & Luxury Textiles Dataset',
    sampleCount: 3200,
    classesCount: 18,
    description: 'Focuses on complex weave structures: Kanchipuram Silk, Varanasi Brocade, Chanderi, Pashmina needlework, and Pochampally Ikat.',
    giCoverage: 'GI Registered',
    origin: 'Weavers Service Centres (WSC)'
  },
  {
    id: 'global-heritage',
    name: 'Global UNESCO World Crafts Council Heritage Dataset',
    sampleCount: 1800,
    classesCount: 15,
    description: 'International benchmark crafts for comparative material analysis (Murano glass, Damascene steel, Persian rugs, Delft pottery).',
    giCoverage: 'UNESCO Recognized',
    origin: 'World Crafts Council International'
  }
];

const SAMPLE_NEW_CRAFTS: CustomCraftRow[] = [
  {
    id: 'new-1',
    craftName: 'Tangaliya Dana Weaving',
    category: 'Textiles & Handlooms',
    state: 'Gujarat',
    districtCluster: 'Surendranagar / Wadhwan',
    giCertified: true,
    baseMaterialCost: 1800,
    laborHours: 52,
    marketPrice: 7500
  },
  {
    id: 'new-2',
    craftName: 'Kutch Copper Coated Bell Craft',
    category: 'Metalware & Bells',
    state: 'Gujarat',
    districtCluster: 'Kutch / Nirona',
    giCertified: true,
    baseMaterialCost: 450,
    laborHours: 14,
    marketPrice: 1950
  },
  {
    id: 'new-3',
    craftName: 'Sankheda Lacquered Teak Woodcraft',
    category: 'Woodcraft & Lacquer',
    state: 'Gujarat',
    districtCluster: 'Chhota Udaipur / Sankheda',
    giCertified: true,
    baseMaterialCost: 2400,
    laborHours: 40,
    marketPrice: 9200
  },
  {
    id: 'new-4',
    craftName: 'Kotpad Natural Dye Tribal Weaving',
    category: 'Textiles & Handlooms',
    state: 'Odisha',
    districtCluster: 'Koraput',
    giCertified: true,
    baseMaterialCost: 1200,
    laborHours: 36,
    marketPrice: 5800
  },
  {
    id: 'new-5',
    craftName: 'Bidriware Silver Inlay Metal',
    category: 'Metalwork & Inlay',
    state: 'Karnataka',
    districtCluster: 'Bidar',
    giCertified: true,
    baseMaterialCost: 1600,
    laborHours: 28,
    marketPrice: 6400
  }
];

export const ModelTrainingView: React.FC<ModelTrainingViewProps> = ({ 
  currentLanguage,
  onModelDeployed 
}) => {
  // State
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('craft-master');
  const [selectedArchitecture, setSelectedArchitecture] = useState<ModelArchitecture>('mobilenet_v2');
  const [epochs, setEpochs] = useState<number>(15);
  const [learningRate, setLearningRate] = useState<number>(0.001);
  const [batchSize, setBatchSize] = useState<number>(32);
  const [trainSplit, setTrainSplit] = useState<number>(80);
  const [dataAugmentation, setDataAugmentation] = useState<boolean>(true);

  // Custom Dataset state
  const [customRows, setCustomRows] = useState<CustomCraftRow[]>([]);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  // Training state
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingProgress, setTrainingProgress] = useState<number>(0);
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  const [epochLogs, setEpochLogs] = useState<EpochLog[]>([]);
  const [classEvaluations, setClassEvaluations] = useState<ClassEvaluation[]>([]);
  const [activeModel, setActiveModel] = useState<TrainedModelStatus>({
    version: 'SrijanSetu-Vision v2.4',
    name: 'MobileNetV2 Heritage Craft Fine-Tuned',
    architecture: 'mobilenet_v2',
    datasetName: 'All-India & Gujarat Master Craft Dataset',
    totalSamples: 5280,
    totalClasses: 35,
    valAccuracy: 98.4,
    valLoss: 0.0842,
    trainedAt: '2026-09-10T06:45:00.000Z',
    isDeployed: true
  });
  const [trainingSummary, setTrainingSummary] = useState<any | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'System initialized. SrijanSetu ML Training Environment ready.',
    'Backend compute: PyTorch 2.4 / TensorFlow Lite runtime ready.',
    'GPU acceleration: Enabled (Simulated CUDA & WebGL FP16 pipeline).'
  ]);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedSuccess, setDeployedSuccess] = useState<boolean>(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Fetch current model status on mount
  useEffect(() => {
    fetch('/api/model-status')
      .then(res => res.json())
      .then(data => {
        if (data.model) {
          setActiveModel(data.model);
        }
      })
      .catch(err => console.error('Failed to fetch model status:', err));
  }, []);

  // Handle CSV / JSON Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    setIsCustomMode(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            const mapped: CustomCraftRow[] = parsed.map((item, idx) => ({
              id: item.id || `custom-${idx}`,
              craftName: item.craftName || item.name || 'Custom Craft Specimen',
              category: item.category || 'Handicrafts',
              state: item.state || 'India',
              districtCluster: item.districtCluster || item.district || 'Heritage Cluster',
              giCertified: Boolean(item.giCertified ?? true),
              baseMaterialCost: Number(item.baseMaterialCost || item.materialCost || 1200),
              laborHours: Number(item.laborHours || 24),
              marketPrice: Number(item.marketPrice || item.fairPrice || 4500)
            }));
            setCustomRows(mapped);
            setTerminalLogs(prev => [
              ...prev,
              `Successfully loaded ${mapped.length} craft records from JSON dataset "${file.name}".`
            ]);
          }
        } else {
          // Simple CSV parsing
          const lines = text.split('\n').filter(l => l.trim().length > 0);
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          const rows: CustomCraftRow[] = [];

          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            if (cols.length >= 2) {
              rows.push({
                id: `csv-${i}`,
                craftName: cols[0] || `Craft ${i}`,
                category: cols[1] || 'Traditional Craft',
                state: cols[2] || 'Gujarat',
                districtCluster: cols[3] || 'Artisan Cluster',
                giCertified: cols[4] ? cols[4].toLowerCase().includes('true') || cols[4].toLowerCase().includes('yes') : true,
                baseMaterialCost: Number(cols[5]) || 1200,
                laborHours: Number(cols[6]) || 24,
                marketPrice: Number(cols[7]) || 4200
              });
            }
          }
          setCustomRows(rows);
          setTerminalLogs(prev => [
            ...prev,
            `Successfully parsed CSV dataset "${file.name}" with ${rows.length} custom samples.`
          ]);
        }
      } catch (err: any) {
        setTerminalLogs(prev => [...prev, `Error parsing dataset file: ${err.message}`]);
      }
    };

    reader.readAsText(file);
  };

  // Load sample custom expansion dataset
  const handleLoadSampleDataset = () => {
    setIsCustomMode(true);
    setUploadFileName('gujarat_new_clusters_expansion.csv');
    setCustomRows(SAMPLE_NEW_CRAFTS);
    setTerminalLogs(prev => [
      ...prev,
      'Loaded pre-verified expansion dataset: "Gujarat Tangaliya, Bell Metal & Bidriware Collection" (5 new GI clusters).'
    ]);
  };

  // Start Training
  const handleStartTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setCurrentEpoch(0);
    setEpochLogs([]);
    setClassEvaluations([]);
    setTrainingSummary(null);
    setDeployedSuccess(false);

    const activeDatasetName = isCustomMode 
      ? (uploadFileName || 'Custom Uploaded Dataset')
      : (PRELOADED_DATASETS.find(d => d.id === selectedDatasetId)?.name || 'Selected Dataset');

    setTerminalLogs(prev => [
      ...prev,
      '-------------------------------------------------------',
      `Starting training run: ${activeDatasetName}`,
      `Model Architecture: ${selectedArchitecture.toUpperCase()} | Epochs: ${epochs} | Batch Size: ${batchSize} | LR: ${learningRate}`,
      `Data Augmentation: ${dataAugmentation ? 'ON (Affine, ColorJitter, MixUp)' : 'OFF'} | Train Split: ${trainSplit}%`,
      'Loading dataset into memory and initializing weights...'
    ]);

    try {
      // Call backend training endpoint
      const response = await fetch('/api/train-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetName: activeDatasetName,
          architecture: selectedArchitecture,
          epochs,
          learningRate,
          batchSize,
          trainSplit,
          dataAugmentation,
          customRecords: isCustomMode ? customRows : []
        })
      });

      const data = await response.json();

      if (data.success && data.epochLogs) {
        // Stream epochs step-by-step for visual feedback
        const allLogs: EpochLog[] = data.epochLogs;
        const total = allLogs.length;

        for (let i = 0; i < total; i++) {
          await new Promise(resolve => setTimeout(resolve, 200));
          const log = allLogs[i];
          setCurrentEpoch(log.epoch);
          setTrainingProgress(Math.round(((i + 1) / total) * 100));
          setEpochLogs(prev => [...prev, log]);
          setTerminalLogs(prev => [
            ...prev,
            `Epoch ${String(log.epoch).padStart(2, '0')}/${String(log.totalEpochs).padStart(2, '0')} - train_loss: ${log.trainLoss.toFixed(4)} - val_loss: ${log.valLoss.toFixed(4)} - val_acc: ${log.valAccuracy.toFixed(1)}% [${log.stepTimeMs}ms/step]`
          ]);
        }

        setClassEvaluations(data.classEvaluations || []);
        setActiveModel(data.modelStatus);
        setTrainingSummary(data.summary);
        setTerminalLogs(prev => [
          ...prev,
          '✓ Model training completed successfully!',
          `Final Validation Accuracy: ${data.summary.finalAccuracy} | Loss: ${data.summary.finalLoss}`,
          `Quantized Edge Model: srijansetu_mobilenet_v2.tflite (~${(data.summary.edgeModelSizeKB / 1024).toFixed(2)} MB)`,
          'Ready to deploy into live SrijanSetu inference pipeline.'
        ]);
      } else {
        throw new Error(data.error || 'Training failed');
      }
    } catch (err: any) {
      setTerminalLogs(prev => [...prev, `Error during model training: ${err.message}`]);
    } finally {
      setIsTraining(false);
    }
  };

  // Deploy trained model into live app
  const handleDeployModel = async () => {
    setIsDeploying(true);
    try {
      const response = await fetch('/api/deploy-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setDeployedSuccess(true);
        setActiveModel(prev => ({ ...prev, isDeployed: true }));
        if (onModelDeployed) {
          onModelDeployed(data.model);
        }
        setTerminalLogs(prev => [
          ...prev,
          `✓ Model version ${data.model.version} is now DEPLOYED and ACTIVE across all SrijanSetu endpoints!`
        ]);
        setTimeout(() => setDeployedSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to deploy model:', err);
    } finally {
      setIsDeploying(false);
    }
  };

  // Download TFLite edge model file
  const handleDownloadTFLite = () => {
    const meta = {
      modelName: activeModel.name,
      version: activeModel.version,
      architecture: activeModel.architecture,
      inputShape: [1, 224, 224, 3],
      classesCount: activeModel.totalClasses,
      quantization: 'INT8 Edge Optimized',
      valAccuracy: activeModel.valAccuracy,
      createdDate: activeModel.trainedAt
    };
    const blob = new Blob([JSON.stringify(meta, null, 2)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'srijansetu_mobilenet_v2_quantized.tflite';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download training python script
  const handleDownloadPythonScript = () => {
    const pythonCode = `"""
SrijanSetu: Official Model Training Script
Architecture: MobileNetV2 Fine-Tuning on Indian Heritage GI Crafts
Dataset: ${isCustomMode ? uploadFileName || 'Custom' : selectedDatasetId}
"""

import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# 1. Hyperparameters
IMG_SIZE = (224, 224)
BATCH_SIZE = ${batchSize}
EPOCHS = ${epochs}
LEARNING_RATE = ${learningRate}
NUM_CLASSES = ${activeModel.totalClasses}

# 2. Data Augmentation Pipeline for Handlooms & Intricate Crafts
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.15,
    height_shift_range=0.15,
    shear_range=0.15,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='reflect',
    validation_split=0.20
)

# 3. Base Pretrained Architecture (MobileNetV2)
base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False  # Freeze base layers for transfer learning

# 4. Craft Classification Head
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.3)(x)
predictions = Dense(NUM_CLASSES, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# 5. Compile Model with Adam Optimizer
model.compile(
    optimizer=Adam(learning_rate=LEARNING_RATE),
    loss='categorical_crossentropy',
    metrics=['accuracy', tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
)

print(f"SrijanSetu Model initialized. Target classes: {NUM_CLASSES}")
model.summary()

# 6. Fine-Tuning Stage: Unfreeze top 30 layers
for layer in base_model.layers[-30:]:
    layer.trainable = True

# 7. Export to TFLite for Rural Offline Android App
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()

with open('srijansetu_model.tflite', 'wb') as f:
    f.write(tflite_model)
print("Quantized TFLite edge model exported successfully!")
`;

    const blob = new Blob([pythonCode], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'train_srijansetu_model.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export current dataset to CSV
  const handleExportDatasetCSV = () => {
    const dataToExport = isCustomMode && customRows.length > 0 ? customRows : SAMPLE_NEW_CRAFTS;
    let csv = 'craft_name,category,state,district_cluster,gi_certified,base_material_cost_inr,labor_hours,fair_market_price_inr\n';
    dataToExport.forEach(r => {
      csv += `"${r.craftName}","${r.category}","${r.state}","${r.districtCluster}",${r.giCertified},${r.baseMaterialCost},${r.laborHours},${r.marketPrice}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'srijansetu_craft_dataset.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Active Model Status Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                Active Inference Engine
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Deployed
              </span>
            </div>
            <h2 className="text-2xl font-serif-heritage font-bold text-stone-900 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-amber-800" />
              {activeModel.name}
            </h2>
            <p className="text-xs text-stone-600 max-w-3xl">
              Fine-tuned on <strong className="text-stone-800">{activeModel.datasetName}</strong> with {activeModel.totalClasses} registered heritage lineages and {activeModel.totalSamples.toLocaleString()} training specimens.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-center">
              <span className="text-[10px] text-stone-500 font-semibold uppercase block">Accuracy</span>
              <span className="text-lg font-bold font-mono text-emerald-700">{activeModel.valAccuracy}%</span>
            </div>
            <div className="text-center border-x border-stone-200 px-2">
              <span className="text-[10px] text-stone-500 font-semibold uppercase block">Loss</span>
              <span className="text-lg font-bold font-mono text-amber-700">{activeModel.valLoss}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-stone-500 font-semibold uppercase block">Classes</span>
              <span className="text-lg font-bold font-mono text-stone-800">{activeModel.totalClasses}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls & Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Dataset & Hyperparameters (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Dataset Selection & Ingestion */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h3 className="font-bold text-stone-900 text-sm">
                  Select or Ingest Training Dataset
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCustomMode(false)}
                  className={`text-xs px-2.5 py-1 rounded font-semibold transition ${
                    !isCustomMode 
                      ? 'bg-amber-900 text-white shadow-sm' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Preloaded Datasets
                </button>
                <button
                  onClick={() => setIsCustomMode(true)}
                  className={`text-xs px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 ${
                    isCustomMode 
                      ? 'bg-amber-900 text-white shadow-sm' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  Custom Dataset
                </button>
              </div>
            </div>

            {!isCustomMode ? (
              /* Preloaded Datasets List */
              <div className="space-y-2">
                {PRELOADED_DATASETS.map(dataset => (
                  <div
                    key={dataset.id}
                    onClick={() => setSelectedDatasetId(dataset.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition flex items-start justify-between gap-3 ${
                      selectedDatasetId === dataset.id
                        ? 'border-amber-700 bg-amber-50/60 ring-1 ring-amber-700'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{dataset.name}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-stone-200 text-stone-800 rounded">
                          {dataset.classesCount} Classes
                        </span>
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                          {dataset.giCoverage}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug">{dataset.description}</p>
                      <span className="text-[10px] text-stone-500 font-mono">Source: {dataset.origin}</span>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-xs font-bold font-mono text-stone-800">{dataset.sampleCount.toLocaleString()}</span>
                      <span className="text-[10px] text-stone-500 block">samples</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Custom Dataset Upload Area */
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv,.json"
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 hover:border-amber-700 hover:bg-amber-50/40 p-6 rounded-xl text-center cursor-pointer transition space-y-2"
                >
                  <Upload className="w-7 h-7 text-amber-800 mx-auto" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-stone-900 block">
                      Click to upload new dataset (.csv or .json)
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      Columns supported: craftName, category, state, giCertified, baseMaterialCost, laborHours, marketPrice
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handleLoadSampleDataset}
                    className="text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/80 hover:bg-amber-200/80 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Load Pre-Built Expansion Dataset (5 New Crafts)
                  </button>

                  <button
                    onClick={handleExportDatasetCSV}
                    className="text-xs font-semibold text-stone-700 hover:bg-stone-100 px-2.5 py-1.5 rounded-lg border border-stone-200 transition flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    Download Template
                  </button>
                </div>

                {customRows.length > 0 && (
                  <div className="bg-stone-50 rounded-lg p-3 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800">
                        {uploadFileName || 'Custom Ingested Records'} ({customRows.length} classes loaded)
                      </span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Training
                      </span>
                    </div>

                    <div className="max-h-40 overflow-y-auto divide-y divide-stone-200 text-[11px]">
                      {customRows.map(row => (
                        <div key={row.id} className="py-1.5 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-stone-900">{row.craftName}</span>
                            <span className="text-stone-500 ml-2">({row.state} &bull; {row.category})</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-stone-600">
                            <span>{row.laborHours}h labor</span>
                            <span className="font-semibold text-amber-900">₹{row.marketPrice}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Architecture & Hyperparameters */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-sm">
                Model Architecture & Hyperparameters
              </h3>
            </div>

            {/* Architecture Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { 
                  id: 'mobilenet_v2', 
                  name: 'MobileNetV2 (Vision)', 
                  badge: 'Recommended',
                  desc: 'Computer Vision transfer learning for authentic weave pattern & material classification.'
                },
                { 
                  id: 'random_forest', 
                  name: 'RandomForest (Pricing)', 
                  badge: 'Pricing Engine',
                  desc: 'Ethical cost-to-retail model predicting fair artisan living wages vs middleman markups.'
                },
                { 
                  id: 'arima_forecast', 
                  name: 'ARIMA (Forecasting)', 
                  badge: 'Time-Series',
                  desc: 'Multi-horizon seasonal forecasting predicting upcoming festival inventory spikes.'
                }
              ].map(arch => (
                <div
                  key={arch.id}
                  onClick={() => setSelectedArchitecture(arch.id as ModelArchitecture)}
                  className={`p-3 rounded-lg border cursor-pointer transition space-y-1 ${
                    selectedArchitecture === arch.id
                      ? 'border-amber-700 bg-amber-50/60 ring-1 ring-amber-700'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{arch.name}</span>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-snug">{arch.desc}</p>
                </div>
              ))}
            </div>

            {/* Hyperparameter Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-600 block">
                  Epochs: <span className="font-mono font-bold text-stone-900">{epochs}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={epochs}
                  onChange={e => setEpochs(Number(e.target.value))}
                  className="w-full accent-amber-900 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-600 block">
                  Learning Rate
                </label>
                <select
                  value={learningRate}
                  onChange={e => setLearningRate(Number(e.target.value))}
                  className="w-full text-xs font-mono font-semibold border border-stone-300 rounded p-1.5 bg-white"
                >
                  <option value={0.0001}>0.0001 (Fine)</option>
                  <option value={0.0005}>0.0005 (Optimal)</option>
                  <option value={0.001}>0.0010 (Standard)</option>
                  <option value={0.005}>0.0050 (Fast)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-600 block">
                  Batch Size
                </label>
                <select
                  value={batchSize}
                  onChange={e => setBatchSize(Number(e.target.value))}
                  className="w-full text-xs font-mono font-semibold border border-stone-300 rounded p-1.5 bg-white"
                >
                  <option value={16}>16 (Low Memory)</option>
                  <option value={32}>32 (Balanced)</option>
                  <option value={64}>64 (Fast GPU)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-600 block">
                  Train/Val Split
                </label>
                <select
                  value={trainSplit}
                  onChange={e => setTrainSplit(Number(e.target.value))}
                  className="w-full text-xs font-mono font-semibold border border-stone-300 rounded p-1.5 bg-white"
                >
                  <option value={80}>80% / 20%</option>
                  <option value={70}>70% / 30%</option>
                  <option value={85}>85% / 15%</option>
                </select>
              </div>
            </div>

            {/* Data Augmentation Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-stone-900 block">
                  Handloom Texture Data Augmentation (4x Expansion)
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Applies random affine rotations (±15°), lighting color jitter, zoom crops, and horizontal flips.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDataAugmentation(!dataAugmentation)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  dataAugmentation ? 'bg-amber-900' : 'bg-stone-300'
                }`}
              >
                <span 
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    dataAugmentation ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </button>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={handleStartTraining}
                disabled={isTraining}
                className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] ${
                  isTraining 
                    ? 'bg-stone-400 cursor-not-allowed' 
                    : 'bg-amber-900 hover:bg-amber-850 shadow-amber-950/20'
                }`}
                id="start-model-training-button"
              >
                {isTraining ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Training Epoch {currentEpoch} of {epochs} ({trainingProgress}%)...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    Train Model with Selected Dataset
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Terminal & Training Curves (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Progress Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-800" />
                Training Loss & Accuracy Curves
              </h3>
              <span className="text-xs font-mono font-bold text-stone-600">
                {trainingProgress}% Completed
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
              <div 
                className="bg-amber-800 h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${trainingProgress}%` }}
              />
            </div>

            {/* Visual Mini Graph of Epochs */}
            <div className="h-28 bg-stone-950 rounded-lg p-3 flex flex-col justify-between font-mono text-[10px] text-stone-300 overflow-hidden relative">
              <div className="flex justify-between items-center text-[10px] border-b border-stone-800 pb-1">
                <span className="text-emerald-400">● Accuracy: {epochLogs.length > 0 ? epochLogs[epochLogs.length - 1].valAccuracy : activeModel.valAccuracy}%</span>
                <span className="text-amber-400">● Loss: {epochLogs.length > 0 ? epochLogs[epochLogs.length - 1].valLoss : activeModel.valLoss}</span>
                <span className="text-stone-500">Epoch {currentEpoch || activeModel.epochsTrained || epochs}/{epochs}</span>
              </div>

              {/* SVG Sparkline */}
              <div className="relative flex-1 w-full flex items-end pt-1">
                {epochLogs.length > 0 ? (
                  <svg className="w-full h-16" viewBox="0 0 100 40" preserveAspectRatio="none">
                    {/* Accuracy Line */}
                    <polyline
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                      points={epochLogs.map((log, idx) => {
                        const x = (idx / (epochLogs.length - 1 || 1)) * 100;
                        const y = 40 - (log.valAccuracy / 100) * 36;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                    {/* Loss Line */}
                    <polyline
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                      points={epochLogs.map((log, idx) => {
                        const x = (idx / (epochLogs.length - 1 || 1)) * 100;
                        const y = Math.min(38, (log.valLoss / 2.0) * 38);
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                  </svg>
                ) : (
                  <div className="w-full text-center text-stone-500 text-[11px] py-4">
                    Ready to start training. Curves will render here in real-time.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Real-time Streaming Terminal */}
          <div className="bg-stone-900 rounded-xl border border-stone-800 p-4 shadow-sm space-y-2 text-stone-200 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold text-stone-300">PyTorch & TFLite Build Stream</span>
              </div>
              <span className="text-[10px] text-stone-500">FP16 Hardware Accelerate</span>
            </div>

            <div className="h-52 overflow-y-auto space-y-1 text-[11px] scrollbar-thin scrollbar-thumb-stone-700">
              {terminalLogs.map((line, idx) => (
                <div key={idx} className="leading-relaxed">
                  {line.startsWith('✓') ? (
                    <span className="text-emerald-400 font-bold">{line}</span>
                  ) : line.startsWith('Epoch') ? (
                    <span className="text-amber-300">{line}</span>
                  ) : line.startsWith('Error') ? (
                    <span className="text-red-400 font-bold">{line}</span>
                  ) : (
                    <span className="text-stone-400">{line}</span>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Deployment & Export Actions */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wide">
                Export & Hot-Reload Model
              </h3>
              {deployedSuccess && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Deployed Live!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleDeployModel}
                disabled={isDeploying || isTraining}
                className="py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                id="deploy-trained-model-button"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-300" />
                Hot-Reload & Deploy Live
              </button>

              <button
                onClick={handleDownloadTFLite}
                className="py-2.5 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                id="download-tflite-button"
              >
                <Download className="w-3.5 h-3.5 text-stone-600" />
                Edge TFLite (.tflite)
              </button>

              <button
                onClick={handleDownloadPythonScript}
                className="py-2.5 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition sm:col-span-2"
                id="download-python-script-button"
              >
                <FileCode className="w-3.5 h-3.5 text-amber-800" />
                Download Colab / PyTorch Training Script (.py)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Class Evaluations & Performance Matrix */}
      {classEvaluations.length > 0 && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif-heritage font-bold text-stone-900 text-lg">
                Craft Class Evaluation Matrix (Test Split)
              </h3>
              <p className="text-xs text-stone-600">
                Detailed precision, recall, and F1-scores achieved across heritage craft lineages after training.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Macro F1: {(classEvaluations.reduce((acc, c) => acc + c.f1Score, 0) / classEvaluations.length).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded-lg">
              <thead className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Heritage Craft Class</th>
                  <th className="py-2.5 px-3">State Origin</th>
                  <th className="py-2.5 px-3">GI Status</th>
                  <th className="py-2.5 px-3 text-right">Samples</th>
                  <th className="py-2.5 px-3 text-right">Precision</th>
                  <th className="py-2.5 px-3 text-right">Recall</th>
                  <th className="py-2.5 px-3 text-right font-bold text-amber-900">F1-Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {classEvaluations.map((c, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60 transition">
                    <td className="py-2 px-3 font-sans font-bold text-stone-900">{c.className}</td>
                    <td className="py-2 px-3 font-sans text-stone-600">{c.state}</td>
                    <td className="py-2 px-3 font-sans">
                      {c.giCertified ? (
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                          GI Certified
                        </span>
                      ) : (
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                          Traditional
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right text-stone-600">{c.samplesCount}</td>
                    <td className="py-2 px-3 text-right text-stone-700">{c.precision}%</td>
                    <td className="py-2 px-3 text-right text-stone-700">{c.recall}%</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-700">{c.f1Score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
