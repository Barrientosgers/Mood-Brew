import { drinks } from '../data/drinks';
import type { Drink, MoodFormAnswers, Recommendation, RecommendationOptions } from '../types';

const preferenceMatches: Record<string, string[]> = {
  happy: ['happy', 'celebration', 'bright', 'playful'],
  tired: ['tired', 'low energy', 'gentle', 'restorative'],
  stressed: ['stressed', 'calm', 'soothing', 'wind down'],
  sad: ['sad', 'comfort', 'soft', 'uplifting'],
  focused: ['focused', 'productive', 'clear', 'clean'],
  cozy: ['cozy', 'warm', 'blanket', 'comfort'],
  adventurous: ['adventurous', 'bold', 'explore', 'spiced'],
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function scoreByPreference<T extends string>(value: T, target: T, points: number) {
  return value === target ? points : 0;
}

function scoreDrink(drink: Drink, form: MoodFormAnswers) {
  let score = 0;
  const matchedTags: string[] = [];

  const mood = normalize(form.mood);
  const moodMatches = preferenceMatches[mood] ?? [mood];
  const tagMatch = drink.moodTags.some((tag) => moodMatches.some((match) => normalize(tag).includes(match)));
  if (tagMatch) {
    score += 30;
    matchedTags.push('mood');
  }

  if (form.energyLevel === 'high' && drink.caffeineLevel === 'high') {
    score += 18;
    matchedTags.push('energy boost');
  }
  if (form.energyLevel === 'low' && drink.caffeineLevel !== 'high') {
    score += 12;
    matchedTags.push('easy energy');
  }
  if (form.energyLevel === 'medium' && drink.caffeineLevel !== 'none') {
    score += 10;
    matchedTags.push('steady energy');
  }

  if (form.caffeinePreference === 'yes' && drink.caffeineLevel !== 'none') {
    score += 16;
    matchedTags.push('caffeine');
  }
  if (form.caffeinePreference === 'no' && drink.caffeineLevel === 'none') {
    score += 20;
    matchedTags.push('caffeine free');
  }
  if (form.caffeinePreference === 'light caffeine' && drink.caffeineLevel === 'light') {
    score += 18;
    matchedTags.push('light caffeine');
  }

  if (scoreByPreference(drink.sweetness, form.sweetnessPreference, 14)) {
    score += 14;
    matchedTags.push('sweetness');
  } else if (form.sweetnessPreference === 'sweet' && drink.sweetness === 'medium') {
    score += 8;
  }

  if (form.flavorPreference === 'surprise me') {
    score += 8;
    matchedTags.push('surprise me');
  } else if (drink.flavors.some((flavor) => normalize(flavor).includes(form.flavorPreference))) {
    score += 18;
    matchedTags.push('flavor');
  }

  if (form.temperaturePreference === 'either' || drink.temperature === 'either' || drink.temperature === form.temperaturePreference) {
    score += 12;
    matchedTags.push('temperature');
  }

  if (drink.category === 'coffee' && form.caffeinePreference !== 'no') {
    score += 4;
  }
  if (drink.category === 'tea' && form.caffeinePreference === 'no') {
    score += 4;
  }

  return { score, matchedTags };
}

function pickBestDrink(form: MoodFormAnswers, options: RecommendationOptions = {}) {
  const availableDrinks = drinks.filter((drink) => !(options.excludeIds ?? []).includes(drink.id));

  if (availableDrinks.length === 0) {
    return drinks[0];
  }

  if (options.surprise) {
    const randomIndex = Math.floor(Math.random() * availableDrinks.length);
    return availableDrinks[randomIndex];
  }

  const rankedDrinks = availableDrinks
    .map((drink) => ({ drink, ...scoreDrink(drink, form) }))
    .sort((left, right) => right.score - left.score);

  return rankedDrinks[0]?.drink ?? availableDrinks[0];
}

function buildReason(drink: Drink, form: MoodFormAnswers) {
  const reasons: string[] = [];

  if (drink.moodTags.some((tag) => normalize(tag).includes(normalize(form.mood)))) {
    reasons.push(`it matches your ${form.mood} mood`);
  }
  if (drink.caffeineLevel === 'none' && form.caffeinePreference === 'no') {
    reasons.push('it keeps things caffeine-free and gentle');
  }
  if (drink.caffeineLevel !== 'none' && form.energyLevel !== 'low') {
    reasons.push('it gives you a nice energy lift');
  }
  if (drink.flavors.includes(form.flavorPreference)) {
    reasons.push(`it leans into your ${form.flavorPreference} flavor preference`);
  }

  if (reasons.length === 0) {
    reasons.push('it balances your preferences with a cozy café feel');
  }

  return `This pick works because ${reasons.join(' and ')}.`;
}

export function buildRecommendation(form: MoodFormAnswers, options: RecommendationOptions = {}): Recommendation {
  const chosenDrink = pickBestDrink(form, options);
  const scoreData = scoreDrink(chosenDrink, form);
  const confidence = Math.min(99, Math.max(64, Math.round(58 + scoreData.score * 1.2)));

  return {
    drink: chosenDrink,
    reason: buildReason(chosenDrink, form),
    score: scoreData.score,
    confidence,
    matchedTags: scoreData.matchedTags,
  };
}
