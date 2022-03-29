const express = require('express')
const app = express()

const connectDatabase = require('./db/connect')
require('dotenv').config()
// get routes
const taskManagerRouter = require('./routes/taskManager')

// get custom 404 response
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// static files
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

// routes
app.use('/api/v1/tasks', taskManagerRouter)

// use 404 custom response
app.use(notFound)
app.use(errorHandlerMiddleware)

// PORT=xxxx node app.js
const port = process.env.PORT || 3000

// start the server
async function start() {
  try {
    await connectDatabase(process.env.MONGO_URI)
    app.listen(port, console.log(`server listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
