export type ActiveTab = 'shop' | 'scanner' | 'pricing' | 'explore' | 'artisans' | 'wishlist';

export interface CartItem {
  craft: CraftSample;
  quantity: number;
}

export type PrototypeSubTab = 'cataloger' | 'pricing' | 'forecast' | 'marketplace' | 'training';

export type LanguageCode = 'en' | 'hi' | 'gu' | 'bn' | 'ta';

export type ModelArchitecture = 'mobilenet_v2' | 'random_forest' | 'arima_forecast';

export interface TrainingConfig {
  datasetName: string;
  architecture: ModelArchitecture;
  epochs: number;
  learningRate: number;
  batchSize: number;
  trainSplit: number;
  dataAugmentation: boolean;
  notes?: string;
}

export interface EpochLog {
  epoch: number;
  totalEpochs: number;
  trainLoss: number;
  valLoss: number;
  trainAccuracy: number;
  valAccuracy: number;
  learningRate: number;
  stepTimeMs: number;
}

export interface ClassEvaluation {
  className: string;
  samplesCount: number;
  precision: number;
  recall: number;
  f1Score: number;
  giCertified: boolean;
  state: string;
}

export interface TrainedModelStatus {
  version: string;
  name: string;
  architecture: ModelArchitecture;
  datasetName: string;
  totalSamples: number;
  totalClasses: number;
  valAccuracy: number;
  valLoss: number;
  trainedAt: string;
  isDeployed: boolean;
}

export interface CraftSample {
  id: string;
  name: string;
  regionalName: string;
  category: string;
  originState: string;
  cluster: string;
  giCertified: boolean;
  giTagNumber: string;
  baseMaterialCost: number;
  laborHours: number;
  artisanBaseRatePerHour: number;
  traditionalMiddlemanRetailPrice: number;
  artisanActualMiddlemanPayout: number;
  recommendedFairPrice: number;
  demandForecastNext30Days: number;
  demandGrowthRate: number;
  confidenceScore: number;
  featuresDetected: string[];
  imageUrl: string;
  artisanName: string;
  artisanExperienceYears: number;
  artisanVoiceQuote: Record<LanguageCode, string>;
  story: string;
}
