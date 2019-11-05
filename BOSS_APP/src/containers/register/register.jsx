import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button, Radio, WingBlank, NavBar } from 'antd-mobile';
import ListItem from 'antd-mobile/lib/list/ListItem';

import { createForm, formShape } from 'rc-form';
// import PropTypes from 'prop-types'
import Logo from '../../components/logo/logo'
import '../register/register.css'

class Register extends Component {
  static propTypes = {
    form: formShape,
  };
  state = {
    type: true
  }
  handelRegister = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
  onChange = () => {
    const { type } = this.state
    console.log(type);
    this.setState({
      type: !type
    });
  };
  render () {
    const { getFieldProps } = this.props.form;
    const { type } = this.state
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
              {...getFieldProps('password')}
              placeholder="Password"
              type="password"
            >密码：</InputItem>
            <InputItem
              {...getFieldProps('confirmpassword')}
              placeholder="confirmpassword"
              type="password"
            >确认密码：</InputItem>
            <ListItem>
              用户类型:
            <Radio className="my-radio" checked={type === true} onChange={this.onChange}>大神</Radio>
              <Radio className="my-radio" checked={type === false} onChange={this.onChange}>老板</Radio>
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
export default createForm()(Register);