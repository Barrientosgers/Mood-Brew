import type { CaffeinePreference, DrinkTemperature, EnergyLevel, FlavorPreference, MoodFormAnswers, SweetnessPreference, WeatherVibe } from '../types';

interface MoodFormProps {
  value: MoodFormAnswers;
  onChange: <K extends keyof MoodFormAnswers>(field: K, nextValue: MoodFormAnswers[K]) => void;
  onSubmit: () => void;
  onSurprise: () => void;
  isGenerating: boolean;
}

const energyOptions: EnergyLevel[] = ['low', 'medium', 'high'];
const caffeineOptions: CaffeinePreference[] = ['yes', 'no', 'light caffeine'];
const sweetnessOptions: SweetnessPreference[] = ['none', 'light', 'medium', 'sweet'];
const flavorOptions: FlavorPreference[] = ['chocolate', 'fruity', 'floral', 'spicy', 'creamy', 'earthy', 'surprise me'];
const temperatureOptions: DrinkTemperature[] = ['hot', 'iced', 'either'];
const weatherOptions: WeatherVibe[] = ['sunny', 'rainy', 'cloudy', 'cold', 'warm', 'any'];

function FieldLabel({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-brew-espresso dark:text-brew-cream">{title}</h3>
      <p className="text-xs text-brew-cocoa/70 dark:text-brew-cream/70">{hint}</p>
    </div>
  );
}

function SelectField<T extends string>({
  label,
  hint,
  value,
  options,
  onChange,
}: {
  label: string;
  hint: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="space-y-3">
      <FieldLabel title={label} hint={hint} />
      <select className="soft-input" value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function MoodForm({ value, onChange, onSubmit, onSurprise, isGenerating }: MoodFormProps) {
  return (
    <form
      className="glass-card space-y-6 p-6 md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="pill mb-3">Build your brew</p>
          <h2 className="text-2xl font-semibold text-brew-espresso dark:text-brew-cream">Tell Mood Brew how you feel</h2>
        </div>
        <div className="hidden rounded-full bg-brew-latte/60 px-4 py-2 text-sm font-medium text-brew-cocoa md:block dark:bg-white/10 dark:text-brew-cream">
          ☕ 1 minute mood check-in
        </div>
      </div>

      <label className="space-y-3 block">
        <FieldLabel title="How are you feeling today?" hint="Examples: happy, tired, stressed, sad, focused, cozy, adventurous" />
        <input
          className="soft-input"
          value={value.mood}
          placeholder="happy, tired, stressed, ..."
          onChange={(event) => onChange('mood', event.target.value)}
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          label="Energy level"
          hint="Low, medium, or high - this helps match the drink to your day."
          value={value.energyLevel}
          options={energyOptions}
          onChange={(nextValue) => onChange('energyLevel', nextValue)}
        />
        <SelectField
          label="Do you want caffeine?"
          hint="Choose how much boost you want, if any."
          value={value.caffeinePreference}
          options={caffeineOptions}
          onChange={(nextValue) => onChange('caffeinePreference', nextValue)}
        />
        <SelectField
          label="Sweetness preference"
          hint="Pick your ideal sweetness level."
          value={value.sweetnessPreference}
          options={sweetnessOptions}
          onChange={(nextValue) => onChange('sweetnessPreference', nextValue)}
        />
        <SelectField
          label="Flavor mood"
          hint="Choose the flavor family that sounds best right now."
          value={value.flavorPreference}
          options={flavorOptions}
          onChange={(nextValue) => onChange('flavorPreference', nextValue)}
        />
        <SelectField
          label="Drink temperature"
          hint="Hot, iced, or either works for you."
          value={value.temperaturePreference}
          options={temperatureOptions}
          onChange={(nextValue) => onChange('temperaturePreference', nextValue)}
        />
        <SelectField
          label="Weather vibe"
          hint="Match your drink to the weather outside."
          value={value.weatherVibe}
          options={weatherOptions}
          onChange={(nextValue) => onChange('weatherVibe', nextValue)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="button-primary flex-1" type="submit" disabled={isGenerating}>
          {isGenerating ? 'Brewing your match...' : 'Find my mood brew'}
        </button>
        <button className="button-secondary flex-1" type="button" onClick={onSurprise} disabled={isGenerating}>
          Surprise Brew
        </button>
      </div>
    </form>
  );
}
