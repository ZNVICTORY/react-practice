import React, { Component } from 'react'

// 高阶组件 属性代理  
export default function imoocForm (Comp){
  return class WrapperComp extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key, val) {
      this.setState({
        [key]:val
      })
    }
    render() {
      return (
        <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
      )
    }
  }
}