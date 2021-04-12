const express = require('express')
const router = express.Router()
const FavouritesController = require('../controllers/favourites')

router.get('/', FavouritesController.getAllFavouritesCities)

router.post('/', FavouritesController.postAddFavourites)

router.delete('/', FavouritesController.deleteFavouritesCity)

module.exports = router