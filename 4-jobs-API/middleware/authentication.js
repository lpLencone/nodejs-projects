// importing Custom Error Class
const { UnauthenticatedError } = require('../errors')
// importing JSON WebToken to auxiliate on the authentication
const jwt = require('jsonwebtoken')

// setting up authentication middleware
const authenticationMiddleware = async (req, res, next) => {
  // get authorization header
  const authHeader = req.headers.authorization

  // return error if JSONWebToken is not provided (properly)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return UnauthenticatedError('Token is not valid or does not exist.')
  }

  // get token from the authorization header
  const token = authHeader.split(' ')[1]

  try {
    // verify whether the token is valid, and if so, get the data it referenciates
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    // select desired data
    const { id, username } = decodedData
    // set a property to the request object,
    // so it can be accessed from another middleware dealing with the same request
    req.user = { id, username }

    // everything being alright, executes next handler
    next()
  } catch (error) {
    // if the token is not provided, send the message below
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware
