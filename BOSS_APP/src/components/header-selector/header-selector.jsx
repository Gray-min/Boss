import React, { Component } from 'react'
// import '../../assets/images/headers'
import { Grid } from 'antd-mobile';
import PropTypes from 'prop-types'
export default class HeaderSelector extends Component {
  state = {
    header: ''
  }
  static propTypes = {
    handelSelector: PropTypes.func.isRequired
  }
  handelSelector = (el) => {
    this.setState({
      header: el.icon
    })
    this.props.handelSelector(el.text)
  }
  render () {
    const iconData = []
    for (let i = 1; i < 21; i++) {
      const icon = require(`../../assets/images/headers/头像${i}.png`)
      const text = `头像${i}`
      iconData.push({ icon, text })
    }
    let { header } = this.state
    if (!header)
      header = '请选择头像'
    else
      header = <div> 已选择头像<img src={header} alt="头像" /></div>
    return (
      <div>
        <div style={{ "color": "#888", "fontSize": "14px", "padding": "15px 0 9px 15px" }}>
          {header}
        </div>
        <Grid data={iconData} columnNum={5} activeStyle={false} onClick={this.handelSelector} />
      </div>
    )
  }
}