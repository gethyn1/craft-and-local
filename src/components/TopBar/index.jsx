// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import UserLogout from '../../containers/session/UserLogout'

import Container from '../Container'

import styles from '../../styles/6-components/_components.top-bar.scss'

import { APP_NAME } from '../../config'

type Props = {
  isLoggedIn: boolean,
  isAdmin: boolean,
  user: string,
}

const TopBar = ({ isLoggedIn, isAdmin, user }: Props) => {
  let adminNav = null

  if (isAdmin) {
    adminNav = (
      <ul className={styles['admin-nav']}>
        <li><Link to="/producer/create">New producer</Link></li>
      </ul>
    )
  }

  return (
    <div className={styles.root}>
      <Container>
        <h1 className={styles.branding}>
          <Link to="/" className={styles.logo}>{APP_NAME}</Link>
        </h1>
        {isLoggedIn ? (
          <p>Logged in as <span className={styles['user-name']}>{user}</span></p>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {adminNav}
        <UserLogout />
      </Container>
    </div>
  )
}

export default TopBar
