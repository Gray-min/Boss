import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_CHAT_MSG_LIST, RECEIVE_MSG, READ_MSG } from './action-types'
import { getRedirectTo } from '../utils'

const initUser = {
  //用户名
  userName: '',
  //用户类型
  type: '',
  //信息
  msg: '',
  //重定向
  redirectTo: ''
}

function user (state = initUser, actions) {
  switch (actions.type) {
    case AUTH_SUCCESS:
      return { ...actions.data, redirectTo: getRedirectTo(actions.data) }
    case ERROR_MSG:
      return { ...state, msg: actions.data }
    case RECEIVE_USER:
      return actions.data
    case RESET_USER:
      return { ...initUser, msg: actions.data }
    default:
      return state
  }
}

const initUserList = []
function userList (state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}
function chat (state = initChat, action) {
  switch (action.type) {
    case RECEIVE_CHAT_MSG_LIST:
      const { users, chatMsgs, userid } = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((perTotal, chat) => perTotal + (chat.read === 'false' && chat.to === userid ? 1 : 0), 0)
      }
    case RECEIVE_MSG:
      const { msg } = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, action.data.msg],
        unReadCount: state.unReadCount + (msg.read === 'false' && msg.to === action.data.userid ? 1 : 0)
      }
    case READ_MSG:
      const { from, to, count } = action.data
      // console.log(from, to, count)
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if (msg.from === from && msg.to === to && msg.read === 'false')
            return { ...msg, read: true }
          else
            return msg
        }),
        unReadCount: state.unReadCount - count
      }
    default:
      return state
  }
}
export default combineReducers({ user, userList, chat })