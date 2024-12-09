function cityName(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searchForm");
  cityNameSearch(cityName.value);
}

function cityNameSearch(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=5452ccec034a0afbo38d92e109tf8e74&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(cityWeather);
}

function cityWeather(response) {
  let temp = document.querySelector(".temperature");
  temp.innerHTML = response.data.temperature.current;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let Condition = document.querySelector(".condition");
  Condition.innerHTML = response.data.condition.description;
  let Humidity = document.querySelector(".humidity");
  Humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `${response.data.wind.speed}km/hr`;
  let icon = document.querySelector(".emoji");
  icon.innerHTML = `<img src= "${response.data.condition.icon_url}"/>`;
  let current = document.querySelector(".date");
  let currentDate = new Date(response.data.time * 1000);
  console.log(currentDate);
  currentDate.innerHTML = getDate(currentDate);
  getForecastData(response.data.city);
}

function getDate(currentDate) {
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Day = days[currentDate.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  console.log(`${Day}, ${hours}:${minutes}`);
  return `${Day}, ${hours}:${minutes}`;
}

function getForecastData(city) {
  let forecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=5452ccec034a0afbo38d92e109tf8e74&units=metric`;
  console.log(forecastURL);
  axios.get(forecastURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let weatherForecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      weatherForecastHTML =
        weatherForecastHTML +
        `<div class="weather-forecast-day"><div class="weekDay">${getForcastDate(
          day.time
        )}</div><div class="forecast-emoji"><img src= "${
          day.condition.icon_url
        }"/> </div><div class="forecast-temperatures"> ${Math.round(
          day.temperature.maximum
        )}&deg<span class="feel-temp ">${Math.round(
          day.temperature.minimum
        )}&deg;</span> </div></div>`;
    }
  });
  let weatherDisplay = document.querySelector("#weather-forecast");
  weatherDisplay.innerHTML = weatherForecastHTML;
}

function getForcastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", cityName);

cityNameSearch("Bronx");
displayForecast();
