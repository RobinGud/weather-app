const fs = require('fs')
const path = require('path')

class CitiesCollection {
    #cities = []

    constructor() {
    this.#cities = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cities.json')))
    }

    findCityByName(name) {
        return this.#cities.find(element => element.name == name)
    }

    findCityById(id) {
        return this.#cities.find(element => element.id == id)
    }

    get Cities() {
        return this.#cities
    }
} 


module.exports = new CitiesCollection()