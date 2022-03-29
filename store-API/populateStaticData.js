require('dotenv').config()

const connectToDatabase = require('./db/connect')
const Product = require('./models/productSchema')
const jsonProducts = require('./staticProducts.json')

const connect = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI)
  } catch (error) {
    console.log(error)
  }
}
connect()

jsonProducts.forEach(async product => {
  const createdProduct = await Product.create(product)
  console.log(`new created product: ${createdProduct}`)
})
