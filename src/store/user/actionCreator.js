import axios from 'axios'
import { 
  CHANGE_INPUT_USER, 
  CHANGE_INPUT_PWD, 
  CHANGE_INPUT_REPWD,
  CHANGE_REG_TYPE,
  ERROR_MSG 
} from './actionTypes'
// export const register = ({}) => {

// }
export const getChangeUserAction = (value) => { 
    return {
      type: CHANGE_INPUT_USER,
      user: value
    }
}

export const getChangePwdAction = (value) => {
  return {
    type: CHANGE_INPUT_PWD,
    pwd: value
  }
}

export const getChangeRepwdAction = (value) => {
  return {
    type: CHANGE_INPUT_REPWD,
    repeatPwd: value
  }
}

export const getChangeType = (value) => {
  console.log(value)
  return {
    type: CHANGE_REG_TYPE,
    registerType: value
  }
}

const errMsg = (value) => {
  return {
    type: ERROR_MSG,
    msg: value
  }
}

export const getRegister = ({ user, pwd, repeatPwd, registerType}) => {
  console.log('ok',user, pwd, repeatPwd, registerType)
  if(!user || !pwd || !registerType ) {
    return errMsg('用户名密码必须输入')
  }
  if(pwd !== repeatPwd) {
    return errMsg('密码输入不一致')
  }
  return (dispatch) => {
    axios.post('/user/register', {user, pwd, registerType }).then(res => {
      console.log('12345',res.data)
      dispatch(res.data)
    }).catch(err => {
      return errMsg(err)
    })
  }
}

