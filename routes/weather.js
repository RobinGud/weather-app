const express = require('express')
const router = express.Router()
const WeatherController = require('../controllers/weather')

router.get('/city', WeatherController.getWeatherByName)

router.get('/coordinates', WeatherController.getWeatherByCoord)

module.exports = router