const mongoose = require('mongoose')
// This brings in mongoose to use. Reminder, it is the glue between express and the database mongoDB


const mongoURI = process.env.NODE_ENV === 'production'
? process.env.DB_URL
: 
'mongodb://localhost/project-two'
// In english, this is saying, mongoURI is set to... NODE_ENV in the .env file, if that is equal to 'production' use the DB_URL provided in the .env file. If not, then use the local data base.
// 'mongodb://localhost/project' --> creates a database in mongoose called that.


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((inst) => console.log(`connected to ${inst.connections[0].name} `))
.catch((err) => console.log(err));
// This is all STATIC, and will never change. It is just the connection process between the mongoURI(database).


module.exports = mongoose
// ***** Why are we exporting this?
// We are exporting it to our seeds.js file. 