require('dotenv').config()

const connectToDatabase = require('./db/connect')
const Product = require('./models/productSchema')
const jsonProducts = require('./staticProducts.json')

const start = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI)
    // delete all products from the database
    await Product.deleteMany()
    // add static products
    await Product.create(jsonProducts)
    console.log('success')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
start()
