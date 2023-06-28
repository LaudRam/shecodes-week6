function currentTime() {
  let time = document.querySelector(".current-time");
  time.innerHTML = timeNow;
}
let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
if (minute <= 9) {
  minute = `0${minute}`;
}

let day = now.getDay();

let days = [
  "Sun",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[day];
let timeNow = `${hour}:${minute} ${day}`;
currentTime();

function currentTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = temperature;
}

function currentConditions(response) {
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;

  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function search(city) {
  let apiKey = "689cf53aaaf224213ca60529e012e6c1";
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(URL).then(currentTemp);
  axios.get(URL).then(currentConditions);
}
search(document.querySelector("h1").innerHTML);

function searchBar(event) {
  event.preventDefault();
  let city = document.querySelector(".search-text");
  search(city.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchBar);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "689cf53aaaf224213ca60529e012e6c1";
  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;

  axios.get(URL).then(currentTemp);
  axios.get(URL).then(currentConditions);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);
