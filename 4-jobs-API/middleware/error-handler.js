const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // set default error object
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Try again later.'
  }

  // configure error object in case its type is CastError
  if (err.name === 'CastError') {
    const requestedItemId = err.value
    const idLength = requestedItemId.length
    customError.statusCode = StatusCodes.NOT_FOUND
    customError.msg = `No task with id ${requestedItemId}. Tip: Your id contains ${idLength} characters, while the standard id format for this application is 24 characters.`
  }

  // configure error object in case it's a duplicate values error
  if (err.code === 11000) {
    customError.msg = `Value entered for ${Object.keys(
      err.keyValue
    )} field is already in use. Try another value.`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map(item => {
        return `${item.path}: ${item.message}`
      })
      .join(';  ')
    customError.statusCode = 400
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ customError })
}

module.exports = errorHandlerMiddleware
