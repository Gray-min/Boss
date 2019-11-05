const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

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
  }

})

const User = mongoose.model('User', userModel)
module.exports = User