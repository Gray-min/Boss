import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button, NavBar } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
// import PropTypes from 'prop-types'
import Logo from '../../components/logo/logo'
class Login extends Component {
  static propTypes = {
    form: formShape,
  };
  handelLogin = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
  render () {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <NavBar>直聘</NavBar>
        <Logo />
        <List >
          <InputItem
            {...getFieldProps('userName')}
            placeholder="controled input"
          >用户名：</InputItem>
          <InputItem
            {...getFieldProps('password')}
            placeholder="controled input"
            type="password"
          >密码：</InputItem>
          <WhiteSpace size="sm" />
          <Button type="primary" onClick={this.handelLogin}> 登陆</Button>
          <WhiteSpace size="sm" />
          <Button onClick={() => this.props.history.replace("/register")}>还没有账户</Button>
        </List>
      </div>
    )
  }
}
export default createForm()(Login);