const mongoose = require('mongoose')

const initDB = dbUrl => {
  mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
  })
}

module.exports = initDB
