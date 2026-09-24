# Weather App

A simple, responsive weather application built with vanilla HTML, CSS, and JavaScript. Users can search for a city or use their current location to get real-time weather data, including temperature, humidity, wind speed, sunrise/sunset times, and a Celsius/Fahrenheit toggle.

## Features

- 🔍 Search weather by city name
- 📍 "Use My Location" button (Geolocation API)
- 🌡️ Celsius / Fahrenheit toggle
- 🌅 Sunrise & sunset times
- ☁️ Dynamic background and emoji based on current weather condition
- 📱 Fully responsive design (mobile, tablet, desktop)

## Technologies Used

- HTML5
- CSS3 (Flexbox, media queries, gradients)
- JavaScript (Fetch API, async/await, DOM manipulation)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Project Structure

```
weather-app/
├── index.html
├── weather.css
├── weather.js
├── config.js       ← NOT included in this repo (see setup below)
└── .gitignore
```

## ⚠️ API Key Setup (Required to Run)

This project uses a personal OpenWeatherMap API key, which is intentionally excluded from this repository via `.gitignore` to keep it private and prevent misuse.

To run this project locally, you need to create your own `config.js` file:

1. Sign up for a free API key at [openweathermap.org/api](https://openweathermap.org/api)
2. In the project's root folder, create a file named `config.js`
3. Add the following line, replacing `YOUR_API_KEY_HERE` with your own key:

   ```javascript
   const apiKey = "YOUR_API_KEY_HERE";
   ```

4. Make sure `config.js` is loaded **before** `weather.js` in `index.html`:

   ```html
   <script src="config.js"></script>
   <script src="weather.js"></script>
   ```

5. Open `index.html` in your browser — the app should now work.

Without this step, the app will load but weather requests will fail, since `weather.js` depends on the `apiKey` variable defined in `config.js`.

## What I Learned

While building this project, I initially had my API key written directly inside `weather.js`. After reviewing the code, I realized this meant anyone who viewed the repository on GitHub could see and misuse the key. To fix this, I:

- Moved the API key into a separate `config.js` file
- Added `config.js` to `.gitignore` so it's never pushed to GitHub
- Regenerated my API key after realizing the original one had already been exposed in an earlier commit

This taught me that security isn't a single step — `.gitignore` alone isn't enough if the file was already committed before adding it. I had to check `git status` and use `git rm --cached` to make sure the file was fully removed from version tracking, not just ignored going forward.

## Live Demo

Note: since `config.js` is excluded for security reasons, the hosted GitHub Pages version will not be able to fetch live weather data unless a key is provided through a secure method (e.g. environment injection via CI/CD). The code itself is fully functional when run locally with a valid `config.js`.

