import React, { Component, Fragment } from 'react'
import Logo from '../../component/logo/logo'
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
            registerType:'STAFF'
        }
        this.register = this.register.bind(this)
    }

    render () {
        const RadioItem = Radio.RadioItem
        return(
            <Fragment>
                <Logo />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem>用户名</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
                        <WhiteSpace />
                        <InputItem>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem checked={ this.state.registerType === 'STAFF'} on>员工</RadioItem>
                        <WhiteSpace size="lg"/>
                        <RadioItem checked={ this.state.registerType === 'BOSS'}>老板</RadioItem>
                        <WhiteSpace  />
                        <Button type="primary" onClick={this.register}>注册</Button>
                    </List>
                </WingBlank>
            </Fragment>
        )
    }

    register(){
      console.log(this.props)
      this.props.history.push('/login')
    }
}


export default Register