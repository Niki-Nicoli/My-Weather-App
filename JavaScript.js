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
  let current = document.querySelector(".date");
  let currentDate = new Date(response.data.time * 1000);
  console.log(currentDate);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Frdayi",
    "Saturday",
  ];
  let Day = days[currentDate.getDay()];
  console.log(`${Day}, ${currentDate.getHours()}:${currentDate.getMinutes()}`);
  current.innerHTML = `${Day}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  let icon = document.querySelector(".emoji");
  icon.innerHTML = `<img src= "${response.data.condition.icon_url}"/>`;
}

let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", cityName);

cityNameSearch("Bronx");
