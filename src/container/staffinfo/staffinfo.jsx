import React, { Component, Fragment } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../store/user/actionCreator'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class StaffInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc:''
    }
    this.selectAvatar = this.selectAvatar.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
  }

  updateInfo(){
    this.props.update(this.state)
  }

  changeState(key, val) {
    this.setState({
      [key]: val
    })
  }

selectAvatar(val) {
  this.setState({
    avatar: val
  })
}
  render() {
    const path = this.props.location.pathname
    const redirectPath = this.props.redirectPath
    return (
      <Fragment>
        {redirectPath && redirectPath !== path ? <Redirect to={redirectPath}></Redirect> : null }
         <NavBar mode="dark" >求职信息完善页</NavBar>
         <AvatarSelector selectAvatar = {this.selectAvatar}></AvatarSelector>
         <InputItem onChange={(val) => this.changeState('title', val)}>求职岗位</InputItem>
         <TextareaItem
           title="个人简介"
           rows={3}
           autoHeight 
           onChange={(val) => this.changeState('desc', val)} />
         <Button type="primary" onClick={this.updateInfo}>确定</Button>
      </Fragment>
    )
  }
}

export default StaffInfo