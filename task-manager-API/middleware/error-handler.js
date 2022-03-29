const errorHandlerMiddleware = (err, req, res, next) => {
  const errorType = err.name
  console.log(errorType)

  if (errorType === 'CastError') {
    const requestedItemId = err.value
    const idLength = requestedItemId.length
    console.log(idLength)
    return res.status(404).json({
      msg: `No task with id ${requestedItemId}`,
      tip: `Your id contains ${idLength} characters, while the standard id format for this application is 24 characters.`
    })
  }

  if (errorType === 'ValidationError') {
    const errorMessage = err.errors.name.message
    return res.status(500).json({
      msg: errorMessage
    })
  }

  return res.send(err)

  // return res.status(500).json({ error: err })
}

module.exports = errorHandlerMiddleware
