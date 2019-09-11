import { 
  REGISTER_SUCCESS,
  ERROR_MSG,
  CHANGE_INPUT_USER,
  CHANGE_INPUT_PWD,
  CHANGE_INPUT_REPWD,
  CHANGE_REG_TYPE
  } from './actionTypes'

const defaultState = {
  registerType:'STAFF',
  user: '',
  pwd: '',
  repeatPwd:'',
  isAuth: false,
  msg: ''
}

export default function user(preState = defaultState, action) {
  switch(action.type) {
    case CHANGE_REG_TYPE : return { ...preState, registerType: action.registerType}
    case CHANGE_INPUT_REPWD: return { ...preState, repeatPwd: action.pwd}
    case CHANGE_INPUT_PWD : return { ...preState, pwd: action.pwd }
    case CHANGE_INPUT_USER : return {...preState, user: action.user} 
    case REGISTER_SUCCESS : return {...preState, msg: '', isAuth: true}
    case ERROR_MSG: return {...preState, msg:action.msg , isAuth: false}
    default : return preState 
  }
}