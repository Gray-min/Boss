import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
// import NavFooter from '../../components/nav-footer/nav-footer'

import { getRedirectTo } from '../../utils'
import { autoLogin } from '../../redux/actions'
class Main extends Component {
  navList = [{
    path: '/laoban',
    component: Laoban,
    title: '大神列表',
    icon: 'dashen',
    text: '大神',
  }, {
    path: '/dashen',
    component: Dashen,
    title: '老板列表',
    icon: 'laoban',
    text: '老板',
  }, {
    path: '/message',
    component: Message,
    title: '消息列表',
    icon: 'message',
    text: '消息',

  }, {
    path: '/personal',
    component: Personal,
    title: '用户中心',
    icon: 'personal',
    text: '个人',
  }
  ]

  componentDidMount () {
    const userid = Cookies.get('userid')
    const { _id } = this.props.user
    //对cookie存在，但尚未登陆的情况，进行服务端请求
    if (userid && !_id) {
      this.props.autoLogin()
    }
  }
  render () {
    const userid = Cookies.get('userid')
    //判断cookie是否存在，不存在重定向到login页面
    if (!userid)
      return <Redirect to='/login' />

    const { _id } = this.props.user

    //cookie存在，判断用户是否登陆，未登录不做处理
    // debugger
    if (!_id) {
      return null
    }
    //登陆判断是否请求的是根路径，如果是则计算跳转路径
    else {
      let path = this.props.location.pathname
      if (path === '/') {
        path = getRedirectTo(this.props.user)
        return <Redirect to={path} />
      }
    }
    const { user } = this.props
    if (!user._id)
      return <Redirect to='/login' />

    const currentNave = this.navList.find(nav => nav.path === this.props.location.pathname)

    if (user.type * 1 === 0) {
      this.navList[0].hide = true
    }
    else
      this.navList[1].hide = true

    return (
      <div>
        {currentNave ? <div style={{ position: 'fixed', top: 0, zIndex: 100, width: '100%' }}><NavBar>{currentNave.title}</NavBar></div> : null}
        <Switch>
          {this.navList.map((nav) => <Route key={nav.path} path={nav.path} component={nav.component}></Route>)}
          <Route path='/dasheninfo' component={DashenInfo}></Route>
          <Route path='/laobaninfo' component={LaobanInfo}></Route>
          <Route path='/chat/:userid' component={Chat}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        {currentNave ? <NavFooter navList={this.navList} unReadCount={this.props.unReadCount}></NavFooter> : null}
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user, unReadCount: state.chat.unReadCount }),
  { autoLogin }
)(Main)