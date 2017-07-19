// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import AllProducers from '../../containers/AllProducers'
import Categories from '../../containers/Categories'
import CurrentLocation from '../../containers/CurrentLocation'

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
    <CurrentLocation />
    <Categories />
    <AllProducers />
  </div>
)

export default HomePage
