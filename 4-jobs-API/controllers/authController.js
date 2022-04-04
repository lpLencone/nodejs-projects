const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')
//##################################//
const register = async (req, res) => {
  // create user out of the information the client sent
  const user = await User.create({ ...req.body })
  // send back user name and token
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name },
    // invoke the instance method to create token, declared in the User.js file
    token: user.createJWToken()
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  // chech whether credentials were provided
  if (!email || !password) {
    throw new BadRequestError('provide email and password')
  }

  const user = await User.findOne({ email })
  // check whether user exists
  if (!user) {
    throw new UnauthenticatedError('invalid credentials')
  }
  // check whether password is correct
  const isPasswordCorrect = user.checkPassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('invalid credentials')
  }

  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token: user.createJWToken()
  })
}

//
module.exports = { register, login }
