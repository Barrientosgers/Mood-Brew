export type EnergyLevel = 'low' | 'medium' | 'high';
export type CaffeinePreference = 'yes' | 'no' | 'light caffeine';
export type SweetnessPreference = 'none' | 'light' | 'medium' | 'sweet';
export type FlavorPreference = 'chocolate' | 'fruity' | 'floral' | 'spicy' | 'creamy' | 'earthy' | 'surprise me';
export type DrinkTemperature = 'hot' | 'iced' | 'either';
export type WeatherVibe = 'sunny' | 'rainy' | 'cloudy' | 'cold' | 'warm' | 'any';

export interface MoodFormAnswers {
  mood: string;
  energyLevel: EnergyLevel;
  caffeinePreference: CaffeinePreference;
  sweetnessPreference: SweetnessPreference;
  flavorPreference: FlavorPreference;
  temperaturePreference: DrinkTemperature;
  weatherVibe: WeatherVibe;
}

export interface Drink {
  id: string;
  name: string;
  category: 'coffee' | 'tea';
  moodTags: string[];
  caffeineLevel: 'none' | 'light' | 'medium' | 'high';
  sweetness: 'none' | 'light' | 'medium' | 'sweet';
  flavors: string[];
  temperature: 'hot' | 'iced' | 'either';
  ingredients: string[];
  description: string;
  customizationIdea: string;
  emoji: string;
}

export interface Recommendation {
  drink: Drink;
  reason: string;
  score: number;
  confidence: number;
  matchedTags: string[];
}

export interface RecommendationOptions {
  surprise?: boolean;
  excludeIds?: string[];
}
