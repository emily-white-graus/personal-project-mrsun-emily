## Mr. Sun

Mr. Sun shows sunrise, sunset and daylight times for your location or a searched city. it is useful for quickly planning around daylight, golden hour or sunsets conveniently with your phone.

The app is built with Expo and React native using Expo router for the tabs and screens. most of the app code is split into shared folders for design components, location, settings, notifications, and sun data. the sun data comes from Open-Meteo, with one API for sunrise/sunset forecasts and another API for city search. settings and favorites use AsyncStorage so the app can remember simple local choices.

**important tech**

- Expo SDK 56
- React native and TypeScript
- Expo router
- AsyncStorage
- Expo location
- Expo notifications and haptics
- Open-Meteo forecast API
- Open-Meteo geocoding API
- Jest, Testing library, ESLint, Prettier, and Knip

**getting started**

you need Node.js and npm installed. this project uses npm with `legacy-peer-deps=true`, which is already set in `.npmrc`.

there are no environment variables needed right now. the app uses public Open-Meteo APIs, so there is no API key to add.

```bash
npm install
npm start
```

then open the app with Expo Go, or run one of these:

```bash
npm run ios
npm run android
npm run web
```

before submitting or opening a pull request, run:

```bash
npm run lint
npm test -- --watchAll=false
npx expo-doctor
```

**potential features**

save watched sunsets

show better empty and error states for city search

let the user pick between multiple city search results
