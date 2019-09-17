import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browsercookie from 'browser-cookies'
import  {logoutSubmit } from '../../store/user/actionCreator'

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends Component {
  constructor(props) {
    super(props)
    this.outLog = this.outLog.bind(this)
  }

  outLog() {
    // console.log('cancel')
    const alert = Modal.alert
    alert('注销', '确认退出登陆吗', [
      { text: '取消', onPress: () => console.log('logout cancel')},
      { text: '确认', onPress: () => {
        // 删除cookie
        browsercookie.erase('userId')
        this.props.logoutSubmit()
        // 自动刷新
        // window.location.href = window.location.href
      }}
    ])
  }

  render() {
    console.log(this.props.redirectPath)
    const props = this.props
    const Item = List.Item
    const Brief = List.Item.Brief
    return props.user ? (
      <Fragment>

        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt="" />}
          title={props.user}
          message= {props.registerType === 'BOSS'? props.company : null}
        />
        <List renderHeader={()=> '简介'}>
          <Item
            multipleLine={true}
          >
            {props.title}
            {props.desc.split('\n').map(val => (<Brief key={val}>{val}</Brief>))}
            {props.money? <Brief>薪资：{props.money}</Brief>: null}
          </Item>
          <WhiteSpace />
          <Item>信息设置</Item>
        </List>
        <WhiteSpace />
        <List>
            <Item onClick={this.outLog}>退出登录</Item>
        </List>
      </Fragment>
    ): <Redirect to={props.redirectPath} />
  }
}

export default User
