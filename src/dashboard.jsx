import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { changeName } from './auth.redux'
import axios from 'axios'

//导入connect
import { connect } from 'react-redux'

@connect(
  state=>({state:state.person}),
  {changeName}
)
class Dashboard extends React.Component{
  componentDidMount(){
    console.log(this);
    axios.get('/data')
      .then((res)=>{
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
    });
  }
  render(){
    return (
      <div>
        <ul>
          <li>
            <Link to='/login'>login</Link>
          </li>
          <li>
            <Link to='/dashboard'>dashboard</Link>
          </li>
        </ul>
        <Button onClick={this.props.changeName}>123</Button>
        <div>hehe:{this.props.state.name}</div>
      </div>
    )
  }
}

export default Dashboard
