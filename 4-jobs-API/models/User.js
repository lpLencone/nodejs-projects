const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must define a name'],
    minlength: 4,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'must provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email invalid'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'must set a password'],
    minlength: 8
  }
})

// set mongoose middleware to hash the password before (pre) saving any new document
UserSchema.pre('save', async function (next) {
  // create random hash password
  const salt = await bcrypt.genSalt(10)
  // here, 'this' points to the entire document, since this callback was declared with the 'function' keyword
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

module.exports = mongoose.model('User', UserSchema)
