const fs = require('fs')
const path = require('path')

class WeatherCityCollection {
    #WeatherCityCollection = []

    addWeather(obj) {
        this.#WeatherCityCollection.push(obj)
    }

    getWeatherById(id) {
        return this.checkObsolescence(this.#WeatherCityCollection.findIndex(element => element.id == id))
    }

    getWeatherByName(name) {    
        return this.checkObsolescence(this.#WeatherCityCollection.findIndex(element => element.name == name))
    }

    checkObsolescence(index) {
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