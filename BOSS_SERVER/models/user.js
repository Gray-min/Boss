const mongoose = require('../db/db')
const userModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  passWord: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    enum: [0, 1],
    required: true
  },
  header: { type: String, default: '' },
  post: { type: String, default: '' },
  info: { type: String, default: '' },
  company: { type: String, default: '' },
  salary: { type: String, default: '' }

})
const User = mongoose.model('User', userModel)
module.exports = User