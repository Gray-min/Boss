import ajax from './ajax'

//注册
export const reqRegister = (user) => ajax('/register', user, 'POST')
//登陆
export const reqLogin = ({ userName, passWord }) => ajax('/login', { userName, passWord }, 'POST')