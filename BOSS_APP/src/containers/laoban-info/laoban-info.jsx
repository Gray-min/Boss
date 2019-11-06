import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, Button, NavBar, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import { updateInfo } from '../../redux/actions'
class LaobanInfo extends Component {
  state = {
    header: ''
  }
  handelSelector = (header) => {
    this.setState({ header })
  }
  handelSave = () => {
    this.props.form.validateFields((error, value) => {
      // const { _id } = this.props.user
      // const user = { _id, ...value, ...this.state }
      this.props.updateInfo({ ...value, ...this.state })
      // console.log(error, user);
    });
  }
  render () {
    const { getFieldProps } = this.props.form
    let { user } = this.props
    if (user.header)
      return <Redirect to='/laoban' />
    return (<div>
      <NavBar>老板信息完善</NavBar>
      <HeaderSelector handelSelector={this.handelSelector} />
      <List>
        <InputItem
          {...getFieldProps('post')}
          clear
        >招聘职位</InputItem>
        <InputItem
          {...getFieldProps('company')}
          clear
        >公司名称</InputItem>
        <InputItem
          {...getFieldProps('salary')}
          clear
        >职位薪资</InputItem>
        <TextareaItem
          {...getFieldProps('info')}
          clear
          title="职位要求"
          autoHeight
          rows="3"
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
)(createForm()(LaobanInfo))