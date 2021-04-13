const weatherReq = require('../utils/weatherRequest')
const WeatherCityCollection = require("../models/WeatherCityCollection")

exports.getWeatherByName = async (req, res, next) => {
    let name = req.query.q
    if (name) {
        let weatherCache = WeatherCityCollection.getWeatherByName(name)
        if(weatherCache) {
            res.send(weatherCache)
        } 
        else {
        await weatherReq.getWeatherByCityName(name)
        .then( cityData => {
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