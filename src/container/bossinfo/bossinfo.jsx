import React, { Component, Fragment } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../store/user/user'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company:'',
      money: '',
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
         <NavBar mode="dark" >Boss信息完善</NavBar>
         <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
         <InputItem onChange={(val) => this.changeState('title', val)}>招聘职位</InputItem>
         <InputItem onChange={(val) => this.changeState('company', val)}>公司名称</InputItem>
         <InputItem onChange={(val) => this.changeState('money', val)}>职位薪资</InputItem>
         <TextareaItem
           title="职位要求"
           rows={3}
           autoHeight 
           onChange={(val) => this.changeState('desc', val)} />
         <Button type="primary" onClick={this.updateInfo}>确定</Button>
      </Fragment>
    )
  }
}

export default BossInfo