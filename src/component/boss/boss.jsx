import React, { Component } from 'react'
import { getUserList } from '../../store/chatuser/chatuser'
import { connect } from 'react-redux'
import UserCard from '../usercard/usercard'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends Component {

  componentDidMount() {
    console.log('1')
    this.props.getUserList('STAFF')
  }
  render() {
    return (<UserCard userList={this.props.userList}></UserCard>)
  }
}

export default Boss