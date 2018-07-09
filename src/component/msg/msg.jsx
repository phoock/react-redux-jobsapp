import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

@connect(
  state=>state
)
class Msg extends React.Component{
  getLastItem(arr){
    return arr[arr.length-1]
  }
  render(){
    const msgGroup={}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })

    //将msgGroup处理成数组,并按照最后一条信息的时间戳进行排序
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLastItem(a).create_time
      const b_last = this.getLastItem(b).create_time
      return b_last - a_last
    })
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    return (
      <div>
        <List>
          {
            chatList.map((v, index)=>{

              const lastItem = this.getLastItem(v)
              const targetId = lastItem.from===userid?lastItem.to:lastItem.from
              const name = userInfo[targetId].name
              const avatar = userInfo[targetId].avatar
              const unreadNum = v.filter(item=>!item.read&&item.to==userid).length
              return (
                <List key={index}>
                  <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${avatar}.jpg`)}
                  >
                    {lastItem.content}
                    <Brief>{userInfo[targetId].name}</Brief>
                  </Item>
                </List>
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default Msg
