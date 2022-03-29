const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true, // "    name    " => "name"
    maxlength: [20, 'name length cannot be longer than 20 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Task', TaskSchema)
