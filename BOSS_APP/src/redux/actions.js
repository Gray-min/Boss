import { reqRegister, reqLogin, reqUpdateInfo, reqUser, reqUserList, reqChatMsgList } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_CHAT_MSG_LIST, RECEIVE_MSG } from './action-types'
import io from 'socket.io-client'

//授权成功
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })

//错误信息处理
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })

//接收用户
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })

//重置用户
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })

//接受用户列表
const receiveUserList = (users) => ({ type: RECEIVE_USER_LIST, data: users })

const receiveMsgList = ({ users, chatMsgs }) => ({ type: RECEIVE_CHAT_MSG_LIST, data: { users, chatMsgs } })

const receiveMsg = (msg) => ({ type: RECEIVE_MSG, data: msg })

function initIO (dispatch, userid) {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', data => {
      console.log('收到服务器消息', data)
      if (userid === data.from || userid === data.to)
        dispatch(receiveMsg(data))
    })
  }
}

async function getChatMsgs (dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if (result.code === 0) {
    const { users, chatMsgs } = result.data
    dispatch(receiveMsgList({ users, chatMsgs }))
  }
}
//异步注册
export const register = (user) => {
  const { userName, passWord, passWord2, type } = user
  if (userName)
    errorMsg('用户名不能为空')
  else if (passWord !== passWord2) {
    errorMsg('2次密码不同')
  }
  return async dispatch => {
    const response = await reqRegister({ userName, passWord, type })
    const result = response.data
    if (result.code === 0) {
      getChatMsgs(dispatch, result.data._id)
      dispatch(authSuccess({ userName, passWord, type }))
    }
    else
      dispatch(errorMsg(result.msg))
  }
}

//异步登陆
export const login = (user) => {
  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) {
      getChatMsgs(dispatch, result.data._id)
      dispatch(authSuccess(result.data))
    }
    else
      dispatch(errorMsg(result.msg))
  }
}

//完善信息
export const updateInfo = (user) => {
  return async dispatch => {
    const response = await reqUpdateInfo(user)
    const result = response.data
    if (result.code === 0)
      dispatch(receiveUser(result.data))
    else
      dispatch(resetUser(result.msg))
  }
}

//异步自动登陆
export const autoLogin = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      getChatMsgs(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    }
    else
      dispatch(resetUser(result.msg))
  }
}

//异步获取用户列表
export const reqUsers = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0)
      dispatch(receiveUserList(result.data))
    else
      dispatch(errorMsg(result.msg))
  }
}
//异步发送聊天消息
export const sendMsg = ({ from, to, msg }) => {
  return dispatch => {
    io.socket.emit('sendMsg', { from, to, msg })
  }
}