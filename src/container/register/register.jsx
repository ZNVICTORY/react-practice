import React, {  Fragment,Component } from 'react'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux' 
import { Redirect } from 'react-router-dom'
import { getRegister } from '../../store/user/actionCreator'
import imoocForm from '../../component/imooc-form/imoocform'
import './register.css'
import { 
    List, 
    InputItem, 
    WhiteSpace, 
    WingBlank,
    Radio, 
    Button 
} from 'antd-mobile'

@connect(state => state.user,
  {getRegister})
@imoocForm
class Register extends Component {

constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
}
componentDidMount() {
  this.props.handleChange('registerType', 'STAFF')
}

render () {
    const RadioItem = Radio.RadioItem
    return(
        <Fragment>
            <Logo />
            {this.props.redirectPath?<Redirect to={this.props.redirectPath}></Redirect>:null}
            <WingBlank>
                <List>
                  {this.props.msg?<p className="err-msg">{this.props.msg}</p>:null} 
                    <WhiteSpace />
                    <InputItem
                      type="text" 
                      onChange={(value) => this.props.handleChange('user', value)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem  
                      type="password" 
                      onChange={(value) => this.props.handleChange('pwd', value)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem  
                      type="password" 
                      onChange={(value) => this.props.handleChange('repeatPwd', value)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={ this.props.state.registerType === 'STAFF'} 
                        onChange={() => this.props.handleChange('registerType','STAFF')}
                    >员工</RadioItem>
                    <WhiteSpace size="lg"/>
                    <RadioItem 
                        checked={ this.props.state.registerType === 'BOSS'}
                        onChange={() => this.props.handleChange('registerType','BOSS')}
                      >老板</RadioItem>
                    <WhiteSpace  />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </WingBlank>
        </Fragment>
    )
}
    handleRegister() {
      this.props.getRegister(this.props.state)
      console.log(this.props)
    }
}

export default Register