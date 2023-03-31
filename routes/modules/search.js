const express = require('express')
const router = express.Router()
const restaurantList = require('../../restaurant.json').results

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})

module.exports = router