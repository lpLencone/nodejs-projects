const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')
//
const register = async (req, res) => {
  // ### All of the commented code below is taken care of in ../models/User.js ###
  // // get new user info
  // const { name, email, password } = req.body
  // // create random hash password
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)
  // const tempUser = { name, email, password: hashedPassword }

  // create new user
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json(user)
}

const login = async (req, res) => {
  res.send('login route idk')
}

//
module.exports = { register, login }
