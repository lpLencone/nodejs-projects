require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// import database connector
const connectDatabase = require('./db/connectDatabase')

// requiring routes
const authRouter = require('./routes/authRouter')
const jobsRouter = require('./routes/jobsRouter')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // connect to database
    await connectDatabase(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
