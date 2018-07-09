import React from 'react'
import { InputItem, NavBar, TextareaItem, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

//导入redux相关
import { connect } from 'react-redux'
import { update } from 'reduxs/user.redux.js'

//导入组件
import AvatarSelector from 'component/avatar-selector'

@connect(
  state=>state.user,
  { update }
)
class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      compony: '',
      money: '',
      desc: ''
    }
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  render(){
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && path!==redirect ?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">BOSS完善信息</NavBar>

        <AvatarSelector
        selectAvatar={(imgname)=>{
          this.setState({
            avatar:imgname
          })
        }}
        ></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
        <InputItem onChange={(v)=>this.onChange('compony',v)}>公司名称</InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>职位薪资</InputItem>
        <TextareaItem
        onChange={(v)=>this.onChange('desc',v)}
        rows={3}
        autoHeight
        title='职位要求'
        ></TextareaItem>
        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
        <Button
        onClick={
          ()=>this.props.update(this.state)
        }
        type='primary'>保存</Button>
      </div>
    )
  }
}

export default BossInfo
