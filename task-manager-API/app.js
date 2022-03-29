const express = require('express')
const app = express()

const connectDatabase = require('./db/connect')
require('dotenv').config()
// get routes
const taskManagerRouter = require('./routes/taskManager')

// static files
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/api/v1/tasks', taskManagerRouter)

// routes
// app.get('/api/v1/tasks', callback)
// app.post('/api/v1/tasks', callback)
// app.get('/api/v1/tasks/:id', callback)
// app.patch('/api/v1/tasks/:id', callback)
// app.delete('/api/v1/tasks/:id', callback)

const port = 3000

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
