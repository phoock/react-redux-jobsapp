### 项目环境搭建

### create-react-app antd-mobile
1. create-react-app react-redux-jobsapp 使用脚手架工具搭建项目基本环境
2. 安装样式库 antd-mobile
  - npm install antd-mobile
  - npm install babel-plugin-import 只加载用到的组件
  `
  {
    "plugins": [
      ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
    ]
  }
  `
1. 安装react-router-dom

### react-router-dom
1. 安装react-router-dom 并测试

### redux
1. 安装redux
  - 创建reducer,tore
  - 手动连接redux和react 使用store.subscribe(render)  function render(){return ReactDOM.render(<App>,domEle)}
  - index.redux.js文件里 使用action创建函数
  - 在dashboard里测试改变state

2. 使用redux-chunk中间件扩展action的功能
  - npm install redux-chunk
  - redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装
  - 使用方法:
  `
  import {createStore, applyMiddleware} from 'redux';
  import thunk from 'redux-thunk';
  const store = createStore(count,applyMiddleware(thunk));
  `
  - 可以创建一个处理逻辑的action创建函数,
  `
  function addAsync(){
    return (dispatch,getState) => {
      setTimeout(()=>{
        dispatch({
            type: ADD_COUNT
          })
        },2000)
    }
  }
  `

3. redux devtools
  - 通过chrome store安装(需要网络代理)
  - npm install --save-dev redux-devtools-extension通过npm安装
  - 使用方法
  `
    const reduxDevtools = window.devToolsExtension?window.devToolsExtension:()=>{}
    const store = createStore(counter, compose(
      applyMiddleware(thunk),
      reduxDevtools()
    ))
  `

4. react-redux
  - npm install react-redux
  - provider组件在应用最外层,传入store即可,只用一次
  - Connect负责从外部获取组件需要的参数
  - Connect可以用装饰器的方式来写

5. 用装饰器的方式来写Connect
  - 安装插件 npm install babel-plugin-transform-decorators-legacy
  - 在babel配置中添加"plugins":["transform-decorators-legacy"]
  - 使用@connect({state,action})装饰器语法

6. 使用reducer合并的方法处理复杂情况
  - combineReducers

### express
1. 安装express,并通过node起web服务
2. 测试返回一条json数据
`
  const express = require('express')
  const app = express()
  app.get('/',function(req, res){
    res.json({
        "name":"phoock",
        "age":28
      })
  })
  app.listen(3001, function(){
  console.log('Node app start at port 9093');
})
`
3. nodemon插件热加载插件(只需要刷新页面,不需要重新在node环境中运行文件),使用nodemon server.js来启动项目
4. 安装cookies插件 cookie-parse --save

### mongodb数据库
- 1. 在windows下安装MongoDB,MongoDB默认连接在mongodb://127.0.0.1:27017
- "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath C:\Users\29984\Documents\mongodb\data (定义数据存放的目录)
- "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe" (开启mongo服务)
- 2. 安装mongoose用于连接MongoDB和nodejs npm install mongoose

### mongoose连接数据库插件
`
  const mongoose = require('mongoose')
  const DB_URL = 'mongodb://localhost:27017/imooc'
  mongoose.connect(DB_URL)
  mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
  })
`
1. 创建对象,链接mongdb
2. 用const User = mongoose.model('user', new mongoose.Schema({})) 创建模型
3. 用User.create||remove||upload||(find||findOne) 来增删改查
