import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends Component {
  constructor(props) {
    super(props)
    this.getLastItem = this.getLastItem.bind(this)
  }

  getLastItem(v) {
    return v[v.length - 1]
  }

  render() {
  
    // 获取所有的聊天信息
    const chatmsg = this.props.chat.chatmsg
    const msgGroup = {}
  
    //用户聊天分组， 根据chatid分组
    chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const Item = List.Item
    const Brief = List.Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const chatList = Object.values(msgGroup)
    console.log('chatlist',chatList)
    
    return (
      <Fragment>
       
           {chatList.map(v => {
             const lastItem = this.getLastItem(v)
             const targetId = v[0].from === userid ? v[0].to : v[0].from
             const unreadNum = v.filter(val => !val.read && val.to === userid).length
             if(!userinfo[targetId]) {
               return null
             }
             return (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                >
                  { lastItem.content }
                <Brief>{userinfo[targetId].name}</Brief>
                </Item>
               </List>
             )
           })}
      </Fragment>
    )
  }
}
export default Msg