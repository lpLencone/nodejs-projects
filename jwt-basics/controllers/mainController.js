const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  if (!username || !password) {
    throw new CustomAPIError('provide username and password', 400)
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
    msg: `Hello`,
    secret: `Here is your authorized data: ${luckyNumber}`
  })
}

module.exports = {
  login,
  dashboard
}
