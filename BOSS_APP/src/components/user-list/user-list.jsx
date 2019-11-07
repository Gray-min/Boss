import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd-mobile'

export default class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render () {
    const { userList } = this.props
    return (
      <div style={{ marginTop: '45px', marginBottom: '50px' }}>
        {userList.map((user) => (
          <div key={user._id}>
            <Card>
              {user.header ? <Card.Header
                // title={user.userName}
                thumb={require(`../../assets/images/headers/${user.header}.png`)}
                extra={user.userName}
              /> : <Card.Header
                  // title={user.userName}
                  thumb={require(`../../assets/images/headers/头像1.png`)}
                  extra={user.userName}
                />}

              <Card.Body>
                <div>职位：{user.post}</div>
                {user.company ? <div>公司：{user.company}</div> : null}
                {user.salary ? <div>薪水：{user.salary}</div> : null}
                <div>描述：{user.info}</div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    )
  }
}