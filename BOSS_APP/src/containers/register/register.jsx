import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button, Radio, WingBlank, NavBar } from 'antd-mobile'
import ListItem from 'antd-mobile/lib/list/ListItem'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createForm, formShape } from 'rc-form'
// import PropTypes from 'prop-types'
import Logo from '../../components/logo/logo'
import '../register/register.css'
import { register } from '../../redux/actions'

class Register extends Component {
  static propTypes = {
    form: formShape,
  };
  state = {
    type: 0
  }
  handelRegister = () => {
    this.props.form.validateFields((error, value) => {
      const user = { ...this.state, ...value }
      this.props.register(user)
    });
  }
  onChange = () => {
    let { type } = this.state
    if (type)
      type = 0
    else
      type = 1
    this.setState({
      type
    });
  };
  render () {
    const { getFieldProps } = this.props.form;
    const { type } = this.state
    let { redirectTo } = this.props.user
    if (redirectTo)
      return <Redirect to={redirectTo} />
    return (
      <div>
        <NavBar>直聘</NavBar>
        <Logo />
        <WingBlank>
          <List >
            <InputItem
              {...getFieldProps('userName')}
              placeholder="UserName"
            >用户名：</InputItem>
            <InputItem
              {...getFieldProps('passWord')}
              placeholder="Password"
              type="password"
            >密码：</InputItem>
            <InputItem
              {...getFieldProps('passWord2')}
              placeholder="confirmpassword"
              type="password"
            >确认密码：</InputItem>
            <ListItem>
              用户类型:
            <Radio className="my-radio" checked={type === 0} onChange={this.onChange} >大神</Radio>
              <Radio className="my-radio" checked={type === 1} onChange={this.onChange}>老板</Radio>
            </ListItem>

            <WhiteSpace size="sm" />
            <Button type="primary" onClick={this.handelRegister}> 注册</Button>
            <WhiteSpace size="sm" />
            <Button onClick={() => this.props.history.replace("/login")}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(state => ({ user: state.user }), { register })(createForm()(Register));