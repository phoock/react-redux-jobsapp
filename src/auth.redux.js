//初始状态
const initialState = {
    name : 'phoock',
    age :28
};

//ACTION类型
const CHANGE_NAME = "CHANGE_NAME"
const CHANGE_AGE = "CHANGE_AGE"

//reducer
export function person(state=initialState, action){
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
    default:{
      return state
    }
  }
}

//action创建函数
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
