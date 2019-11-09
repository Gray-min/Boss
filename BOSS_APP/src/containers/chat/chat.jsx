import React, { Component } from 'react'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'

import './index.css'
import { sendMsg } from '../../redux/actions'
const Item = List.Item;
class Chat extends Component {
  state = {
    msg: '',
    isShow: false
  }
  componentWillMount () {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂',
      '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺', '😚', '😙',
      '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
      '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤',
      '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯',
      '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹', '😮', '😯', '😲',
      '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣',
      '😞', '😓', '😩', '😫', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠',
      '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻',
      '😼', '😽', '🙀', '😿', '😾', '💋', '👋', '🤚', '🖐', '✋', '🖖', '👌', '✌',
      '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝', '👍', '👎', '✊', '👊',
      '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍', '💅', '🤳', '💪', '🦵',
      '🦶', '👂', '👃', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '👶', '🧒', '👦',
      '👧', '🧑', '👱', '👨', '🧔', '👨‍🦰', '👨‍🦱', '👨‍🦳', '👨‍🦲', '👩', '👩‍🦰', '👩‍🦱', '👩‍🦳',
      '👩‍🦲', '👱‍♀️', '👱‍♂️', '🧓', '👴', '👵', '🙍', '🙍‍♂️', '🙍‍♀️', '🙎', '🙎‍♂️', '🙎‍♀️', '🙅', '🙅‍♂️',
      '🙅‍♀️', '🙆', '🙆‍♂️', '🙆‍♀️', '💁', '💁‍♂️', '💁‍♀️', '🙋', '🙋‍♂️', '🙋‍♀️', '🙇', '🙇‍♂️', '🙇‍♀️', '🤦',
      '🤦‍♂️', '🤦‍♀️', '🤷', '🤷‍♂️', '🤷‍♀️', '👨‍⚕️', '👩‍⚕️', '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '👨‍⚖️', '👩‍⚖️', '👨‍🌾',
      '👩‍🌾', '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍🏭', '👩‍🏭', '👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻', '👨‍🎤',
      '👩‍🎤', '👨‍🎨', '👩‍🎨', '👨‍✈️', '👩‍✈️', '👨‍🚀', '👩‍🚀', '👨‍🚒', '👩‍🚒', '👮', '👮‍♂️', '👮‍♀️', '🕵', '🕵️‍♂️',
      '🕵️‍♀️', '💂', '💂‍♂️', '💂‍♀️', '👷', '👷‍♂️', '👷‍♀️', '🤴', '👸', '👳', '👳‍♂️', '👳‍♀️', '👲', '🧕',
      '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🦸', '🦸‍♂️', '🦸‍♀️', '🦹', '🦹‍♂️', '🦹‍♀️', '🧙',
      '🧙‍♂️', '🧙‍♀️', '🧚', '🧚‍♂️', '🧚‍♀️', '🧛', '🧛‍♂️', '🧛‍♀️', '🧜', '🧜‍♂️', '🧜‍♀️', '🧝', '🧝‍♂️', '🧝‍♀️',
      '🧞', '🧞‍♂️', '🧞‍♀️', '🧟', '🧟‍♂️', '🧟‍♀️', '💆', '💆‍♂️', '💆‍♀️', '💇', '💇‍♂️', '💇‍♀️', '🚶', '🚶‍♂️',
      '🚶‍♀️', '🏃', '🏃‍♂️', '🏃‍♀️', '💃', '🕺', '🕴', '👯', '👯‍♂️', '👯‍♀️', '🧖', '🧖‍♂️', '🧖‍♀️', '🧘',
      '👭', '👫', '👬', '💏', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👩', '💑', '👨‍❤️‍👨', '👩‍❤️‍👩', '👪', '👨‍👩‍👦', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦',
      '👨‍👩‍👧‍👧', '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧', '👨‍👦', '👨‍👦‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👧‍👧', '👩‍👦', '👩‍👦‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👧‍👧', '🗣', '👤', '👥', '👣', '🧳', '🌂', '☂', '🧵', '🧶', '👓', '🕶', '🥽', '🥼', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '👙', '👚', '👛', '👜', '👝', '🎒', '👞', '👟', '🥾', '🥿', '👠', '👡', '👢', '👑', '👒', '🎩', '🎓', '🧢', '⛑', '💄', '💍', '💼']
    this.emojis = emojis.map(emoji => ({ text: emoji }))
  }
  componentDidMount () {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)

  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const msg = this.state.msg
    this.props.sendMsg({ from, to, msg })
    this.setState({ msg: '', isShow: false })
  }
  toggleEmoji = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
    if (isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
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
          style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}
          onLeftClick={() => this.props.history.goBack()}>{users[targetId].userName}</NavBar>
        <List style={{ marginTop: 50, marginBottom: 50 }}>
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
          <InputItem onChange={(val) => this.setState({ msg: val })}
            onFocus={() => this.setState({ isShow: false })}
            value={msg}
            extra={
              <span>
                <span onClick={this.toggleEmoji} role='img' aria-label='emoji'>😀</span>
                <span onClick={this.handleSend} >发送</span>
              </span>
            }></InputItem>
          {
            this.state.isShow ? (<Grid
              data={this.emojis}
              columnNum={8}
              isCarousel
              carouselMaxRow={4}
              onClick={(item) => this.setState({ msg: this.state.msg + item.text })}
            >
            </Grid>) : null
          }

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