import React, { Component, Fragment } from 'react'
import Logo from '../../component/logo/logo'
import {
   List, 
   Button, 
   WhiteSpace, 
   WingBlank, 
   InputItem,
} from 'antd-mobile'

class Login extends Component {
    constructor(porps) {
        super(porps)
        this.handleRegister = this.handleRegister.bind(this)
    }
    render () {
        return(
            <Fragment>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>       
                    </List>
                    <WhiteSpace />
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </Fragment>
        )
    }

    handleRegister() {
        console.log(this.props)
        this.props.history.push('/register')
    }
}

export default Login