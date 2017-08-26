import React from 'react'
import { shallow } from 'enzyme'

import TopBar from '../components/TopBar'

import styles from '../styles/6-components/_components.top-bar.scss'

describe('<TopBar />', () => {
  let props
  let mountedTopBar

  const topBar = () => {
    if (!mountedTopBar) {
      mountedTopBar = shallow(
        <TopBar {...props} />,
      )
    }

    return mountedTopBar
  }

  beforeEach(() => {
    props = {
      isLoggedIn: false,
      isAdmin: false,
      user: undefined,
    }

    mountedTopBar = undefined
  })

  it('should display the user email address if user is logged in', () => {
    props.isLoggedIn = true
    props.user = 'test@test.com'
    const userName = topBar().find(`.${styles['user-name']}`).first()
    expect(userName.text()).toEqual('test@test.com')
  })

  it('should display admin navigation for admin users', () => {
    props.isAdmin = true
    const adminNav = topBar().find(`.${styles['admin-nav']}`)
    expect(adminNav.length).toBe(1)
  })
})
