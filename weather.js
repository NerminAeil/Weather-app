const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const locationBtn = document.querySelector("#MyLocation");
const clearBtn = document.querySelector(".clearBtn");
const sun_card = document.querySelector(".sun_card");

locationBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    displayError("Geolocation is not supported by your browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      try {
        const weatherCurrentData = await getWeatherByLocation(
          latitude,
          longitude,
        );
        displayWeatherInfo(weatherCurrentData);
      } catch (error) {
        displayError(error.message);
      }
    },
    () => {
      displayError("could not get your location.");
    },
  );
});
async function getWeatherByLocation(latitude, longitude) {
  const apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const response1 = await fetch(apiUrl1);
  if (!response1.ok) {
    throw new Error("Could  not fetch weather data");
  }
  return await response1.json();
}
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      const WeatherData = await getWeatherData(city);
      displayWeatherInfo(WeatherData);
    } catch (error) {
      displayError( "City not found");
    }
  } else {
    displayError("please enter a city");
  }
});
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const apiMessage = errorData.message || "Could not fetch weather data";
    console.error("API Error:", errorData);
    throw new Error(apiMessage);
  }
  return await response.json();
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity, feels_like },
    wind: { speed },
    weather: [{ description, id }],
    sys,
    timezone,
  } = data;

  card.textContent = "";
  sun_card.textContent = "";
  clearBtn.textContent = "";
  card.style.display = "flex";
  sun_card.style.display = "flex";
  clearBtn.style.display = "block";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const windDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");
  const TemperatureUnit = document.createElement("span");
  const celsius = document.createElement("button");
  const fahrenheit = document.createElement("button");
  const UniBtn = document.createElement("div");
  const feelsLike = document.createElement("p");
  const sunrise = new Date((sys.sunrise + timezone) * 1000);
  const sunset = new Date((sys.sunset + timezone) * 1000);
  const sunriseDisplay = document.createElement("p");
  const sunsetDisplay = document.createElement("p");
  const feelsLikeTemp = ((feels_like - 273.15) * (9 / 5) + 32).toFixed(1);

  clearBtn.textContent = "Clear";
  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");
  card.appendChild(cityDisplay);

  tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  tempDisplay.classList.add("tempDisplay");
  card.appendChild(tempDisplay);

  feelsLike.textContent = `Feels Like ${feelsLikeTemp}°F`;
  feelsLike.classList.add("feels_like");
  card.appendChild(feelsLike);

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");
  card.appendChild(humidityDisplay);

  windDisplay.textContent = `Wind: ${(speed * 3.6).toFixed(1)} Km/h`;
  windDisplay.classList.add("windDisplay");
  card.appendChild(windDisplay);

  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");
  card.appendChild(descDisplay);

  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weatherEmoji");
  card.appendChild(weatherEmoji);

  TemperatureUnit.textContent = "Temperature Unit";
  TemperatureUnit.classList.add("TemperatureUnit");
  celsius.textContent = "°C";
  celsius.classList.add("celsius");
  fahrenheit.textContent = "°F";
  fahrenheit.classList.add("fahrenheit");

  card.appendChild(TemperatureUnit);
  UniBtn.classList.add("UniBtn");
  UniBtn.appendChild(celsius);
  UniBtn.appendChild(fahrenheit);
  card.appendChild(UniBtn);

  fahrenheit.addEventListener("click", () => {
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
    feelsLike.textContent = `Feels Like ${((feels_like - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  });

  celsius.addEventListener("click", () => {
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    feelsLike.textContent = `Feels Like ${(feels_like - 273.15).toFixed(1)}°C`;
  });

  sunriseDisplay.textContent = `🌅 Sunrise: ${sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC" })}`;
  sunsetDisplay.textContent = `🌇 Sunset: ${sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC" })}`;
  sunriseDisplay.classList.add("sunrise");
  sunsetDisplay.classList.add("sunset");
  sun_card.appendChild(sunriseDisplay);
  sun_card.appendChild(sunsetDisplay);

  clearBtn.addEventListener("click", () => {
    card.style.display = "none";
    clearBtn.style.display = "none";
    sun_card.style.display = "none";
  });

  sunriseDisplay.addEventListener("mouseover", function () {
    sunriseDisplay.style.transform = "scale(1.1)";
  });
  sunriseDisplay.addEventListener("mouseout", function () {
    sunriseDisplay.style.transform = "scale(1)";
  });
  sunsetDisplay.addEventListener("mouseover", function () {
    sunsetDisplay.style.transform = "scale(1.1)";
  });
  sunsetDisplay.addEventListener("mouseout", function () {
    sunsetDisplay.style.transform = "scale(1)";
  });
}
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      card.style.background =
        "linear-gradient(180deg,hsl(276, 56%, 33%),hsl(40,100%,75%))";
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      card.style.background =
        "linear-gradient(180deg,hsl(210,100%,75%),hsl(40, 38%, 94%))";
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      card.style.background =
        "linear-gradient(180deg,hsl(210,100%,75%),hsl(40, 38%, 94%))";
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      card.style.background =
        "linear-gradient(180deg,hsl(210,100%,75%),hsl(207, 72%, 62%))";
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      card.style.background =
        "linear-gradient(180deg,hsl(153, 36%, 48%),hsl(175, 62%, 79%))";
      return "🍃";
    case weatherId == 800:
      card.style.background =
        "linear-gradient(180deg,hsl(210,100%,75%),hsl(40,100%,75%))";
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      card.style.background =
        "linear-gradient(180deg,hsl(213, 100%, 95%),hsl(186, 79%, 91%))";
      return "☁️";
    default:
      return "❓";
  }
}
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  if (sun_card) {
    sun_card.textContent = "";
    sun_card.style.display = "none";
  }
  clearBtn.style.display = "none";
  card.appendChild(errorDisplay);
}
window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    document.body.style.backgroundColor = "hsl(0, 3%, 15%)";
    locationBtn.style.color = "hsl(0,0%,95%)";
    cityInput.style.color = "hsl(0,0%,95%)";
  } else {
    document.body.style.backgroundColor = "hsl(0,0%,95%)";
    locationBtn.style.color = "hsl(0, 3%, 15%)";
    cityInput.style.color = "hsl(0, 3%, 15%)";
  }
});
