import { combineReducers } from 'redux'
import user from './user/reducer'
// 合并所有的reducer

export default combineReducers({user})