// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import Container from './Container'

import styles from '../styles/6-components/_components.top-bar.scss'

import { APP_NAME } from '../config'

const TopBar = () => (
  <div className={styles.root}>
    <Container>
      <h1 className={styles.branding}>
        <Link to="/" className={styles.logo}>{APP_NAME}</Link>
      </h1>
    </Container>
  </div>
)

export default TopBar
