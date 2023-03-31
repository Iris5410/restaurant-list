const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurants')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  const {name, category, rating, location, phone, description, image} = req.body

  return Restaurant.create({ name, category, rating, location, phone, description, image })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const editRestaurant = req.body

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = editRestaurant.name
      restaurant.category = editRestaurant.category
      restaurant.rating = editRestaurant.rating
      restaurant.location = editRestaurant.location
      restaurant.phone = editRestaurant.phone
      restaurant.description = editRestaurant.description
      restaurant.image = editRestaurant.image
      return restaurant.save()
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch((error) => console.log(error))
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router