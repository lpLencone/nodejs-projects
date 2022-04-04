const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'must provide company name'],
      minlength: 2,
      maxlength: 30
    },
    position: {
      type: String,
      required: [true, 'must provide job name'],
      minlength: 2,
      maxlength: 50
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'must provide user']
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Job', JobSchema)
