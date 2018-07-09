import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadInfo } from 'reduxs/user.redux.js'

@withRouter
@connect(
  null,
  { loadInfo }
)
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['login','register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    //获取用户信息
    axios.get('/user/info')
    .then(res=>{
      if(res.status===200) {
        if(res.data.code === 0) {
          this.props.loadInfo(res.data.data)
        }else{
          this.props.history.push('/login')
        }

      }else{
        console.log(res.data.msg);
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  render(){
    return null
  }
}

export default AuthRoute
