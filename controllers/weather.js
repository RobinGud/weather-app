const weatherReq = require('../utils/weatherRequest')
const WeatherCityCollection = require("../models/WeatherCityCollection")

exports.getWeatherByName = async (req, res, next) => {
    let name = req.query.q
    if (name) {
        let weatherCache = WeatherCityCollection.getWeatherByName(name)
        console.log(weatherCache)
        if(weatherCache) {
            console.log("🚀 ~ file: weather.js ~ line 9 ~ exports.getWeatherByName= ~ weatherCache", weatherCache)
            res.send(weatherCache)
        } 
        else {
        await weatherReq.getWeatherByCityName(name)
        .then( cityData => {
        console.log("🚀 ~ file: weather.js ~ line 15 ~ exports.getWeatherByName= ~ cityData", cityData)
            WeatherCityCollection.addWeather(cityData)
            res.send(cityData)
        })
        .catch( () =>
        res.status(520).send({"msg": "Unknown error"})
        )
    }
    }
}

exports.getWeatherByCoord = (req, res, next) => {
    let query = req.query
    if (query) {
        weatherReq.getWeatherByGeoCoords(query.lat, query.lon)
        .then( cityData => {
            res.send(cityData)
        })
        // .catch(
        //     res.status(520).send({"msg": "Unknown error"})
        // )
    }
    else {
        res.status(400).send({"msg": "Must be provided lat and lon"})
    }
}