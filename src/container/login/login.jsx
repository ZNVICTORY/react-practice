import React, { Component, Fragment } from 'react'
import Logo from '../../component/logo/logo'
import './login.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getLogin } from '../../store/user/actionCreator'
import imoocForm from '../../component/imooc-form/imoocform' 
import {
   List, 
   Button, 
   WhiteSpace, 
   WingBlank, 
   InputItem,
} from 'antd-mobile'
// @connect 作用连接store 和 组件，将store中数据传递给组件
@connect(state => state.user,
    {getLogin})
@imoocForm
class Login extends Component {
    constructor(props) { 
        super(props)
        
        this.handleLogin = this.handleLogin.bind(this)
        this.toRegister = this.toRegister.bind(this)
    }
    render () {
        return(
            <Fragment>
                <Logo />
                {this.props.redirectPath ?<Redirect to={this.props.redirectPath}></Redirect>:null}
                <WingBlank>
                    <List>
                        {this.props.msg?<div className="err-msg">{this.props.msg}</div>:null}
                        <InputItem type="text" onChange={value => this.props.handleChange('user', value)}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={value => this.props.handleChange('pwd', value)}  type="password">密码</InputItem>       
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.toRegister}>注册</Button>
                </WingBlank>
            </Fragment>
        )
    }
    

    handleLogin() {
        
        this.props.getLogin(this.props.state)
    }

    toRegister() {
        this.props.history.push('/register')
    }
}

export default Login