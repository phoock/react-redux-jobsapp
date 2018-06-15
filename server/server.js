const express = require('express')
const mongoose = require('mongoose')
//新建app
const app = express()

//链接mongo 并使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log('mongo connect success')
})

//类似于mysql的表 mongo里有文档,字段的概念
const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))

User.create({
  user:'phoock',
  age:18
}, function(err, doc){
  if(!err){
    console.log(doc)
  }else{
    console.log(err)
  }
})

app.get('/',function(req,res){
  res.json({
    "name":"phoock2",
    "age":28
  })
})

//通过数据库差一条数据
app.get('/data',function(req, res){
  User.find({},function(err, doc){
    res.json(doc)
  })
})

app.listen(3001,function(){
  console.log('node app start at 3001');
})
