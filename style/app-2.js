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
  console.log(response.data.name);
  let temperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = temperature;
}

function currentConditions(response) {
  console.log(response);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  console.log(response.data.weather[0].main);
  let rain = document.querySelector("#rain");
  rain.innerHTML = null;

  windSpeed = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;

  humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector(".search-text");
  let h1 = document.querySelector("h1");

  if (city.value) {
    h1.innerHTML = city.value;
  } /*else {
      h1.innerHTML = "Pretoria"
      alert("Please enter a city")
    }*/

  let apiKey = "689cf53aaaf224213ca60529e012e6c1";
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&&units=metric`;
  axios.get(URL).then(currentTemp);
  axios.get(URL).then(currentConditions);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//console.log(document.querySelector("h1").innerHTML);

/*function currentTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    let h1 = document.querySelector("h1");
    h1.innerHTML = `The outside temperature is ${temperature}°C`;
  }
  
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    let apiKey = "689cf53aaaf224213ca60529e012e6c1";
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
    axios.get(URL).then(currentConditions);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", showPosition);*/

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let apiKey = "689cf53aaaf224213ca60529e012e6c1";
  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(URL).then(currentConditions);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);
