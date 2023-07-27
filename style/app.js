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
  h1.innerHTML = response.data.city;
  let celciusTemperature = response.data.temperature.current;
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = Math.round(celciusTemperature);

  function tempCelcius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temp-value");

    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperature.innerHTML = Math.round(celciusTemperature);
  }
  //let celciusTemperature = null;
  let celciusLink = document.querySelector("#celcius");
  celciusLink.addEventListener("click", tempCelcius);

  function tempFahrenheit(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temp-value");

    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperature.innerHTML = Math.round(fahrenheitTemperature);
  }
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", tempFahrenheit);
}

function currentConditions(response) {
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;

  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let icon = response.data.condition.icon_url;
  document.querySelector("img").src = icon;
}

function search(city) {
  let apiKey = "0f09bat43dccc526f81281do161a0bf2";
  let URL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(URL).then(currentTemp);
  axios.get(URL).then(currentConditions);
}
search("Bushbuckridge");

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
  let apiKey = "0f09bat43dccc526f81281do161a0bf2";
  let URL = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(URL).then(currentTemp);
  axios.get(URL).then(currentConditions);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);
