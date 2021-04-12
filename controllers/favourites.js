const fs = require('fs')
const path = require('path')
const firestore = require('../utils/db')
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'json', 'cities.json')))


const findIdByName = (name) => {
    return cities.find(element => element.name == name)
}

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
        console.log(error)
        res.status(400).send(error.message)
    }
}

exports.postAddFavourites = async (req, res, next) => {
    let name = req.query.name
    let id = findIdByName(name).id
    console.log(id, name)
    if (id) {
        try {
            await firestore.collection('cities').doc(id.toString()).set({ name: name })
            res.send('Record')
        } catch (error) {
            console.log(error)
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
            console.log(error)
            res.status(400).send(error.message)
        }
    }
    else {
        res.status(500).send("City is undefined")
    }
}


