import React, { Component } from 'react'

import logo from './logo512.png'
import '../logo/logo.css'
export default class Logo extends Component {
  render () {
    return (
      <div className="img">
        <div><img src={logo} style={{ width: "200px", height: "200px" }} alt="logo"></img></div>

      </div>
    )
  }
}