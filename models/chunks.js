const mongoose = require('../db/connection')

const chunksSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    qty: {type: Number, required: true, min: 0}
})

const Chunks = mongoose.model('Chunks', chunksSchema)

module.exports = Chunks