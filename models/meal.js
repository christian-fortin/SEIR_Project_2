const mongoose = require('../db/connection')

const mealSchema = new mongoose.Schema({
    dish: {type: String, required: true},
    ingredients: {type: String, required: true},
    recepie: { type: String, required: true},
    image: {type: String, required: true},
    })

const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal