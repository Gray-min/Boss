import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'
class Personal extends Component {
  handleLogout = () => {
    return Modal.alert('退出', '确认退出吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          Cookies.remove('userid')
          this.props.resetUser()
        }
      },
    ])
  }
  render () {
    const { user } = this.props

    return (
      <div style={{ marginTop: '45px', marginBottom: '50px' }}>
        <Result
          imgUrl={require(`../../assets/images/headers/${user.header}.png`)}
          title={user.userName}
          message={user.company}
        />
        <List renderHeader={() => '相关信息'}>
          <List.Item multipleLine>
            <List.Item.Brief>
              职位：{user.post}
            </List.Item.Brief>
            <List.Item.Brief>
              简介：{user.info}
            </List.Item.Brief>
            {
              user.salary ?
                <List.Item.Brief>
                  薪水：{user.salary}
                </List.Item.Brief> : null
            }
          </List.Item>
        </List>
        <WhiteSpace />
        <Button type="warning" onClick={this.handleLogout}>退出登陆</Button>
      </div>
    )
  }
}
export default connect(state => ({
  user: state.user
}), {
  resetUser
})(Personal)