const express = require('express')
const router = express.Router()
const FavouritesController = require('../controllers/favourites')

router.get('/', FavouritesController.getAllFavouritesCities)

router.post('/', FavouritesController.postAddFavourites)

router.delete('/', FavouritesController.deleteFavouritesCity)

router.get('/city', FavouritesController.getCity)

module.exports = router