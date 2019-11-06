import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, Button, NavBar, TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import { updateInfo } from '../../redux/actions'
class DashenInfo extends Component {
  state = {
    header: ''
  }
  handelSelector = (header) => {
    this.setState({ header })
  }
  handelSave = () => {
    this.props.form.validateFields((error, value) => {
      const user = { ...value, ...this.state }
      this.props.updateInfo(user)
      // console.log(error, user);
    });
  }
  render () {
    const { getFieldProps } = this.props.form
    let { user } = this.props
    if (user.header)
      return <Redirect to='/laoban' />
    return (<div>
      <NavBar>大神信息完善</NavBar>
      <HeaderSelector handelSelector={this.handelSelector} />
      <List>
        <InputItem
          {...getFieldProps('post')}
          clear
        >求职岗位</InputItem>

        <TextareaItem
          {...getFieldProps('info')}
          clear
          title="个人介绍"
          autoHeight
          rows="2"
        />
      </List>
      <Button type="primary" onClick={this.handelSave}>保存</Button>
    </div>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  { updateInfo }
)(createForm()(DashenInfo))