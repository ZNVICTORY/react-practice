import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:8088')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const defaultState = {
  chatmsg:[],
  users:{},
  // 未读消息数
  unread: 0
}
export function chat(state=defaultState, action) {
  console.log(action)
  switch(action.type) {
    case MSG_LIST: return {...state, chatmsg: action.payload.msgs, users:action.payload.users , unread: action.payload.msgs.filter(v=>!v.read && v.to===action.payload.userid).length };
    case MSG_RECV:
      const n = action.payload.data.to === action.payload.userid ? 1 : 0; 
      return {...state, chatmsg:[ ...state.chatmsg, action.payload.data], unread: state.unread + n };
    // case MSG_READ: ;
    default: return state
  }
}

function msgList(msgs, users, userid) {
  return {
    type: MSG_LIST,
    payload: { msgs, users, userid}
  }
}

export function getMsgList() {
  // 俩个参数， dispatch, getState
  return (dispatch, getState) => {
    axios.get('/api/v1/user/getmsglist').then(res => {
      if(res.status === 200 && res.data.code === 0){
        console.log('getstate', getState())
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userid))
      }
    })
  }
}

export function sendMsg({from, to, msg}) {
  return (dispatch) => {
    socket.emit('sendmsg', { from, to, msg})
  }
}
function msgRecv(data, userid) {
  return {
    type: MSG_RECV,
    payload: {data, userid}
  }
}
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      console.log('recvmsg', getState())
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}