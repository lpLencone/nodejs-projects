const mongoose = require('mongoose')

function connectDatabase(url) {
  mongoose
    .connect(connectionString)
    .then(() => console.log('CONNECTED TO THE DB.......'))
    .catch(err => console.log(err))
}

module.exports = connectDatabase
