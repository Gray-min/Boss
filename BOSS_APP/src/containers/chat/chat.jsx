import React, { Component } from 'react'
import { NavBar, List, InputItem, Icon } from 'antd-mobile'
import { connect } from 'react-redux'

import './index.css'
import { sendMsg } from '../../redux/actions'
const Item = List.Item;
class Chat extends Component {
  state = {
    msg: ''
  }
  componentDidMount () {
    console.log(this.props.match.params.userid)
  }
  handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const msg = this.state.msg
    this.props.sendMsg({ from, to, msg })
    this.setState({ msg: '' })
  }
  render () {
    const { msg } = this.state
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    const meId = user._id
    const targetId = this.props.match.params.userid
    if (!users[meId]) {
      return null
    }

    //取头像
    const header = users[targetId].header ? require(`../../assets/images/headers/${users[targetId].header}.png`) : null
    //取相关数据

    const chat_id = [meId, targetId].sort().join('_')
    const valuedMsg = chatMsgs.filter(chat => chat.chat_id === chat_id)
    return (
      <div id='chat-page'>
        <NavBar icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}>{this.props.match.params.userName}</NavBar>
        <List>
          {
            valuedMsg.map(msg => {
              if (msg.from === meId) {
                return <Item key={msg._id} extra='我' className="chat-me">{msg.msg}</Item>
              }
              else {
                return <Item key={msg._id} thumb={header}>{msg.msg}</Item>
              }
            })
          }
        </List>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <InputItem onChange={(val) => this.setState({ msg: val })} value={msg} extra={<span onClick={this.handleSend} >发送</span>}></InputItem>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user, chat: state.chat }),
  {
    sendMsg
  }
)(Chat)