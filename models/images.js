const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/imagesDB',{useNewUrlParser:true,useUnifiedTopology:true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});

let uploadSchema = new mongoose.Schema({
    imagename:String
})

let uploadModel = mongoose.model('image',uploadSchema)

module.exports = uploadModel