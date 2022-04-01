const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  if (!username || !password) {
    throw new BadRequestError('provide username and password')
  }

  // demo id
  const id = new Date().getTime()

  // try to keep payload small to provide a better experience to the user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized lucky number: ${luckyNumber}`
  })
}

module.exports = {
  login,
  dashboard
}
