// const error
//
const register = async (req, res) => {
  // get info provided by user
  const { username, email, password } = req.body

  res.status(200).json({ username, email, password })
}

const login = async (req, res) => {
  res.send('login route idk')
}

//
module.exports = { register, login }
