import React from 'react'
import { Redirect } from 'react-router-dom'
import Logo from 'component/logo/logo.jsx'
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from 'reduxs/user.redux.js'

@connect(
  state=>state.user,
  { login }
)
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:''
    }
    this.register = this.register.bind(this)
    this.handlelogin = this.handlelogin.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handlelogin(){

    this.props.login(this.state)
  }
  register(){
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <Logo></Logo>
        <h2>登录页</h2>
        <WingBlank>
          {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
          <List>
            <InputItem
            onChange={(v)=>this.handleChange('user',v)}
            >用户</InputItem>
            <InputItem
            type="password"
            onChange={(v)=>this.handleChange('pwd',v)}
            >密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handlelogin} type="primary">登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login
