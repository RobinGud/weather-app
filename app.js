const path = require('path')
const fs = require('fs')
// const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const weatherRoutes = require('./routes/weather')

const cities = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'json', 'cities.json')))

app.set('view engine', 'pug');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')))
// app.use(bodyParser.urlencoded({extended: false}));

app.use('/weather', weatherRoutes)

app.use('/', (req, res, next) => {
    // console.log(req)
    res.render('index', {cities: cities})
})

// app.use((req, res, next) => {
// res.status(404).sendFile(path.join(__dirname, 'views', '404'));
// })

app.listen(3000)