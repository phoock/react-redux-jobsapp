//合并所有的reducer,并且返回
import { combineReducers} from 'redux'
import { counter } from './index.redux.js'
import { person } from './auth.redux.js'

export default combineReducers({counter,person})
