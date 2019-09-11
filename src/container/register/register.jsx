import React, { Component, Fragment } from 'react'
import Logo from '../../component/logo/logo'
import store from '../../store/index'
import { 
  getChangeUserAction, 
  getChangePwdAction, 
  getChangeRepwdAction,
  getChangeType,
  getRegister 
} from '../../store/user/actionCreator'
import { 
    List, 
    InputItem, 
    WhiteSpace, 
    WingBlank,
    Radio, 
    Button 
} from 'antd-mobile'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            registerType:'STAFF',
            user: '',
            pwd: '',
            repeatPwd:''

        }
        this.handleRegister = this.handleRegister.bind(this)
        this.charegisterngeUser = this.changeUser.bind(this)
        this.handleStore = this.handleStore.bind(this)
        this.changPwd = this.changPwd.bind(this)
        this.changeRePwd = this.changeRePwd.bind(this)
        store.subscribe(this.handleStore)
    }

    render () {
        const RadioItem = Radio.RadioItem
        return(
            <Fragment>
                <Logo />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem onChange={this.changeUser}>用户名</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={this.changPwd}>密码</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={this.changeRePwd}>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem 
                            checked={ this.state.registerType === 'STAFF'} 
                            onChange={this.handleChangeType.bind(this, 'STAFF')}>员工</RadioItem>
                        <WhiteSpace size="lg"/>
                        <RadioItem 
                            checked={ this.state.registerType === 'BOSS'}
                            onChange={this.handleChangeType.bind(this, 'BOSS')}>老板</RadioItem>
                        <WhiteSpace  />
                        <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </Fragment>
        )
    }

    handleRegister() {
      console.log('state',this.state)
      const action = getRegister(this.state)
      store.dispatch(action)
    }

    handleChangeType(value) {
      const action = getChangeType(value)
      store.dispatch(action)
    }

    changeRePwd(value) {
      this.setState({
        repeatPwd: value
      })
      // const action = getChangeRepwdAction(value)
      // store.dispatch(action)
    }

    changPwd(value) {
      const action = getChangePwdAction(value)
      store.dispatch(action)
    }

    changeUser(value) {
      const action = getChangeUserAction(value)
      store.dispatch(action)
    }

    handleStore() {
      this.setState((preState) => (
        store.getState().user
      ))
    }
}


export default Register