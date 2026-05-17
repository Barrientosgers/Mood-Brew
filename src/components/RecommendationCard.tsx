import type { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSave: () => void;
  onTryAnother: () => void;
  isSaved: boolean;
}

export default function RecommendationCard({ recommendation, onSave, onTryAnother, isSaved }: RecommendationCardProps) {
  const moodScore = Math.min(100, Math.max(66, recommendation.score + 40));

  return (
    <article className="glass-card overflow-hidden p-6 md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="pill mb-3">Your recommended brew</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl" aria-hidden="true">
              {recommendation.drink.emoji}
            </span>
            <div>
              <h2 className="text-3xl font-semibold text-brew-espresso dark:text-brew-cream">{recommendation.drink.name}</h2>
              <p className="text-sm text-brew-cocoa/75 dark:text-brew-cream/70">
                {recommendation.drink.category === 'coffee' ? 'Coffee' : 'Tea'} · {recommendation.drink.temperature}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-brew-latte/60 px-4 py-3 text-right dark:bg-white/10">
          <p className="text-xs uppercase tracking-[0.2em] text-brew-cocoa/70 dark:text-brew-cream/70">Confidence</p>
          <p className="text-2xl font-bold text-brew-espresso dark:text-brew-cream">{recommendation.confidence}%</p>
        </div>
      </div>

      <div className="mb-6 rounded-3xl bg-gradient-to-r from-brew-latte/50 to-white/60 p-5 dark:from-white/10 dark:to-white/5">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-brew-cocoa dark:text-brew-cream/80">
          <span>Mood match score</span>
          <span>{moodScore}/100</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-white/80 dark:bg-white/10">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-brew-caramel via-brew-rose to-brew-tea transition-all duration-700"
            style={{ width: `${moodScore}%` }}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brew-caramel">Why it fits</h3>
          <p className="text-base leading-7 text-brew-espresso dark:text-brew-cream/90">{recommendation.reason}</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brew-caramel">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {recommendation.drink.ingredients.map((ingredient) => (
              <span key={ingredient} className="pill">
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brew-caramel">Customization idea</h3>
          <p className="text-base leading-7 text-brew-espresso dark:text-brew-cream/90">{recommendation.drink.customizationIdea}</p>
        </div>

        {recommendation.matchedTags.length > 0 ? (
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brew-caramel">Matched signals</h3>
            <div className="flex flex-wrap gap-2">
              {recommendation.matchedTags.map((tag) => (
                <span key={tag} className="rounded-full bg-brew-espresso px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-brew-espresso">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="button-primary flex-1" type="button" onClick={onSave}>
          {isSaved ? 'Saved to favorites' : 'Save to favorites'}
        </button>
        <button className="button-secondary flex-1" type="button" onClick={onTryAnother}>
          Try another recommendation
        </button>
      </div>
    </article>
  );
}
