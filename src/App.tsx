import { useEffect, useRef, useState } from 'react';
import FavoritesList from './components/FavoritesList';
import MoodForm from './components/MoodForm';
import RecommendationCard from './components/RecommendationCard';
import { buildRecommendation } from './utils/recommendationEngine';
import type { Drink, MoodFormAnswers, Recommendation } from './types';

const defaultForm: MoodFormAnswers = {
  mood: '',
  energyLevel: 'medium',
  caffeinePreference: 'yes',
  sweetnessPreference: 'light',
  flavorPreference: 'creamy',
  temperaturePreference: 'either',
};

const moodQuotes = [
  'A calm cup can turn a noisy day into something softer.',
  'Your mood does not need fixing. It may just need the right brew.',
  'Warm drinks, warm thoughts, and one small cozy decision at a time.',
  'Every café order is a tiny act of self-care.',
  'Good drinks do not solve everything, but they make the moment gentler.',
];

function loadLocalStorageValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [form, setForm] = useState<MoodFormAnswers>(defaultForm);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [favorites, setFavorites] = useState<Drink[]>(() => loadLocalStorageValue<Drink[]>('mood-brew-favorites', []));
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadLocalStorageValue<'light' | 'dark'>('mood-brew-theme', 'light'));
  const [quote, setQuote] = useState(() => moodQuotes[Math.floor(Math.random() * moodQuotes.length)]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    window.localStorage.setItem('mood-brew-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem('mood-brew-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const saveRecommendation = (drink: Drink) => {
    setFavorites((current) => {
      if (current.some((savedDrink) => savedDrink.id === drink.id)) {
        return current;
      }
      return [drink, ...current];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((current) => current.filter((drink) => drink.id !== id));
  };

  const generateRecommendation = (mode: 'normal' | 'surprise' | 'another' = 'normal') => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setIsGenerating(true);
    setQuote(moodQuotes[Math.floor(Math.random() * moodQuotes.length)]);

    timerRef.current = window.setTimeout(() => {
      const nextRecommendation = buildRecommendation(form, {
        surprise: mode === 'surprise',
        excludeIds: mode === 'another' && recommendation ? [recommendation.drink.id] : [],
      });
      setRecommendation(nextRecommendation);
      setIsGenerating(false);
    }, 900);
  };

  const recommendationSaved = recommendation ? favorites.some((drink) => drink.id === recommendation.drink.id) : false;

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-6rem] top-[-5rem] h-56 w-56 rounded-full bg-brew-latte/60 blur-3xl dark:bg-brew-tea/20" />
      <div className="pointer-events-none absolute right-[-4rem] top-32 h-64 w-64 rounded-full bg-brew-rose/25 blur-3xl dark:bg-brew-caramel/20" />
      <div className="pointer-events-none absolute bottom-[-5rem] left-1/4 h-64 w-64 rounded-full bg-brew-tea/20 blur-3xl dark:bg-brew-mint/10" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/40 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-brew-caramel to-brew-latte text-2xl shadow-lg">
              ☕
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brew-caramel">Mood Brew</p>
              <h1 className="text-2xl font-semibold text-brew-espresso dark:text-brew-cream">A cozy café mood matcher</h1>
            </div>
          </div>
          <button className="button-secondary self-start md:self-auto" type="button" onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}>
            {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
          </button>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <section className="glass-card overflow-hidden p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div className="space-y-5">
                  <span className="pill">AI-inspired, beginner-friendly, and fully local</span>
                  <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-brew-espresso dark:text-brew-cream md:text-5xl">
                    Find the drink that fits your mood, not just your caffeine level.
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-brew-cocoa/80 dark:text-brew-cream/75">
                    Tell Mood Brew how you feel, what flavor you want, and whether you want a coffee or tea vibe. The app uses a local recommendation engine for now, with a clean structure that can later swap to an OpenAI call.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="pill">☕ Cozy coffee</span>
                    <span className="pill">🍵 Calm tea</span>
                    <span className="pill">✨ Sweet surprises</span>
                    <span className="pill">📱 Mobile friendly</span>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-gradient-to-br from-white/80 to-brew-latte/40 p-5 shadow-inner dark:from-white/5 dark:to-white/10">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brew-caramel">Today&apos;s mood quote</p>
                  <p className="mt-4 text-2xl font-medium leading-9 text-brew-espresso dark:text-brew-cream">“{quote}”</p>
                  <div className="mt-6 flex items-center gap-3 rounded-3xl bg-white/70 p-4 dark:bg-white/5">
                    <div className="animate-float text-3xl">🥤</div>
                    <div>
                      <p className="text-sm font-semibold text-brew-espresso dark:text-brew-cream">Brewing logic</p>
                      <p className="text-sm text-brew-cocoa/75 dark:text-brew-cream/70">
                        Local scoring, local storage, and clean TypeScript types.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <MoodForm
              value={form}
              onChange={(field, nextValue) => setForm((current) => ({ ...current, [field]: nextValue }))}
              onSubmit={() => generateRecommendation('normal')}
              onSurprise={() => generateRecommendation('surprise')}
              isGenerating={isGenerating}
            />
          </div>

          <div className="space-y-6">
            {isGenerating ? (
              <section className="glass-card flex min-h-[28rem] flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-brew-caramel/20 blur-2xl animate-pulseSoft" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brew-caramel to-brew-latte text-4xl shadow-lg animate-float">
                    ☕
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-brew-espresso dark:text-brew-cream">Brewing your perfect match</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-brew-cocoa/75 dark:text-brew-cream/75">
                  We are comparing your mood, sweetness, flavor, caffeine, and temperature preferences right now.
                </p>
                <div className="mt-6 flex items-center gap-2 text-brew-caramel">
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current" />
                </div>
              </section>
            ) : recommendation ? (
              <RecommendationCard
                recommendation={recommendation}
                onSave={() => saveRecommendation(recommendation.drink)}
                onTryAnother={() => generateRecommendation('another')}
                isSaved={recommendationSaved}
              />
            ) : (
              <section className="glass-card flex min-h-[28rem] flex-col justify-center p-8">
                <p className="pill mb-4 self-start">Start here</p>
                <h3 className="text-3xl font-semibold text-brew-espresso dark:text-brew-cream">Your brew will appear here</h3>
                <p className="mt-4 max-w-md text-base leading-7 text-brew-cocoa/75 dark:text-brew-cream/75">
                  Fill out the mood form, then press Find my mood brew or Surprise Brew to discover a personalized drink recommendation.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {['Mood', 'Flavor', 'Temperature'].map((label) => (
                    <div key={label} className="rounded-3xl bg-white/60 p-4 text-center dark:bg-white/5">
                      <p className="text-2xl">{label === 'Mood' ? '🙂' : label === 'Flavor' ? '🍯' : '🌡️'}</p>
                      <p className="mt-2 text-sm font-medium text-brew-espresso dark:text-brew-cream">{label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>

        <div className="mt-6">
          <FavoritesList favorites={favorites} onRemove={removeFavorite} />
        </div>

        <footer className="py-8 text-center text-sm text-brew-cocoa/70 dark:text-brew-cream/70">
          Built with React, TypeScript, Tailwind CSS, and a beginner-friendly local recommendation engine.
        </footer>
      </div>
    </main>
  );
}
