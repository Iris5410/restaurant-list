const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => {
  console.log('mongodb connceted!')
  for (let i = 0; i < restaurantList.length; i++) {
    Restaurant.create({ 
      name: `${restaurantList[i].name}`, 
      category: `${restaurantList[i].category}`, 
      location: `${restaurantList[i].location}`,
      phone: `${restaurantList[i].phone}`,
      description: `${restaurantList[i].description}`,
      image: `${restaurantList[i].image}`
    })
  }
  console.log('done')
})  