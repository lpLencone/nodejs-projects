const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://ConstructAware:29.postConventional@nodeexpressprojects.wqz3x.mongodb.net/TASK-MANAGER-API?retryWrites=true&w=majority'

mongoose
  .connect(connectionString)
  .then(() => console.log('CONNECTED TO DATABASE..............'))
  .catch(err => console.log(err))
