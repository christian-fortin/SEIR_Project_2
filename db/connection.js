const mongoose = require('mongoose')

const mongoURI = process.env.NODE_ENV === 'production'
? process.env.DB_URL
: 
'mongodb://localhost/express-mc-two'
// "express-mc-two" --> creates a database in mongoose called that

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
.then((inst) => console.log(`connected to ${inst.connection[0].name} `))
.catch((err) => console.log(err));

module.exports = mongoose