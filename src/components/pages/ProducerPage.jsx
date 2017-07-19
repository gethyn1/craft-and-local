// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import SingleProducer from '../../containers/SingleProducer'

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
    <SingleProducer />
  </div>
)

export default ProducerPage
