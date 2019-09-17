import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../navlinkbar/navlinkbar'
import Boss from '../../component/boss/boss'
import Staff from '../../component/staff/staff'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import { getMsgList,recvMsg } from '../../store/chat/chat'

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class Dashboard extends Component {

  componentDidMount() {
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }   
  }
  render() {
    const pathname = this.props.location.pathname
    console.log(pathname)
    const user = this.props.user 
    const navlist = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '求职列表',
        component: Boss,
        hide: user.registerType === 'STAFF'
      },
      {
        path: '/staff',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Staff,
        hide: user.registerType === 'BOSS'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]

    return(
      <Fragment>
        <NavBar mode='dark'>{ navlist.find(val => val.path === pathname).title}</NavBar>
        <Switch>
          {navlist.map(v =>(
            <Route key={v.path} path={v.path} component={v.component} />
          ))}
        </Switch>
        <NavLinkBar data={navlist}></NavLinkBar>
      </Fragment>
    )
  }
}
export default Dashboard