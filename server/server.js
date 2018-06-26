const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const userRouter = require('./user')


//新建app
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

app.listen(3001,function(){
  console.log('node app start at 3001');
})
