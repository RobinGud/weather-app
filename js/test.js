let obj = {
  "coord":
  {
    "lon": -0.1257,
    "lat": 51.5085
  },
  "weather":
    [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04n"
      }
    ],
  "base": "stations",
  "main":
  {
    "temp": 282.09,
    "feelslike": 276.85,
    "tempmin": 280.93,
    "temp_max": 283.15,
    "pressure": 1018,
    "humidity": 53
  },
  "visibility": 10000,
  "wind":
  {
    "speed": 4.63,
    "deg": 230
  },
  "clouds":
  {
    "all": 100
  },
  "dt": 1615318418,
  "sys":
  {
    "type": 1,
    "id": 1414,
    "country": "GB",
    "sunrise": 1615271283,
    "sunset": 1615312453
  },
  "timezone": 0,
  "id": 2643743,
  "name": "London",
  "cod": 200
}

let citiesObj = [
  {
    "id": 833,
    "name": "Ḩeşār-e Sefīd",
    "state": "",
    "country": "IR",
    "coord": {
      "lon": 47.159401,
      "lat": 34.330502
    }
  },
  {
    "id": 2960,
    "name": "‘Ayn Ḩalāqīm",
    "state": "",
    "country": "SY",
    "coord": {
      "lon": 36.321911,
      "lat": 34.940079
    }
  },
  {
    "id": 3245,
    "name": "Taglag",
    "state": "",
    "country": "IR",
    "coord": {
      "lon": 44.98333,
      "lat": 38.450001
    }
  }
]

const getCurrentPosition = () => {

  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true
  })

  function success({ coords }) {
    reqAPI(undefined, coords, undefined)
  }

  function error({ message }) {
    console.log(message)
  }

}

const reqAPI = (name, coords, id) => {
  let url = 'https://community-open-weather-map.p.rapidapi.com/weather?'
  if (!name) {
    url += `lat=${coords.latitude}&lon=${coords.longitude}`
  }
  else {
    url += `q=${name}`
  }

  fetch(url, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
    },
  })
    .then(resp => { return resp.text() })
    .then(resBody => {
      updateHtmlData(JSON.parse(resBody), id)
    })
    .catch(err => {
      console.error(err);
    });
}

const updateHtmlData = (data = obj, id = "current") => {
  let city = document.getElementById(id);
  city.querySelector('.city-name').innerHTML = data.name
  city.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp - 273)}°C`
  city.querySelector('.wind').innerHTML = `${data.wind.speed} m/s, ${degToCompass(data.wind.deg)}`
  city.querySelector('.cloud').innerHTML = numToStringCloud(data.clouds.all)
  city.querySelector('.pressure').innerHTML = `${data.main.pressure} hpa`
  city.querySelector('.humidity').innerHTML = `${data.main.humidity} %`
  city.querySelector('.coord').innerHTML = `[${data.coord.lat}, ${data.coord.lon}]`
}

function degToCompass(num) {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

const numToStringCloud = (num) => {
  arr = ['Ясно', 'Рассеянные облака', 'Рассеянные облака', 'Рассеянные облака', 'Отдельные облака', 'Отдельные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Сплошные облака']
  return arr[Math.round(num / 10)]
}

const delFavoriteCity = (id) => {
  let el = document.getElementById(`fav-city-${id}`)
  localStorage.removeItem(id);
  el.remove()
}

const addFavoriteCity = () => {
  let cityName = addCityForm.cityName.value
  let data = obj

  let countCityCard = document.querySelectorAll(".weather-city").length
  while (document.getElementById(`fav-city-${countCityCard}`)) {
    countCityCard++
  }

  localStorage.setItem(countCityCard, cityName)
  createFavoriteCityCard(countCityCard)
  reqAPI(cityName, undefined, `fav-city-${countCityCard}`)
}

const createFavoriteCityCard = (countCityCard) => {

  let parent = document.querySelector('.favorites')

  let cityCard = `<div class="weather-city" id="fav-city-${countCityCard}">
  <div class="city-header">
    <h4 class="city-name">Moscow</h4>
    <span class="temperature_small temperature">5°C</span>
    <img
      class="weather_badge"
      src="./img/sunny-and-cloud-s.png"
      alt=""
    />
    <button class="button button_circle" onclick="delFavoriteCity(${countCityCard})">
      <img src="./img/remove.svg" alt="x" />
    </button>
  </div>
  <ul class="city-info" class="city-info">
    <li class="city-info__item">
      Ветер<span class="city-info__value wind">
        Moderate breeze, 6.0m/s, North-northwest</span
      >
    </li>
    <li class="city-info__item">
      Облачность<span class="city-info__value cloud">Broken clouds</span>
    </li>
    <li class="city-info__item">
      Давление<span class="city-info__value pressure">1013 hpa</span>
    </li>
    <li class="city-info__item">
      Влажность<span class="city-info__value humidity">52 %</span>
    </li>
    <li class="city-info__item">
      Координаты<span class="city-info__value coord">[59.88, 30.42]</span>
    </li>
  </ul>
</div>`

  parent.insertAdjacentHTML("beforeEnd", cityCard)
}


document.addEventListener("DOMContentLoaded", () => {
  let keys = Object.keys(localStorage)

  for (let i = 0; i < keys.length; i++) {
    createFavoriteCityCard(keys[i]);
    reqAPI(localStorage.getItem(keys[i]), undefined, `fav-city-${keys[i]}`)
  }
});