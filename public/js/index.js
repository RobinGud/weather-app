const favCityPrefix = "fav-city-"
let cities = []

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true
  })

  function success({ coords }) {
    reqAPI(undefined, coords)
  }

  function error({ message }) {
    console.warn(message)
  }

}

const reqAPI = (name, coords) => {
  let currentPlace = false
  let url = `${window.location.href}weather/`
  if (name) {
    url += `city?q=${name}`
  }
  else {
    url += `coordinates?lat=${coords.latitude}&lon=${coords.longitude}`
    currentPlace = true

  }

  fetch(url, {
    "method": "GET",
    "headers": {
    },
  })
    .then(res => { return res.text() })
    .then(body => {
      updateHtmlData(JSON.parse(body), currentPlace)
    })
    .catch(err => {
      console.error(err);
    });
}

const updateHtmlData = (data, сurrentPlace) => {
  let cityCard= document.querySelector(сurrentPlace ? "#current" : ".temp");
  cityCard.querySelector('.city-name').innerHTML = data.name
  cityCard.querySelector('.temperature').innerHTML = data.temp
  cityCard.querySelector('.weather-badge').src = data.img
  cityCard.querySelector('.wind').innerHTML = data.wind
  cityCard.querySelector('.cloud').innerHTML = data.cloud
  cityCard.querySelector('.pressure').innerHTML = data.pressure
  cityCard.querySelector('.humidity').innerHTML = data.humidity
  cityCard.querySelector('.coord').innerHTML = data.coord
  cityCard.querySelectorAll('.text-hidden').forEach(el => el.classList.remove("text-hidden"))
  cityCard.querySelectorAll('.skeleton').forEach(el => el.classList.remove("skeleton"))
  cityCard.querySelectorAll('.grey').forEach(el => el.classList.remove("grey"))

  if (!сurrentPlace) {
  cityCard.id = favCityPrefix + data.id
  cityCard.classList.remove("temp")
  cityCard.querySelector(".button_del").setAttribute("onclick", `delFavoriteCity("${data.id}")`);
  }
}

const delFavoriteCity = (id) => {
  let el = document.getElementById(favCityPrefix + id)
  fetch(`${window.location.href}favourites?id=${id}`, {
    "method": "DELETE",
  }).then(() => {
    el.remove()
  })
}

const addFavoriteCity = () => {
  let cityName = addCityForm.cityName.value
  addCityForm.cityName.value = ""

  createFavoriteCityCard()

  fetch(`${window.location.href}favourites?name=${cityName}`, {
    "method": "POST",
  })
  .then((res) => { 
    return res.text() 
  })
  .then(() => {
    reqAPI(cityName, undefined)
  })


}



const createFavoriteCityCard = () => {

  let parent = document.querySelector('.favorites')

  let cityCard = `<div class="weather-city card temp">
  <div class="city-header">
    <h4 class="city-name grey">City</h4>
    <span class="temperature_small temperature grey">5°C</span>
    <img
      class="weather-badge"
      src="/img/thermometer.svg"
      alt=""
    />
    <button class="button button_circle button_del">
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

  getCurrentPosition()

  fetch(`${window.location.href}favourites`, {
    "method": "GET",
  })
  .then((res) => {
    return res.text() 
  })
  .then((keys) => {
  JSON.parse(keys).forEach(city => {
    createFavoriteCityCard(city.id);
    reqAPI(city.name, undefined, (favCityPrefix + city.id))
  })
  })
});
