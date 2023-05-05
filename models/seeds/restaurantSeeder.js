const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurants')
const User = require('../users')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

// 種子使用者
const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  collection: [0, 1, 2]
  },{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  collection: [3, 4, 5]
  }]

db.once('open', () => {
  // 新增使用者
  Promise.all(SEED_USER.map((SEED_USER) => 
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(SEED_USER.password, salt))
      .then((hash) => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))
      // 新增餐廳在使用者之下
      .then(user => {
        const restaurantSeeds = SEED_USER.collection.map(index => {
          restaurantList[index].userId = user._id
          return restaurantList[index]
        })
        return Restaurant.create(restaurantSeeds)
      })  
  ))
  .then(() => {
    console.log('done.')
    process.exit()
  })
  .catch((err) => console.log(err))
})