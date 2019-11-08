import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

socket.emit('sendMsg', { name: 'zhangsan' })
console.log("客户端发送数据")

socket.on('receiveMsg', (data) => {
  console.log('客户端接收到数据', data)
})