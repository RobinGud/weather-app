const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const weatherRoutes = require('./routes/weather')
const favouritesRoutes = require('./routes/favourites')
const CitiesCollection = require('./models/CitiesCollection')

// const cities = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'json', 'cities.json')))

app.set('view engine', 'pug');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')))

app.use('/weather', weatherRoutes)
app.use('/favourites', favouritesRoutes)

app.use('/', (req, res, next) => {
    res.render('index', {cities: CitiesCollection.Cities})
})

app.listen(process.env.PORT || 3000)