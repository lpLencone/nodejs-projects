const express = require('express')
const app = express()

const connectDatabase = require('./db/connect')

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

async function start() {
  try {
    await connectDatabase()
    app.listen(port, console.log(`server listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
