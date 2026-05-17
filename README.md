# Mood Brew

Mood Brew recommends cozy coffee and tea drinks based on your mood and preferences. It's a small, beginner-friendly React + TypeScript app that runs locally and is ready for simple GitHub Pages deployment.

Why this project exists
- Learn component-based React with TypeScript and Tailwind.
- Build a lightweight recommendation engine you can run offline.
- Practice deploying a Vite app to GitHub Pages.

Key features
- Mood-based drink suggestions (energy, sweetness, temperature, flavor mood).
- Local recommendation engine (no external API required).
- Save favorites in `localStorage`.
- Responsive UI with reusable components.

Local "AI" explanation
- The app uses a deterministic, local recommendation engine that scores drink metadata against your inputs (mood, weather vibe, energy, etc.). This mimics an "AI-like" suggestion system without calling external services. The code is structured so a future OpenAI or other model integration can replace the local engine easily.

Quick start
1. Install dependencies:
```bash
npm install
```
2. Run locally (dev server):
```bash
npm run dev
```
3. Build for production:
```bash
npm run build
```
4. Preview the production build:
```bash
npm run preview
```

Deploying to GitHub Pages
- This repo uses a GitHub Actions workflow that builds `dist/` and deploys Pages. If you see a blank page after deployment, make sure:
	- `vite.config.ts` has `base: '/Mood-Brew/'` (or your repo name), and
	- GitHub Pages is configured to use the GitHub Actions deployment (Settings → Pages).

Project layout (important files)
- `src/main.tsx` — app entry
- `src/App.tsx` — main app shell
- `src/components/` — UI components
- `src/utils/recommendationEngine.ts` — local recommendation logic
- `vite.config.ts` — Vite config (check `base` when deploying to Pages)
- `.github/workflows/deploy-pages.yml` — build & deploy workflow

Troubleshooting
- Blank site after Pages deploy: often caused by Pages serving the repo's root `index.html` (dev entry). Solution: ensure Actions deploys the `dist/` build artifact and Pages is set to use Actions; or deploy to a `gh-pages` branch.

Contributing
- Small fixes, UI polish, and improved drink data are welcome. Open a PR with a short description.

License
- MIT

Enjoy — every mood deserves the perfect brew ☕
