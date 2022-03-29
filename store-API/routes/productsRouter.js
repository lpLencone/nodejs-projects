const express = require('express')
const router = express.Router()

const {
  getAllProductsStatic,
  getAllProducts
} = require('../controller/productsController')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router
