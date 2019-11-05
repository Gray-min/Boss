import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG } from './action-types'

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
      return { ...actions.data, redirectTo: '/' }
    case ERROR_MSG:
      return { ...state, msg: actions.data }
    default:
      return state
  }
}

export default combineReducers({ user })