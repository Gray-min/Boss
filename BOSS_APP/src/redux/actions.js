import { reqRegister, reqLogin, reqUpdateInfo, reqUser } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from './action-types'

//授权成功
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })

//错误信息处理
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })

//接收用户
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })

//重置用户
const resetUser = (msg) => ({ type: RESET_USER, data: msg })


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
    if (result.code === 0)
      dispatch(authSuccess({ userName, passWord, type }))
    else
      dispatch(errorMsg(result.msg))
  }
}

//异步登陆
export const login = (user) => {
  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0)
      dispatch(authSuccess(result.data))
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
    if (result.code === 0)
      dispatch(receiveUser(result.data))
    else
      dispatch(resetUser(result.msg))
  }
}