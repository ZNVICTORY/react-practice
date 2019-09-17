
import { 
  ERROR_MSG,
  LOAD_INFO,
  AUTH_SUCCESS,
  LOGOUT
  } from './actionTypes'

import { getRedirectPath } from '../../util/util'
// 初始状态
const defaultState = {
  redirectPath:'',
  registerType:'',
  user: '',
  msg: ''
}

export const user = (preState = defaultState, action) => {
  console.log('action', action)
  switch(action.type) {
    case AUTH_SUCCESS : return {...preState, redirectPath: getRedirectPath(action.payload), msg:'', ...action.payload }
    case LOAD_INFO : return { ...preState, ...action.payload.data }
    case ERROR_MSG : return { ...preState, msg: action.msg  }
    case LOGOUT : return { ...defaultState, redirectPath: "/login" }
    default : return preState 
  } 
}





