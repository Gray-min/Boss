const mongoose = require('../db/db')

const chatSchema = mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  chat_id: { type: String, required: true },
  msg: { type: String, required: true },
  read: { type: String, required: true, default: false },
  create_time: { type: Date, default: Date.now }
})
const Chat = mongoose.model('chat', chatSchema)
module.exports = Chat