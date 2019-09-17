import React, { Component } from 'react'
import { getUserList } from '../../store/chatuser/chatuser'
import { connect } from 'react-redux'
import UserCard from '../usercard/usercard'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Staff extends Component {

  componentDidMount() {
    this.props.getUserList('BOSS')
  }
  render() {
    return <UserCard userList={this.props.userList}></UserCard>
  }
}

export default Staff