const express = require('express')
const router = express.Router()
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const home = require('./modules/home')

router.use('/', home)
router.use('/users', users)
router.use('/restaurants', restaurants)

module.exports = router