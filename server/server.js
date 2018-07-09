const express = require('express')

const model = require('./model')
const Chat = model.getModel('chat')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
//新建app
const app = express()
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)


//io是整体连接,socket是单独的这次连接
io.on('connection',function(socket){
  console.log('user login')
  socket.on('sendmsg',function(data){
    const {from, to, msg} = data
    const chatid = [from,to].sort().join('_')

    Chat.create({chatid, from, to, content:msg},function(err, doc){
      io.emit('recvmsg', Object.assign({},doc._doc))
    })
    // console.log(data);
    // io.emit('recvmsg',data)
  })
})

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(3001,function(){
  console.log('node app start at 3001');
})
