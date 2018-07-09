import React from 'react'
import io from 'socket.io-client'
import { List, InputItem,NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from 'reduxs/chat.redux.js'
import { getChatId } from '../../util.js'
const socket = io('ws://localhost:3001')


socket.on('recvmsg',function(data){
  console.log(data);
})
@connect(
  state=>state,
  { getMsgList,sendMsg,recvMsg }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text : '',
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  fixedCar(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSubmit(){
    // socket.emit('sendmsg',{
    //   text:this.state.text
    // })
    // this.setState({
    //   text:''
    // })
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text

    this.props.sendMsg({from, to, msg})
    this.setState({text:''})
  }

  render(){
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
                  .split(' ')
                  .filter(v=>v)
                  .map(v=>({text:v}))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if(!users[userid]){
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
    return (
      <div id="chat-page">
        <NavBar
         icon={<Icon type="left" />}
         onLeftClick={()=>{return this.props.history.goBack()}}
         mode="dark"
         >
          {users[userid].name}
        </NavBar>
        {
          chatmsgs.map((v)=>{
            const avatar = require(`../img/${users[v.from].avatar}.jpg`)
            return v.from===userid?(
              <List key={v._id}>
                <Item
                thumb={avatar}
                >{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                <Item
                 extra={<img src={avatar} alt=""/>}
                 className='chat-me'>{v.content}</Item>
              </List>
            )
          })
        }
        <div className = "stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={
                v=>{this.setState({text:v})}
              }
              extra={
                <div>
                  <span style={{marginRight:'15px'}} onClick={()=>{this.setState({
                    showEmoji:!this.state.showEmoji},
                      ()=>{
                        this.fixedCar()
                      }
                    )
                  }}>😊</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>

              }
            >
            </InputItem>
          </List>
          {
            this.state.showEmoji
            ?
            (
              <Grid
              data={emoji}
              columnNum = {9}
              carouselMaxRow = {4}
              isCarousel = {true}
              onClick={
                el=>{
                  this.setState({
                    text:this.state.text+el.text
                  })
                }
              }
              />
            )
            : null
          }

        </div>
      </div>

    )
  }
}

export default Chat
