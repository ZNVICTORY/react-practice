import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './index.css'
import { withRouter } from 'react-router-dom'
@connect(
  state => state.chat
)
@withRouter
class NavLinkBar extends Component {
  //  组件传递参数校验
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
    const unread = this.props.unread
    const {pathname} = this.props.location
    const navlist = this.props.data.filter(v => !v.hide)
    return (
        <TabBar tabBarPosition="bottom">
          {navlist.map((v) => (
            <TabBar.Item
              badge={v.path==='/msg'? unread: 0}
              key={v.path}
              title={v.text}
              icon={{uri: require(`../nav-img/${v.icon}.png`)}}
              selectedIcon={{uri: require(`../nav-img/${v.icon}-active.png`)}}
              selected={pathname === v.path}
              onPress={() => {
                this.props.history.push(v.path)
              }}
            >
            </TabBar.Item>
          ))}
        </TabBar>
    )
  }
}

export default NavLinkBar