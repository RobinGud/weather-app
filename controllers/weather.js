const weatherReq = require('../utils/weatherRequest')

exports.getWeatherByName = (req, res, next) => {
    let query = req.query
    if (query) {
        weatherReq.getWeatherByCityName(query.q)
        .then( cityData => {
            res.send(cityData)
        })
        .catch( () =>
        res.status(520).send({"msg": "Unknown error"})
        )
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