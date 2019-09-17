import axios from 'axios'

const USER_LIST = 'USER_LIST'
const defaultState = {
  userList:[]
}
export function chatuser(preState = defaultState, action) {
  console.log(action)
  switch(action.type) {
    case USER_LIST: return{...preState, userList: action.payload }
    default : return preState
  }
}

function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  }
}

export function getUserList(type) {
  return (dispatch) => {
    axios.get('/api/v1/user/list?type='+type)
    .then(res => {
      if(res.data.code === 0) {
        dispatch(userList(res.data.data))
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}