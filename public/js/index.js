const favCityPrefix = "fav-city-"
let cities = []

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true
  })

  function success({ coords }) {
    reqAPI(undefined, coords, undefined)
  }

  function error({ message }) {
    console.warn(message)
  }

}

const reqAPI = (name, coords, id) => {
  let url = 'http://localhost:3000/weather/'
  if (name) {
    url += `city?q=${name}`
  }
  else {
    url += `coordinates?lat=${coords.latitude}&lon=${coords.longitude}`
  }

  fetch(url, {
    "method": "GET",
    "headers": {
      // "x-rapidapi-key": "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1",
      // "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
    },
  })
    .then(res => { return res.text() })
    .then(body => {
      console.log(body)
      updateHtmlData(JSON.parse(body), id)
    })
    .catch(err => {
      console.error(err);
    });
}

const updateHtmlData = (data, id = "current") => {
  let cityCard = document.getElementById(id);
  cityCard.querySelector('.city-name').innerHTML = data.name
  cityCard.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp - 273)}°C`
  cityCard.querySelector('.weather-badge').src = `/img/${data.weather[0].icon.slice(0, 2)}d.png`
  cityCard.querySelector('.wind').innerHTML = `${data.wind.speed} m/s, ${degToCompass(data.wind.deg)}`
  cityCard.querySelector('.cloud').innerHTML = numToStringCloud(data.clouds.all)
  cityCard.querySelector('.pressure').innerHTML = `${data.main.pressure} hpa`
  cityCard.querySelector('.humidity').innerHTML = `${data.main.humidity} %`
  cityCard.querySelector('.coord').innerHTML = `[${data.coord.lat}, ${data.coord.lon}]`
  cityCard.querySelectorAll('.text-hidden').forEach(el => el.classList.remove("text-hidden"))
  cityCard.querySelectorAll('.skeleton').forEach(el => el.classList.remove("skeleton"))
  cityCard.querySelectorAll('.grey').forEach(el => el.classList.remove("grey"))
}

function degToCompass(deg) {
  var val = Math.floor((deg / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

const numToStringCloud = (num) => {
  arr = ['Ясно', 'Рассеянные облака', 'Рассеянные облака', 'Рассеянные облака', 'Отдельные облака', 'Отдельные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Сплошные облака']
  return arr[Math.round(num / 10)]
}

const delFavoriteCity = (id) => {
  let el = document.getElementById(favCityPrefix + id)
  localStorage.removeItem(id);
  el.remove()
}

const addFavoriteCity = () => {
  let cityName = addCityForm.cityName.value
  let сityId = (cities.find(item => (item.name == cityName)).id)
  addCityForm.cityName.value = ""

  if (localStorage.getItem(сityId)) return

  localStorage.setItem(сityId, cityName)
  createFavoriteCityCard(сityId)
  reqAPI(cityName, undefined, (favCityPrefix + сityId))
}

const createFavoriteCityCard = (countCityCard) => {

  let parent = document.querySelector('.favorites')

  let cityCard = `<div class="weather-city card" id="${favCityPrefix + countCityCard}">
  <div class="city-header">
    <h4 class="city-name grey">City</h4>
    <span class="temperature_small temperature grey">5°C</span>
    <img
      class="weather-badge"
      src="/img/thermometer.svg"
      alt=""
    />
    <button class="button button_circle" onclick="delFavoriteCity(${countCityCard})">
      <img src="/img/remove.svg" alt="x" />
    </button>
  </div>
  <ul class="city-info" class="city-info">
  <li class="city-info__item skeleton">
  <span class="text-hidden">Ветер</span>
  <span class="city-info__value wind text-hidden"></span>
</li>
<li class="city-info__item skeleton">
  <span class="text-hidden">Облачность</span>
  <span class="city-info__value cloud text-hidden"></span>
</li>
<li class="city-info__item skeleton">
  <span class="text-hidden">Давление</span>
  <span class="city-info__value pressure text-hidden"></span>
</li>
<li class="city-info__item skeleton">
  <span class="text-hidden">Влажность</span>
  <span class="city-info__value humidity text-hidden"></span>
</li>
<li class="city-info__item skeleton">
  <span class="text-hidden">Координаты</span>
  <span class="city-info__value coord text-hidden"></span>
</li>
  </ul>
</div>`

  parent.insertAdjacentHTML("beforeEnd", cityCard)
}


document.addEventListener("DOMContentLoaded", () => {
  let keys = Object.keys(localStorage)

  keys.forEach(cityId => {
    createFavoriteCityCard(cityId);
    reqAPI(localStorage.getItem(cityId), undefined, (favCityPrefix + cityId))
  })

  fetch("/json/cities.json", {
    "method": "GET"
  })
    .then(res => { return res.text() })
    .then(body => {
      cities = JSON.parse(body)
      let parent = document.getElementById("cities-list")
      cities.forEach((cityName) => {
        parent.insertAdjacentHTML("beforeEnd", `<option value="${cityName.name}"/>`)

      })
    })
    .catch(err => {
      console.error(err);
    });

});
