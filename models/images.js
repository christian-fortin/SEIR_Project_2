const mongoose = require('mongoose')
// Using mongoose
mongoose.connect('mongodb://localhost:27017/imagesDB',{useNewUrlParser:true,useUnifiedTopology:true})
// Connects to the database
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});
// Schema for images
let uploadSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String
  },
})

let uploadModel = mongoose.model('Image',uploadSchema)

module.exports = uploadModel