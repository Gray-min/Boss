
const ChatModel = require('../models/chat')

const socketIo = (server) => {
  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    socket.on('sendMsg', (data) => {
      console.log('接收到客户端消息', data)
      const { from, to, msg } = data
      const chat_id = [from, to].sort().join('_')
      new ChatModel({ from, to, msg, chat_id }).save((err, chatMsg) => {
        io.emit('receiveMsg', chatMsg)
      })
    })
  })
}

module.exports = socketIo