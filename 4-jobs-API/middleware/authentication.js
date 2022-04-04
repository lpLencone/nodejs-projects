// import Custom Error Class
const { UnauthenticatedError } = require('../errors')
// import JSON WebToken to auxiliate on the authentication
const jwt = require('jsonwebtoken')

// set up authentication middleware
const authenticationMiddleware = async (req, res, next) => {
  // get authorization header
  const authHeader = req.headers.authorization

  // return error if JSONWebToken is not provided (properly)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError(
      'Token is not valid or does not exist.'
    )
  }

  // get token from the authorization header
  const token = authHeader.split(' ')[1]

  try {
    // verify whether the token is valid, and if so, get the data it referenciates
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // get desired data
    const { userId, name } = payload
    // set user property to the request object,
    // so it can be accessed from another middleware dealing with the same request
    req.user = { userId, name }

    // everything being alright, executes next handler
    next()
  } catch (error) {
    // if the token is not provided, send the message below
    throw new UnauthenticatedError(
      'Not authorized to access this route'
    )
  }
}

module.exports = authenticationMiddleware
