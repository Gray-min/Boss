import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqUsers } from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
class Laoban extends Component {
  componentDidMount () {
    this.props.userList({ type: 0 })
  }
  render () {
    const { userList } = this.props
    if (userList.length === 0)
      return (<div>暂无数据</div>)
    else
      return (
        <UserList userList={userList}></UserList>
      )
  }
}
export default connect(state => ({
  userList: state.userList
}), {
  reqUsers
})(Laoban)