// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import UserLogin from '../../containers/UserLogin'

import Container from '../Container'

const title = 'Login'

const LoginPage = () => (
  <div>
    <Helmet
      title={`${APP_NAME}: ${title}`}
      meta={[
        { name: 'description', content: 'Local producers and market traders' },
        { property: 'og:title', content: `${APP_NAME}: ${title}` },
      ]}
    />
    <Container>
      <UserLogin />
    </Container>
  </div>
)

export default LoginPage
