import React, { Component ,Fragment } from 'react'
import { Card, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    console.log('user123', this.props.userList)
    return(
      <Fragment>
        <WingBlank>
          {
            this.props.userList.map(v=> (
              v.avatar? <Card 
                          key={v._id}
                          onClick={() => this.handleClick(v)}>
                <Card.Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                  ></Card.Header>
                  <Card.Body>
                    {v.registerType === 'BOSS' ? <div>公司:{v.company}</div> : null}
                    {v.desc.split('\n').map(v => (
                      <div key={v}>{v}</div>
                    ))}
                    {v.registerType === 'BOSS' ? <div>薪资:{v.money}</div> : null}
                  </Card.Body>
              </Card> : null
            ))
          }
        </WingBlank>
      </Fragment>
    )
  }
}
export default UserCard