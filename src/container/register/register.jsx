import React from 'react'
import { Redirect } from 'react-router-dom'
import Logo from 'component/logo/logo.jsx'
import { List, InputItem, WhiteSpace, Button, Radio} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from 'reduxs/user.redux.js'
@connect(
  state=>state.user,
  {register}
)
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount(){
    console.log(this);
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
          <InputItem
          onChange={(v)=>this.handleChange('user',v)}
          >用户名</InputItem>
          <InputItem
          type="password"
          onChange={(v)=>this.handleChange('pwd',v)}
          >密码</InputItem>
          <InputItem
          type="password"
          onChange={(v)=>this.handleChange('repeatpwd',v)}
          >确认密码</InputItem>
        </List>
        <WhiteSpace />
        <RadioItem
        onChange={(v)=>this.handleChange('type','genius')}
        checked={this.state.type === 'genius'}>
          牛人
        </RadioItem>
        <RadioItem
        onChange={(v)=>this.handleChange('type','boss')}
        checked={this.state.type === 'boss'}>
          老板
        </RadioItem>
        <WhiteSpace />
        <Button
        onClick={this.handleRegister}
        type="primary">注册</Button>
      </div>
    )
  }
}
export default Register
