import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from 'reduxs/chatuser.redux.js'

//导入组件
import Usercard from 'component/usercard/usercard.jsx'

@connect(
  state=>state.chatUser,
  { getUserList }
)
class Boss extends React.Component{
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return (
      <div>
        <Usercard userList={this.props.userList}></Usercard>
      </div>
    )
  }
}

export default Boss
