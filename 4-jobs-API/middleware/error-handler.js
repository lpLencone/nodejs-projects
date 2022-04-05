const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.name === 'CastError') {
    const requestedItemId = err.value
    const idLength = requestedItemId.length
    console.log(idLength)
    return res.status(404).json({
      msg: `No task with id ${requestedItemId}`,
      tip: `Your id contains ${idLength} characters, while the standard id format for this application is 24 characters.`
    })
  }

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
