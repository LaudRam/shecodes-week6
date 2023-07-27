function currentTime() {
  let time = document.querySelector(".current-time");
  time.innerHTML = timeNow;
}
let now = new Date();
let hour = now.getHours();
if (hour <= 9) {
  hour = `0${hour}`;
}
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
  document.querySelector(".current-icon").src = icon;
}

function search(city) {
  let apiKey = "0f09bat43dccc526f81281do161a0bf2";
  let URL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(URL).then(currentTemp);
  axios.get(URL).then(currentConditions);
  getForecast(city);
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
  navigator.geolocation.getCurrentPosition(forecastGPS);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let day = formatDate(forecastDay.time);
      let maxTemperature = Math.round(forecastDay.temperature.maximum);
      let minTemperature = Math.round(forecastDay.temperature.minimum);
      let iconForecast = forecastDay.condition.icon_url;

      forecastHTML += `
        <div class="col-md forecast">
          <div class="day">${day}</div>
          <div class="icon-forecast">
            <img
              src="${iconForecast}"
              alt="weather_icon"
              id="forecast-icon"
            />
          </div>
          <strong> ${maxTemperature}° <span class="low-temp">${minTemperature}°</span> </strong>
        </div>
  `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(city) {
  let apiKey = "0f09bat43dccc526f81281do161a0bf2";
  let URL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(URL).then(displayForecast);
}

function forecastGPS(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0f09bat43dccc526f81281do161a0bf2";
  let URL = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(URL).then(displayForecast);
}
