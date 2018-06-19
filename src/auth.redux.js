import axios from 'axios'

//初始状态
const initialState = {
    name : 'phoock',
    age :28,

};

//ACTION类型
const CHANGE_NAME = "CHANGE_NAME"
const CHANGE_AGE = "CHANGE_AGE"
const USER_DATA = "USER_DATA"


//reducer
export function person(state=initialState, action){
  console.log(state,action);
  switch(action.type){
    case CHANGE_NAME:{
      return Object.assign({},state,{
        name:action.value
      })
    }
    case CHANGE_AGE:{
      return Object.assign({},state,{
        age:action.value
      })
    }
    case USER_DATA:{
      return {...state,...action.payload}
    }
    default:{
      return state
    }
  }
}

//action创建函数
export function getUserData(){
  return dispatch => {
    axios.get('/data').then(res=>{
      if(res.status === 200) {
        dispatch(userData(res.data))
      }
    })
  }
}

export function userData(data){
  return {
    type:USER_DATA,
    payload:data
  }
}
export function changeName(){
  return {
    type:CHANGE_NAME,
    value:'xiaofu'
  }
}
export function changeAge(){
  return {
    type:CHANGE_AGE,
    value:20
  }
}
