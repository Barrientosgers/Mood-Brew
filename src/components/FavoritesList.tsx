import type { Drink } from '../types';

interface FavoritesListProps {
  favorites: Drink[];
  onRemove: (id: string) => void;
}

export default function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
  return (
    <section className="glass-card p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="pill mb-3">Saved drinks</p>
          <h2 className="text-2xl font-semibold text-brew-espresso dark:text-brew-cream">Your favorites</h2>
        </div>
        <p className="text-sm text-brew-cocoa/70 dark:text-brew-cream/70">{favorites.length} saved</p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-brew-caramel/25 bg-white/50 p-6 text-center dark:border-white/15 dark:bg-white/5">
          <p className="text-3xl">🍪</p>
          <p className="mt-3 text-sm text-brew-cocoa/75 dark:text-brew-cream/75">
            Save a recommendation to keep your favorite cozy drinks in one place.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((drink) => (
            <article
              key={drink.id}
              className="rounded-3xl border border-white/50 bg-white/70 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl">{drink.emoji}</p>
                  <h3 className="mt-2 text-lg font-semibold text-brew-espresso dark:text-brew-cream">{drink.name}</h3>
                  <p className="text-sm text-brew-cocoa/70 dark:text-brew-cream/70">
                    {drink.category === 'coffee' ? 'Coffee' : 'Tea'} · {drink.temperature}
                  </p>
                </div>
                <button
                  className="rounded-full bg-brew-espresso px-3 py-2 text-xs font-semibold text-white transition hover:bg-brew-caramel"
                  type="button"
                  onClick={() => onRemove(drink.id)}
                >
                  Remove
                </button>
              </div>
              <p className="mt-3 text-sm leading-6 text-brew-espresso/85 dark:text-brew-cream/85">{drink.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
