import React, { Component, Fragment } from 'react'
import LogoImg from './job.png'
import './logo.css'

class Logo extends Component {
  render() {
    return (
      <Fragment> 
        <div className="logo-container">
          <img src={LogoImg} alt="" />
        </div>
      </Fragment>
    )
  }
}
export default Logo