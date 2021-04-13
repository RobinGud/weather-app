const fs = require('fs')
const path = require('path')

class WeatherCityCollection {
    #WeatherCityCollection = []

    // degToCompass(deg) {
    //     var val = Math.floor((deg / 22.5) + 0.5);
    //     var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    //     return arr[(val % 16)];
    //   }

    // numToStringCloud(num) {
    //     arr = ['Ясно', 'Рассеянные облака', 'Рассеянные облака', 'Рассеянные облака', 'Отдельные облака', 'Отдельные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Разорванные облака', 'Сплошные облака']
    //     return arr[Math.round(num / 10)]
    //   }

    // addWeather(data) {
    //     let obj = {
    //         "id": data.id,
    //       "name" : data.name,
    //       "temp" :  `${Math.round(data.main.temp - 273)}°C`,
    //       "img" :  `/img/${data.weather[0].icon.slice(0, 2)}d.png`,
    //       "wind" : `${data.wind.speed} m/s, ${this.degToCompass(data.wind.deg)}`,
    //       "cloud" : this.numToStringCloud(data.clouds.all),
    //       "pressure" : `${data.main.pressure} hpa`,
    //       "humidity" : `${data.main.humidity} %`,
    //       "coord" : `[${data.coord.lat}, ${data.coord.lon}]`,
    //       "time": new Date().getTime()
    //       }

    //       this.#WeatherCityCollection.push(obj)
    // }

    addWeather(obj) {
        this.#WeatherCityCollection.push(obj)
    }

    getWeatherById(id) {
        return this.checkObsolescence(this.#WeatherCityCollection.findIndex(element => element.id == id))
    }

    getWeatherByName(name) {
    console.log("🚀 ~ file: WeatherCityCollection.js ~ line 44 ~ WeatherCityCollection ~ getWeatherByName ~ name", name)
        
        return this.checkObsolescence(this.#WeatherCityCollection.findIndex(element => element.name == name))
    }

    checkObsolescence(index) {
        console.log(index, this.#WeatherCityCollection)
        const CACHE_TIME = 2 * 60 * 60 * 1000 // 2h
        if(index == -1) return undefined
        const obj = this.#WeatherCityCollection[index]
        if(new Date().getTime() - obj.time > CACHE_TIME) {
            this.#WeatherCityCollection.splice(index, index)
            return undefined
        }
        return obj
    }

} 

module.exports =  new WeatherCityCollection()