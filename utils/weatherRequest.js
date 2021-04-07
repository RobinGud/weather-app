const fetch = require('node-fetch')

const url = 'https://community-open-weather-map.p.rapidapi.com/weather?'

const getWeatherByCityName = (city) => {
    return weatherRequest(`${url}q=${city}`)
}

const getWeatherByGeoCoords = (lat, lon) => {
    return weatherRequest(`${url}lat=${lat}&lon=${lon}`);
}

const parseRequest = (data) => {
  console.log(data.main)
  let obj = {
  "name" : data.name,
  "temp" :  `${Math.round(data.main.temp - 273)}°C`,
  "img" :  `/img/${data.weather[0].icon.slice(0, 2)}d.png`,
  "wind" : `${data.wind.speed} m/s, ${degToCompass(data.wind.deg)}`,
  "cloud" : numToStringCloud(data.clouds.all),
  "pressure" : `${data.main.pressure} hpa`,
  "humidity" : `${data.main.humidity} %`,
  "coord" : `[${data.coord.lat}, ${data.coord.lon}]`,
  }

  console.log(obj)
}

const degToCompass = (deg) => {
  var val = Math.floor((deg / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

const numToStringCloud = (num) => {
  arr = ['Ясно', 'Рассеянные облака', 'Рассеянные облака', 'Рассеянные облака', 'Отдельные облака', 'Отдельные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Сплошные облака']
  return arr[Math.round(num / 10)]
}


const weatherRequest = async (url) => {
    const res = await fetch(url, {
      "method": "GET",
      "headers": {
        // "x-rapidapi-key": "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1",
        "x-rapidapi-key": "27a229d50amshc288ac68912ac5cp1c4b53jsna5581f50c2d9",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      },
    })
      .then(res => { return res.text() })
      .then(body => {
          // console.log(JSON.parse(body), "1")
          return JSON.parse(body)
          // updateHtmlData(JSON.parse(body), id)
        })
        .catch(err => {
          console.error(err);
        });
        
        return res
  }

  module.exports = {
    getWeatherByCityName: getWeatherByCityName,
    getWeatherByGeoCoords: getWeatherByGeoCoords
  }