// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import UserLogout from '../../containers/session/UserLogout'

import Container from '../Container'
import ListInline from '../ListInline'

import styles from '../../styles/6-components/_components.top-bar.scss'

type Props = {
  isLoggedIn: boolean,
  isAdmin: boolean,
  user: string,
}

const TopBar = ({ isLoggedIn, isAdmin, user }: Props) => {
  let adminNav = null

  if (isAdmin) {
    adminNav = (
      <ListInline className={styles['admin-nav']}>
        <li className={styles['admin-nav__item']}>
          <Link className={styles['admin-nav__link']} to="/producer/create">New producer</Link>
        </li>
      </ListInline>
    )
  }

  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.branding}>
            <Link to="/" className={styles.logo}>craft <span className={styles.logo__amp}>&amp;</span> local</Link>
          </div>
          <div className="u-margin-right">
            {adminNav}
          </div>
          <div className={styles['user-nav']}>
            {isLoggedIn ? (
              <span className="u-margin-right">Logged in as <span className={styles['user-name']}>{user}</span></span>
            ) : (
              <div className={styles.login}>
                <Link className={styles.login__link} to="/about-the-app">About the app</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link className={styles.login__link} to="/signup">Signup</Link>
              </div>
            )}
            <UserLogout />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TopBar
