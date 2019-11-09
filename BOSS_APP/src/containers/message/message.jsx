import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
/*
对chatMsgs按chat_id进行分组, 并得到每个组的lastMsg组成的数组
1. 找出每个聊天的lastMsg, 并用一个对象容器来保存 {chat_id, lastMsg}
2. 得到所有lastMsg的数组
3. 对数组进行排序(按create_time降序)
 */

function getTime (time) {

  return new Date(time).getTime();
}
function getLastMsgs (userid, chatMsg) {

  const lastMsgObjs = {}
  chatMsg.forEach(chat => {
    // debugger
    if (chat.to === userid && chat.read === 'false')
      chat.unReadCount = 1
    else
      chat.unReadCount = 0
    const chatId = chat.chat_id
    const lastMsg = lastMsgObjs[chatId]
    if (!lastMsg) {
      lastMsgObjs[chatId] = chat
    }
    else {
      const unReadCount = lastMsg.unReadCount + chat.unReadCount
      if (getTime(chat.create_time) > getTime(lastMsg.create_time))
        lastMsgObjs[chatId] = chat
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  })
  const lastMsgs = Object.values(lastMsgObjs).sort((m1, m2) => getTime(m2.create_time) - getTime(m1.create_time))
  return lastMsgs
}

class Message extends Component {
  render () {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    // 对chatMsgs按chat_id进行分组
    const lastMsgs = getLastMsgs(user._id, chatMsgs)
    console.log(lastMsgs)
    return (

      <List style={{ marginBottom: 50, marginTop: 45 }}>
        {
          lastMsgs.map(msg => {
            const targetId = msg.to === user._id ? msg.from : msg.to
            const header = users[targetId].header
            return (
              <List.Item
                key={msg._id}
                thumb={require(`../../assets/images/headers/${header}.png`)}
                arrow='horizontal'
                extra={<Badge text={msg.unReadCount} />}
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {msg.msg}
                <List.Item.Brief>{users[targetId].userName}</List.Item.Brief>
              </List.Item>
            )
          })
        }
      </List>

    )
  }
}
export default connect(state => ({
  user: state.user,
  chat: state.chat
}), {

})(Message)