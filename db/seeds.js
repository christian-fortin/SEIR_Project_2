const mongoose = require('./connection')
const Chunks = require('../models/chunks')
const chunksSeeds = require('./seeds.json')

Chunks.deleteMany({})
.then(()=>{
    return Chunks.insertMany(chunksSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})

