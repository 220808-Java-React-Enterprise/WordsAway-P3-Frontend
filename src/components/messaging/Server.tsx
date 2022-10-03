import { Socket } from "socket.io"

//3000 is the port of the server
const io = require('socket.io')(3000)

io.on('connnection', (socket: { id: any }) =>{
    console.log(socket.id)
})