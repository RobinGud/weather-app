const firestore = require('../utils/db')
const CitiesCollection = require('../models/CitiesCollection')

exports.getAllFavouritesCities = async (req, res, next) => {
    try {
        const cities = await firestore.collection('cities')
        const data = await cities.get()
        const citiesArray = []
        data.forEach(doc => {
            citiesArray.push({ id: doc.id, name: doc.data().name })
        })
        res.send(citiesArray)
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
    }
}

exports.postAddFavourites = async (req, res, next) => {
    let name = req.query.name
    let city = CitiesCollection.findCityByName(name)
    if (city) {
        try {
            await firestore.collection('cities').doc(city.id.toString()).set({ name: city.name })
            res.send('Record')
        } catch (error) {
            console.error(error)
            res.status(400).send(error.message)
        }
    }
    else {
        res.status(500).send("City is undefined")
    }
}

exports.deleteFavouritesCity = async (req, res, next) => {
    let id = req.query.id
    if (id) {
        try {
            await firestore.collection('cities').doc(id.toString()).delete()
            res.send("Success delete")
        } catch (error) {
            console.error(error)
            res.status(400).send(error.message)
        }
    }
    else {
        res.status(500).send("City is undefined")
    }
}

exports.getCity = async (req, res, next) => {
    let name = req.query.q
    try {
        const city = CitiesCollection.findCityByName(name)
        if (city) {
            res.send(city)
        } else {
            res.status(500).send("City is undefined")
        }
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
    }
}


