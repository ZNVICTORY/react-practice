import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../store/user/user'


@withRouter
@connect(
  state => state.user,
  { loadData }
)
class AuthRoute extends Component {

  componentDidMount() {
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname) > -1) {
      return null
    }
      axios.get('/api/v1/user/info').then(res => {
      const data = res.data
      if(data.code === 0 && data.success) {
        // 有登录信息
        this.props.loadData(data)
      } else {
        this.props.history.push('/login')
      }
    })
}

  render(){
    return null
  }
}

export default AuthRoute

