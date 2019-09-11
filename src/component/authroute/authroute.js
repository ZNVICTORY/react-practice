import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends Component {

  componentDidMount() {
    axios.get('/user/info').then(res => {
      // console.log(res.data)
      const data = res.data
      if (data.code === 0 && data.success) {
        // 说明有登录信息
      } else {
        console.log(this.props)
        this.props.history.push('/login')
      }
    }).catch(err => {
      console.log(err)
    }) 
  }

  render(){
    return null
  }
}

export default AuthRoute

