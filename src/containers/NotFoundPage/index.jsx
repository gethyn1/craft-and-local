// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import Container from '../../components/Container'

const title = 'Page not found'

const NotFoundPage = () => (
  <div>
    <Helmet
      title={title}
      meta={[
        { property: 'title', content: title },
        { name: 'robots', content: 'noindex' },
      ]}
    />
    <Container>
      <p>Sorry, the page you are looking for doesn&apos;t exist.</p>
    </Container>
  </div>
)

export default NotFoundPage
