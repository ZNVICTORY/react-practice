import { combineReducers } from 'redux'
import {user} from './user/reducer'
import { chatuser } from './chatuser/chatuser'
import { chat } from './chat/chat'
// 合并所有的reducer

export default combineReducers({user, chatuser, chat})