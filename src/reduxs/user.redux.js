import axios from 'axios'
import util from '../util'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_INFO = 'LOAD_INFO'
const AUTH_SECCESS = 'AUTH_SECCESS'
const LOGOUT = 'LOGOUT'

const initState={
  redirectTo:'',
  msg:'',
  user:'',
  type:''
}
//reducer
export function user(state=initState, action){
  switch(action.type){
    case AUTH_SECCESS:
      return {...state, msg:'', redirectTo:util.getRedirectPath(action.payload), ...action.payload}
    case LOAD_INFO:
      return {...state,...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    case LOGOUT:
      return {...initState, redirectTo:'/login'}
    default:
      return state
  }
}



function authSuccess(obj){
  const {pwd,...data} = obj
  return { type:AUTH_SECCESS, payload:data}
}

function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}

export function update(data){
  if(!data.avatar) {
    return errorMsg('请选择头像')
  }
  return dispatch=>{
    axios.post('/user/update',data)
    .then(res=>{
      if(res.status === 200 && res.data.code ===0 ){
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(res.data.msg)
      }
    }).catch(error=>{
      console.log('error: ' + error)
    })
  }
}

export function loadInfo(data){
  return { type:LOAD_INFO, payload:data}
}

export function login({user,pwd}){
  if(!user || !pwd){
    return errorMsg('用户名密码必须输入')
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd})
    .then(res=>{
      if (res.status === 200 && res.data.code === 0){
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function logoutSubmit(){
  return { type:LOGOUT }
}

export function register({user,pwd,repeatpwd,type}){
  if(!user||!pwd||!type) {
    return errorMsg('用户名密码必须输入')
  }
  if(pwd!==repeatpwd){
    return errorMsg('密码和确认密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
    .then(res=>{
      if(res.status === 200 && res.data.code === 0){
        dispatch(authSuccess({user,pwd,type}))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
