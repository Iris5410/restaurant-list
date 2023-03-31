const Restaurant = require('../restaurants')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')


db.once('open', () => {
  for (let i = 0; i < restaurantList.length; i++) {
    Restaurant.create({
      name: `${restaurantList[i].name}`,
      category: `${restaurantList[i].category}`,
      location: `${restaurantList[i].location}`,
      phone: `${restaurantList[i].phone}`,
      description: `${restaurantList[i].description}`,
      image: `${restaurantList[i].image}`,
      rating: `${restaurantList[i].rating}`
    })
  }
  console.log('done')
})  