function cityName(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searchForm");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName.value}`;
}

let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", cityName);
