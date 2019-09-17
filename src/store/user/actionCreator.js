import axios from 'axios'
import { 
  ERROR_MSG,
  LOAD_INFO,
  AUTH_SUCCESS,
  LOGOUT
} from './actionTypes'

export const loadData = (data) =>{
  return {
    type: LOAD_INFO,
    payload: data
  }
}

const errMsg = (value) => {
  return {
    type: ERROR_MSG,
    msg: value
  }
}
const authSuccess = (data) =>{
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

export const getRegister = ({ user, pwd, repeatPwd, registerType}) => {
  if(!user || !pwd || !registerType ) {
    return errMsg('用户名密码必须输入')
  }
  if(pwd !== repeatPwd) {
    return errMsg('密码输入不一致')
  }
  return (dispatch) => {
    axios.post('/api/v1/user/register', {user, pwd, registerType })
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, registerType}))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    }).catch(err => {
      dispatch(errMsg(err))
    })
  }
}

export const getLogin = ({user, pwd}) => {
  if (!user || !pwd) {
    return errMsg('用户名密码不能为空')
  }
  return (dispatch) => {
    axios.post('/api/v1/user/login', { user, pwd}).then(res=>{
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    }).catch(err => {
      dispatch(errMsg(err))
    })
  }
}

export const update = (data) => {
  return (dispatch) => {
    axios.post('api/v1/user/update', data).then(res => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errMsg(res.data.msg))
      }
    })
  }
}

export const logoutSubmit = () => {
  return { type: LOGOUT }
}


