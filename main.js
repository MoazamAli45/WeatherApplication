const apiKey = "b3ed6a81bb948a9e4b746554d7655b4e";
const form = document.getElementById("form");
const search = document.getElementById("search");
const weather = document.querySelector(".row-2");

const getWeather = async function () {
  try {
    // Before API call Show
    weather.innerHTML = `<div class="head">
    <h2 class="search__temp">Loading ....</h2>
    </div>`;
    const city = search.value;
    // console.log(city);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(API);
    console.log(res);
    if (!res.ok) {
      throw Error("City Not Found");
    }
    const data = await res.json();
    console.log(data);

    return showWeather(data);
  } catch (error) {
    weather.innerHTML = "";
    const err = ` <div class="head">
       <h2 class="search__temp">${error.message}</h2>
       </div>`;
    weather.insertAdjacentHTML("afterbegin", err);
  }
};
const showWeather = function (data) {
  try {
    const IMG_URL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    console.log(IMG_URL);
    const html = ` <img
  src="${IMG_URL}"
  alt="weather image"
  class="search__img"
/>
<div class="head">
  <h2 class="search__temp">${+data.main.temp.toFixed(0)}℃</h2>
  <h2 class="search__weather">${data.weather[0].description}</h2>
</div>`;
    weather.innerHTML = "";
    weather.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getWeather();
});
