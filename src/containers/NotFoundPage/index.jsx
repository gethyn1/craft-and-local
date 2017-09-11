// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import Container from '../../components/Container'

const title = 'Page not found'

const NotFoundPage = () => (
  <div>
    <Helmet
      title={`${APP_NAME}: ${title}`}
      meta={[
        { name: 'description', content: 'Local producers and market traders' },
        { property: 'og:title', content: `${APP_NAME}: ${title}` },
        { name: 'robots', content: 'noindex' },
      ]}
    />
    <Container>
      <p>Sorry, the page you are looking for doesn&apos;t exist.</p>
    </Container>
  </div>
)

export default NotFoundPage
