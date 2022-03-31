const Product = require('../models/productSchema')

const getAllProductsStatic = async (req, res) => {
  /* 
    // By default, Mongoose will filter out query filter properties that are not in the schema.
    // The line below would work as `await Product.find({})` and not throw any error.
    const products = await Product.find({ notInMySchema: '2' })
  */
  /* 
    // documentation query regex: https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    // $regex: 'pattern'; $options: 'options' ( 'i' -> case insensitive )
    const products = await Product.find({ name: { $regex: 'r', $options: 'i' } })
  */

  // const products = await Product.find({}).sort({ featured: 1, price: -1 }) // or .sort("featured -price")
  // const products = await Product.find({}).select('company price')
  const products = await Product.find({})
    .sort('name')
    .select('price name')
    .limit(20)
    .skip(10)
  const productAmount = products.length
  res.status(200).json({ productAmount, products })
}

const getAllProducts = async (req, res) => {
  const { name, price, company, featured, sort, fields, numericFilters } =
    req.query
  const requestQueryObject = {}

  // check which queries were provided and configure them into the requestQueryObject
  if (featured) {
    requestQueryObject.featured = featured === 'true' ? true : false
  }
  if (name) {
    requestQueryObject.name = { $regex: name, $options: 'i' }
  }
  if (company) {
    requestQueryObject.company = company
  }
  if (price) {
    requestQueryObject.price = price
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte'
    }
    // go study regEx ;-;
    const regEx = /\b(<|<=|=|>|>=)\b/g
    let filters = numericFilters.replace(
      regEx,
      match => `-${operatorMap[match]}-`
    )
    const numericFiltersOptions = ['price', 'rating']
    filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      if (numericFiltersOptions.includes(field)) {
        // if field object already exists, add new operator property and its value
        if (requestQueryObject[field]) {
          requestQueryObject[field][operator] = Number(value)
        }
        // else create the object with given property and value
        else {
          requestQueryObject[field] = { [operator]: Number(value) }
        }
      }
    })
  }

  // show which filters will be used on the console
  console.log('requestQueryObject:', requestQueryObject)

  // will return a promise yet able to configure
  const productQueryPromise = Product.find(requestQueryObject)

  // sort products
  if (sort) {
    const sortOptions = sort.split(',').join(' ')
    productQueryPromise.sort(sortOptions)
  } else {
    productQueryPromise.sort('createdAt')
  }

  // select which fields to show
  if (fields) {
    const fieldOptions = fields.split(',').join(' ')
    productQueryPromise.select(fieldOptions)
  }

  /*
    example:
    if limit is set to "5" and page is set to "2",
    5 items will be skipped, showing the next 5 items
    which emulates page 2
  */
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  productQueryPromise.skip(skip).limit(limit)

  // get the product list requested
  const productList = await productQueryPromise

  const productAmount = productList.length
  res.status(200).json({ productAmount, productList })
}

module.exports = { getAllProductsStatic, getAllProducts }
