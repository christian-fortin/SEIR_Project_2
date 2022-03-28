const mongoose = require('../db/connection')

// let Image = require('./images')
// Schema for meals post
const mealSchema = new mongoose.Schema({
    dish: {type: String, required: true},
    ingredients: {type: String, required: true},
    recepie: {type: String, required: true},
    image: {
        data: Buffer,
        contentType: String
      },
    })

const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal