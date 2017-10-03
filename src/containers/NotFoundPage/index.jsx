// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Container from '../../components/Container'
import { Layout, LayoutItem } from '../../components/Layout'

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
      <Layout direction="center">
        <LayoutItem cols="3/4@tablet">
          <div className="u-padding-vertical-xlg u-text-center s-body">
            <h1 className="u-h1">Uh-oh!</h1>
            <p>The page you are looking for doesn&#39;t exist ...</p>
            <p>You can browse your <Link to="/">local producers</Link>, find out more <Link to="/about-the-app">about the app</Link> or register your interest on our <Link to="/signup">signup page</Link></p>
          </div>
        </LayoutItem>
      </Layout>
    </Container>
  </div>
)

export default NotFoundPage
