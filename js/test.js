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
    
    // xhr.open("GET", `https://community-open-weather-map.p.rapidapi.com/weather?lat=${latitude}&lon=${longitude}&callback=test`);
    // xhr.setRequestHeader("x-rapidapi-key", "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1");
    // xhr.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    
    // xhr.send(data);
    reqAPI(latitude, longitude)
  }

  const reqAPI = (latitude, longitude) => {
    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lat=${latitude}&lon=${longitude}&callback=test`, {
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
          eval(resBody);
        })
        .catch(err => {
          console.error(err);
        });
  }

  
  function error({ message }) {
    console.log(message) // при отказе в доступе получаем PositionError: User denied Geolocation
  }
  
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

const test = (data = obj) => {
  console.log(data)
  console.log(data.name)

  let city = document.getElementById('current');
  console.log("🚀 ~ file: test.js ~ line 126 ~ test ~ city", city)
  city.querySelector('.city-name').innerHTML = data.name
  city.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp - 273)}°C`
  city.querySelector('.wind').innerHTML = `${data.wind.speed} m/s, ${degToCompass(data.wind.deg)}`
  city.querySelector('.cloud').innerHTML = numToStringCloud(data.clouds.all)
  city.querySelector('.pressure').innerHTML = `${data.main.pressure} hpa`
  city.querySelector('.humidity').innerHTML = `${data.main.humidity} %`
  city.querySelector('.coord').innerHTML = `[${data.coord.lat}, ${data.coord.lon}]` 
}