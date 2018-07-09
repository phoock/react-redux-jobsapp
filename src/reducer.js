//合并所有的reducer,并且返回
import { combineReducers} from 'redux'
import { user } from 'reduxs/user.redux'
import { chatUser } from 'reduxs/chatuser.redux.js'
import { chat } from 'reduxs/chat.redux.js'

export default combineReducers({user, chatUser, chat})
