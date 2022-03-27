const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://ConstructAware:29.postConventional@nodeexpressprojects.wqz3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

function connectDatabase(url) {
  mongoose
    .connect(connectionString)
    .then(() => console.log('CONNECTED TO THE DB.......'))
    .catch(err => console.log(err))
}

module.exports = connectDatabase
