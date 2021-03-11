let obj = {
  "coord":
  {
      "lon":-0.1257,
      "lat":51.5085
  },
  "weather":
  [
      {
          "id":804,
          "main":"Clouds",
          "description":"overcast clouds",
          "icon":"04n"
      }
  ],
  "base":"stations",
  "main":
  {
      "temp":282.09,
      "feelslike":276.85,
      "tempmin":280.93,
      "temp_max":283.15,
      "pressure":1018,
      "humidity":53
  },
  "visibility":10000,
  "wind":
  {
      "speed":4.63,
      "deg":230
  },
  "clouds":
  {
      "all":100
  },
  "dt":1615318418,
  "sys":
  {
      "type":1,
      "id":1414,
      "country":"GB",
      "sunrise":1615271283,
      "sunset":1615312453
  },
  "timezone":0,
  "id":2643743,
  "name":"London",
  "cod":200
}

const getCurrentPosition = () => {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     var latitude = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //     alert(latitude + " " + longitude);
  //   });
  // } else {
  //   alert("Geolocation API не поддерживается в вашем браузере");
  // }

  navigator.geolocation.getCurrentPosition(success, error, {
    // высокая точность
    enableHighAccuracy: true
  })
  
  function success({ coords }) {
    // получаем широту и долготу
    const { latitude, longitude } = coords
    //const position = [latitude, longitude]
    //console.log(position) // [широта, долгота]


    // Rapid API
    // const data = null;

    // const xhr = new XMLHttpRequest();
    // xhr.withCredentials = false;
    
    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === this.DONE) {
    //     console.log(this.responseText);
    //   }
    // });
    
    // xhr.open("GET", `https://community-open-weather-map.p.rapidapi.com/weather?lat=${latitude}&lon=${longitude}&callback=updateHtmlData`);
    // xhr.setRequestHeader("x-rapidapi-key", "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1");
    // xhr.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    
    // xhr.send(data);

    // updateHtmlData();
    reqAPI(latitude, longitude)
  }

  const reqAPI = (latitude, longitude) => {
    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lat=${latitude}&lon=${longitude}`, {
      //&callback=updateHtmlData
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      },
      //"mode": "cors"
        })
        .then(resp => {return resp.text()})
    // .then(resBody => {console.log(resBody)})
        .then(resBody => {
          // console.log(resBody);
          // eval(resBody);
          updateHtmlData(resBody)
        })
        .catch(err => {
          console.error(err);
        });
  }

  
  function error({ message }) {
    console.log(message) // при отказе в доступе получаем PositionError: User denied Geolocation
  }
  
}

const updateHtmlData = (data = obj, id = "current") => {
// console.log("🚀 ~ file: updateHtmlData.js ~ line 135 ~ updateHtmlData ~ id", id)
// console.log("🚀 ~ file: updateHtmlData.js ~ line 135 ~ updateHtmlData ~ data", data)
  // console.log(data)
  // console.log(data.name)

  let city = document.getElementById(id);
  // console.log("🚀 ~ file: updateHtmlData.js ~ line 126 ~ updateHtmlData ~ city", city)
  city.querySelector('.city-name').innerHTML = data.name
  // console.log("🚀 ~ file: updateHtmlData.js ~ line 145 ~ updateHtmlData ~ city.querySelector('.city-name').innerHTML = data.name", city.querySelector('.city-name').innerHTML = data.name)
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
  // console.log("🚀 ~ file: updateHtmlData.js ~ line 149 ~ delFavoriteCity ~ el", el)
  el.remove()
}


// let form = document.querySelector("form");
// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   // console.log("Saving value", form.elements[0].value);
// });

const addFavoriteCity = () => {
// console.log("🚀 ~ file: test.js ~ line 168 ~ addFavoriteCity ~ event", form.zxc.value)
  // var form = document.querySelector("form");
  // form.addEventListener("submit", function(event) {
    // console.log("Saving value", form.elements.value.value);
    // name.preventDefault();


  // send req with form.zxc.value

  // console.log("🚀 ~ file: test.js ~ line 161 ~ addFavoriteCity ~ e.document.forms();", document.forms.city.value)
// reques to API
  let data = obj
  let parent = document.querySelector('.favorites')

  let countCityCard = document.querySelectorAll(".weather-city").length
  while (document.getElementById(`fav-city-${countCityCard}`)) {
    countCityCard++
    // console.log("🚀 ~ file: updateHtmlData.js ~ line 160 ~ addFavoriteCity ~ document.getElementById(`fav-city-${countCityCard}`)", document.getElementById(`fav-city-${countCityCard}`))
  }

  // console.log("🚀 ~ file: updateHtmlData.js ~ line 159 ~ addFavoriteCity ~ countCityCard", countCityCard)

  // console.log("🚀 ~ file: updateHtmlData.js ~ line 157 ~ addFavoriteCity ~ parent", parent)
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
// console.log("🚀 ~ file: updateHtmlData.js ~ line 159 ~ addFavoriteCity ~ cityCard", cityCard)



parent.insertAdjacentHTML("beforeEnd", cityCard)
updateHtmlData(undefined, `fav-city-${countCityCard}`);
}