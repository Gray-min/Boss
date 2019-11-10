import ajax from './ajax'

//注册
export const reqRegister = (user) => ajax('/register', user, 'POST')
//登陆
export const reqLogin = ({ userName, passWord }) => ajax('/login', { userName, passWord }, 'POST')
//完善信息
export const reqUpdateInfo = (user) => ajax('/updateInfo', user, 'POST')
//cookie请求自动登陆
export const reqUser = () => ajax('/user')
//用户列表
export const reqUserList = (type) => ajax('/userlist', type, 'GET')
//获取聊天信息
export const reqChatMsgList = () => ajax('/msglist')
//用户读取信息
export const reqReadMsg = (from) => ajax('/readmsg', from, 'POST')