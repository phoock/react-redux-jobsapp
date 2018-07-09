import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const avatars = 'aaa,bbb,ccc,ddd,eee,fff,ggg,hhh,iii,jjj,kkk,lll,mmm,nnn,ooo,ppp',
          avatarList = avatars.split(',').map((v)=>{
            return {
              icon:require(`../img/${v}.jpg`),
              text:v
            }
          });
    const gridHeader = this.state.icon
                      ?(
                        <div>
                          <span>已选择头像</span>
                          <img src={this.state.icon} style={{width:'20px',marginLeft:'5px'}} alt=""/>
                        </div>
                      )
                      : <div>请选择头像</div>
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
          data={avatarList}
          onClick={elm=>{
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }}
          ></Grid>
        </List>
      </div>
    )
  }
}

export default AvatarSelector
