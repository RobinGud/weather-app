const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const weatherReq = require('../utils/weatherRequest')

router.get('/city', (req, res, next) => {
    let query = req.query
    if (query) {
        weatherReq.getWeatherByCityName(query.q)
        .then( cityData => {
            // console.log(cityData)
            res.send(cityData)
            // res.send({id:6, name: "Tom"});
        })
        .catch( () =>
        res.status(520).send({"msg": "Unknown error"})
        )
    }
})

router.get('/coordinates', (req, res, next) => {
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
})

// router.post('/city/:id', (req, res, next) => {
//     console.log(req.params)
// })

module.exports = router