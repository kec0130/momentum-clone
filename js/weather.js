const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "717b74d5df023f66af1446cebffc20ef";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weather.innerText = `${data.weather[0].main}, ${Math.round(
        data.main.temp
      )}℃`;
      city.innerText = data.name;
    });
}

function onGeoError() {
  alert("Can't find your location.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
