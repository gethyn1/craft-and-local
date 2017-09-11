// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME } from '../../config'

import CreateProducer from './CreateProducer'

import Container from '../../components/Container'

const title = 'Create producer'

const CreateProducerPage = () => (
  <div>
    <Helmet
      title={`${APP_NAME}: ${title}`}
      meta={[
        { property: 'title', content: `${APP_NAME}: ${title}` },
        { name: 'robots', content: 'noindex' },
      ]}
    />
    <Container>
      <p>New producer page</p>
      <CreateProducer />
    </Container>
  </div>
)

export default CreateProducerPage
