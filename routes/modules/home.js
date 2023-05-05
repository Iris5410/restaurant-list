const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurants')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

router.get('/search', (req, res) => {
  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()

  const sort = req.query.sort
  const sortKeyword = {}

  if (sort) {
    const sortArray = sort.split('-')
    const key = sortArray[0]
    const value = sortArray[1]
    sortKeyword[key] = value
  }

  Restaurant.find({})
    .lean()
    .sort(sortKeyword)
    .then(restaurant => {
      const filterRestaurant = restaurant.filter(data => {
        return data.name.toLowerCase().includes(keywords) || data.category.includes(keyword)
      })
      
      res.render('index', { restaurants: filterRestaurant, keyword })
    })
})

module.exports = router