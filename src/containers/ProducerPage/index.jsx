// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import ProducerGoogleMap from './ProducerGoogleMap'
import ProducerInstagramFeed from './ProducerInstagramFeed'
import SingleProducer from './SingleProducer'

const title = 'Producer page'

const ProducerPage = () => (
  <div>
    <Helmet
      title={`${APP_NAME}: ${title}`}
      meta={[
        { name: 'description', content: 'Local producer' },
        { property: 'og:title', content: `${APP_NAME}: ${title}` },
      ]}
    />
    <div>
      <SingleProducer />
    </div>
    <ProducerInstagramFeed />
    <div id="producer-map" style={{ height: '400px' }}>
      <ProducerGoogleMap />
    </div>
  </div>
)

export default ProducerPage
