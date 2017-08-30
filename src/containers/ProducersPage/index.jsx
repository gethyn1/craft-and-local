// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import AllProducers from './AllProducers'
import Categories from './Categories'
import CurrentLocation from '../CurrentLocation'

import Container from '../../components/Container'

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
