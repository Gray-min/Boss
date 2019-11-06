import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button, NavBar } from 'antd-mobile'
import { createForm, formShape } from 'rc-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import PropTypes from 'prop-types'
import Logo from '../../components/logo/logo'
import { login } from '../../redux/actions'
class Login extends Component {
  static propTypes = {
    form: formShape,
  };
  handelLogin = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      this.props.login(value)
    });
  }
  render () {
    const { getFieldProps } = this.props.form;
    let { redirectTo } = this.props.user
    if (redirectTo)
      return <Redirect to={redirectTo} />
    return (
      <div>
        <NavBar>直聘</NavBar>
        <Logo />
        <List >
          <InputItem
            {...getFieldProps('userName')}
            placeholder="userName"
          >用户名：</InputItem>
          <InputItem
            {...getFieldProps('passWord')}
            placeholder="passWord"
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
export default connect(state => ({ user: state.user }), { login })(createForm()(Login));