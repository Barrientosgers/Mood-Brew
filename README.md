# Mood Brew

Mood Brew is an AI-inspired coffee and tea recommendation app that suggests the perfect drink based on your mood, energy level, weather vibe, sweetness preference, caffeine preference, flavor mood, and drink temperature. The app starts with a local recommendation engine so it works completely offline, while keeping the code structure ready for a future OpenAI integration.

## Features

- Mood-based drink recommendations
- Coffee and tea suggestions with beginner-friendly metadata
- Favorites system powered by localStorage
- Beautiful responsive UI with a cozy café aesthetic
- Clean component architecture for learning and scaling
- Future AI integration support through a separate recommendation engine

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- LocalStorage

## Installation

```bash
npm install
npm run dev
```

## Folder Structure

- `components/` - Reusable UI pieces such as the mood form, recommendation card, and favorites list.
- `data/` - Drink metadata used by the local recommendation engine.
- `utils/` - Recommendation logic that scores drinks and builds the final suggestion.
- `types/` - Shared TypeScript types and interfaces for the app. In this project, the shared types live in `src/types.ts`.

## Future Improvements

- OpenAI API integration
- User accounts
- Daily mood tracking
- Weather-based recommendations
- Spotify mood integration
- Nearby coffee shop suggestions
- AI-generated custom drinks

## Learning Goals

This project is a good way to practice:

- React component architecture
- TypeScript
- State management
- Local storage
- Recommendation systems
- UI/UX thinking
- Beginner AI integration concepts

## Screenshots

Add future screenshots here.

![Mood Brew home screen placeholder](docs/screenshots/home.png)
![Mood Brew recommendation placeholder](docs/screenshots/recommendation.png)
![Mood Brew favorites placeholder](docs/screenshots/favorites.png)

## License

This project is licensed under the MIT License.

## Closing Note

Every mood deserves the perfect brew ☕
