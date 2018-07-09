import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class Usercard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(v){
    console.log(v);
    this.props.history.push(`/chat/${v._id}`)
  }
  render(){
    return (
      <div>
      {
        this.props.userList.map((item,index)=>{
          return (
            item.avatar
            ?<WingBlank key={index} size="lg">
              <WhiteSpace size="lg" />
              <Card
                key={item._id}
                onClick={()=>this.handleClick(item)}
              >
                <Card.Header
                  title={item.user}
                  thumb={require(`../img/${item.avatar}.jpg`)}
                  extra={<span>{item.title}</span>}
                >
                </Card.Header>
                <Card.Body>
                  {
                    item.type==='boss'?(<div>公司:{item.compony}</div>):null
                  }
                  <div>{item.desc}</div>
                  {
                    item.type==='boss'?(<div>薪资:{item.money}</div>):null
                  }
                </Card.Body>

              </Card>
              <WhiteSpace size="lg" />
            </WingBlank>
            :null
          )
        })
      }
      </div>
    )
  }
}

export default Usercard
