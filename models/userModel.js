const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name'],
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Add password'],
    },
    role: {
      type: String,
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
