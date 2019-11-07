import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render () {
    const navList = this.props.navList.filter(nav => nav.hide !== true)
    // const navList = this.props.navList.filter(nav => !nav.hide)
    const { pathname } = this.props.location
    return (
      <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
        <TabBar tabBarPosition="bottom">
          {navList.map((nav, index) =>
            <TabBar.Item
              key={nav.path}
              icon={{ uri: require('../../assets/images/nav/' + nav.icon + '.png') }}
              selectedIcon={{ uri: require(`../../assets/images/nav/${nav.icon}-selected.png`) }}
              title={nav.text}
              selected={pathname === nav.path}
              onPress={() => this.props.history.replace(nav.path)}
            >

            </TabBar.Item>)}
        </TabBar>
      </div>
    )
  }
}
export default withRouter(NavFooter)