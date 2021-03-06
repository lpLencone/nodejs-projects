require('dotenv').config()
require('express-async-errors')

// import database connection function
const connectToDatabase = require('./db/connect')

const productsRouter = require('./routes/productsRouter')

// import middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()
