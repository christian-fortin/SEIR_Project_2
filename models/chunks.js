const mongoose = require('../db/connection')

const chunksSchema = new mongoose.Schema({
    title: {type: String, required: true},
    prompt: {type: String, required: true},
    zipFile: { type: String, required: true},
    description: {type: String, required: true},
    videoFile: {type: String, required: true},
    })

const Chunks = mongoose.model('Chunks', chunksSchema)

module.exports = Chunks