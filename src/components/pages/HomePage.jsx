// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import AllProducers from '../../containers/AllProducers'
import Categories from '../../containers/Categories'
import CurrentLocation from '../../containers/CurrentLocation'

import Container from '../Container'

const title = 'Home'

const HomePage = () => (
  <div>
    <Helmet
      title={`${APP_NAME}: ${title}`}
      meta={[
        { name: 'description', content: 'Local producers and market traders' },
        { property: 'og:title', content: `${APP_NAME}: ${title}` },
      ]}
    />
    <div className="u-margin-bottom">
      <CurrentLocation />
    </div>
    <Container>
      <Categories />
      <AllProducers />
    </Container>
  </div>
)

export default HomePage
