import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

//导入组件
import NavlinkBar from 'component/navlink/navlink.jsx'
import Boss from 'component/boss/boss.jsx'
import Genius from 'component/genius/genius.jsx'
import User from 'component/user/user.jsx'
import Msg from 'component/msg/msg.jsx'
import { getMsgList, sendMsg, recvMsg } from 'reduxs/chat.redux.js'



@connect(
  state=>state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component{
  componentDidMount(){
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render(){
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Boss,
        hide:user.type === 'genius'
      },
      {
        path:'/genius',
        text:'boss',
        icon:'job',
        title:'Boss列表',
        component:Genius,
        hide:user.type === 'boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg
      },
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
      },
    ]
    return (
      <div>
      {
        pathname === '/'
        ?
        <div><Redirect to="/login"></Redirect></div>
        :
        <div>
        <NavBar className="fixd-header" mode='dark'>{navList.find(v=>v.path === pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {
              navList.map((v,index)=>{
                return (
                  <Route key={index} path={v.path} component={v.component}></Route>
                )
              })
            }
          </Switch>
        </div>
        <NavlinkBar data={navList}></NavlinkBar>
        </div>
      }


      </div>
    )
  }
}

export default Dashboard
