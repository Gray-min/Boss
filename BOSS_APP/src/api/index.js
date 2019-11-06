import ajax from './ajax'

//注册
export const reqRegister = (user) => ajax('/register', user, 'POST')
//登陆
export const reqLogin = ({ userName, passWord }) => ajax('/login', { userName, passWord }, 'POST')
//完善信息
export const reqUpdateInfo = (user) => ajax('/updateInfo', user, 'POST')
//cookie请求自动登陆
export const reqUser = () => ajax('/user', 'get')