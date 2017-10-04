// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import { APP_NAME } from '../../config'

import Container from '../Container'
import ListInline from '../ListInline'

import styles from '../../styles/6-components/_components.footer.scss'

const date = new Date()
const year = date.getFullYear()

const Footer = () => (
  <footer className={styles.root}>
    <Container>
      <ListInline className={`${styles.nav} u-margin-bottom`}>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/signup">Signup</Link>
        </li>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/about-the-app">About the app</Link>
        </li>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/privacy-policy">Privacy policy</Link>
        </li>
      </ListInline>
      <p>&copy; {year} {APP_NAME}</p>
    </Container>
  </footer>
)

export default Footer
