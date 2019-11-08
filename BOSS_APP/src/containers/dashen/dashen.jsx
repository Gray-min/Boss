import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqUsers } from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
class Dashen extends Component {
  componentDidMount () {
    this.props.reqUsers({ type: 1 })
  }
  render () {
    const { userList } = this.props
    if (userList.length === 0)
      return (<div>暂无数据</div>)
    else
      return (
        <UserList userList={userList}></UserList>
      )
    // return 11
  }
}
export default connect(state => ({
  userList: state.userList
}), {
  reqUsers
})(Dashen)