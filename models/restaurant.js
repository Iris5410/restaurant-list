const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  rating: {
    type: Number
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)