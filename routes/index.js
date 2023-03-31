const express = require('express')
const router = express.Router()
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const home = require('./modules/home')

router.use('/', home)
router.use('/search', search)
router.use('/restaurants', restaurants)

module.exports = router