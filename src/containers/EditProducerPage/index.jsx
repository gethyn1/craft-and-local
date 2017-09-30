// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import EditProducer from './EditProducer'
import Container from '../../components/Container'

const title = 'Edit producer'

const EditProducerPage = () => (
  <div>
    <Helmet
      title={`${APP_NAME}: ${title}`}
      meta={[
        { property: 'title', content: `${APP_NAME}: ${title}` },
        { name: 'robots', content: 'noindex' },
      ]}
    />
    <Container>
      <p>Edit producer page</p>
      <EditProducer />
    </Container>
  </div>
)

export default EditProducerPage
