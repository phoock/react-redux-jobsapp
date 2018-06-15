//定义类型常量
const ADD_COUNT = 'ADD_COUNT'
const MINUS_COUNT = 'MINUS_COUNT'


//reducer
export function counter(state=10,action){
  switch (action.type) {
    case ADD_COUNT:
      return state + 1
    case MINUS_COUNT:
      return state - 1
    default:
      return state
  }
}

//action创造函数
export function addCount(){
  return (function(){
    return {
      type: ADD_COUNT
    }
  })()

}

export function minusCount(){
  return {
    type: MINUS_COUNT
  }
}

export function addAsync(){
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addCount())
    },2000)
  }
}
