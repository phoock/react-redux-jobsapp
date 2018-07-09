import React from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from 'reduxs/user.redux.js'
@connect(
  state=>state.user,
  { logoutSubmit }
)
class User extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(){
    const alert = Modal.alert

    alert('注销','确认退出登录吗?',[
      {
        text:'取消',
        onPress:()=>console.log('cancel')
      },
      {
        text:'确认',
        onPress:()=>{
          browserCookie.erase('userid')
          console.log(document.cookie);
          this.props.logoutSubmit()
        }
      }
    ])
  }
  render(){
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief

    console.log(props);
    return props.user
    ?
    (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.jpg`)} width="100%" alt=""/>}
          title={props.user}
          message={props.type==='boss'?props.compony:null}
        />
        <List renderHeader={()=>'简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>薪资:{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
         <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    )
    :
    <div><Redirect to={props.redirectTo}></Redirect></div>
  }
}

export default User
