// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/6-components/_components.top-bar.scss'

import { APP_NAME } from '../config'

const TopBar = () => (
  <h1 className={styles.branding}>
    <Link to="/" className={styles.logo}>{APP_NAME}</Link>
  </h1>
)

export default TopBar
