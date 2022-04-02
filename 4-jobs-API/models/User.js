const mongoose = require('mongoose')

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
    minlength: 8,
    maxlength: 20
  }
})

module.exports = mongoose.model('User', UserSchema)
