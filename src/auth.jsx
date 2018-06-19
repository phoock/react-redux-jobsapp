import React from 'react'
import './config.js'
//导入connect
import { connect } from 'react-redux'
import { changeName,getUserData } from './auth.redux'

@connect(
  state=>({state:state.person}),
  {changeName,getUserData}
)
class Auth extends React.Component{
  componentDidMount(){
    console.log(this.props);
  }
  render(){
    return (
      <div>
        Auth
        <h2>{this.props.state.name}</h2>
        <button onClick={this.props.getUserData}>click</button>
      </div>
    )
  }
}

export default Auth
