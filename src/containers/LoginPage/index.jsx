// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import UserLogin from './UserLogin'

import Container from '../../components/Container'

const title = 'Login'

const LoginPage = () => (
  <div>
    <Helmet
      title={`${APP_NAME}: ${title}`}
      meta={[
        { property: 'title', content: `${APP_NAME}: ${title}` },
        { name: 'robots', content: 'noindex' },
      ]}
    />
    <Container>
      <UserLogin />
    </Container>
  </div>
)

export default LoginPage
