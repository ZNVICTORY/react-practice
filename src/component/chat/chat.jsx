import React, {Component} from 'react'
import './index.css'
import { connect } from 'react-redux'
import { List, InputItem, NavBar, Grid } from 'antd-mobile'
import {  sendMsg, getMsgList, recvMsg, readMsg} from '../../store/chat/chat'
import { getChatId } from '../../util/util'

@connect(
  state =>state,
  {  recvMsg,sendMsg ,getMsgList, readMsg}
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text:'',
      showEmoji: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.userid
    this.props.readMsg(to)
  }
  fixCarousel(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({ text:''})
  }
  render() {
    // 对方的用户名id
    const userid = this.props.match.params.userid
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    const users = this.props.chat.users
    const emoji = '😀 😁 😅 😂 🤣 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 🥵 🥶 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                   .split(' ')
                   .filter(v => v)
                   .map(v=>({ text: v }))
    
    if(!users[userid]) {
      return null
    }
    return(
      <div id="chat-page">
        <NavBar 
          dark="mode"
          leftContent="返回"
          onLeftClick={() => { this.props.history.goBack()}}>
          {users[userid].name}
        </NavBar>

        {chatmsg.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id}>
              <List.Item
                thumb={avatar}
              >{v.content}</List.Item>
            </List>
          ):(
            <List key={v._id}>
              <List.Item 
                className="chat-me"
                extra={<img src={avatar} alt="" />}
              >{v.content}</List.Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={(v) => this.setState({ text: v }) }
              extra={
                <span>
                  <span 
                    role="img" aria-label=""
                    style={{marginRight: 15}}
                    onClick={() => {this.setState({
                      showEmoji: !this.state.showEmoji
                    })
                    this.fixCarousel()
                    }}
                  >😀</span>
                  <span onClick={this.handleSubmit}>发送</span>
                </span>
              }
            ></InputItem>
          </List>
          {
            this.state.showEmoji ? 
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(el)=> {
                this.setState({
                  text:this.state.text+el.text
                })
              }}
            />: null
          }
        </div>
      </div>
    )
  }
}

export default Chat 