// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_NAME, APP_URL, SHARE_HASHTAGS, TWITTER_HANDLE } from '../config'

import Button from './Button'
import Container from './Container'
import GoogleMap from './GoogleMap'
import Lightbox from './Lightbox'

import styles from '../styles/6-components/_components.producer.scss'

type Props = {
  fetchData: Function,
  fetchInstagramFeed: Function,
  hasErrored: boolean,
  isLoading: boolean,
  producerId: string,
  producer: Object,
  resetProducerState: Function,
}

class Producer extends React.Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.instagramFeedIsLoading = false
  }

  componentDidMount() {
    this.props.fetchData(this.props.producerId)
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      producer,
      fetchInstagramFeed,
    } = nextProps

    if (producer && producer.social_handles.instagram) {
      if (!this.instagramFeedIsLoading) {
        this.instagramFeedIsLoading = true
        fetchInstagramFeed(producer.social_handles.instagram)
      }
    }
  }

  componentWillUnmount() {
    this.props.resetProducerState()
  }

  props: Props
  instagramFeedIsLoading: boolean
  renderHelmetMeta: Function

  renderHelmetMeta() {
    const { producer } = this.props
    return (
      <Helmet
        title={`${APP_NAME}: ${producer.title}`}
        meta={[
          { property: 'title', content: `${APP_NAME}: ${producer.title}` },
          { name: 'description', content: producer.description },
          { property: 'og:title', content: `${APP_NAME}: ${producer.title}` },
          { property: 'og:description', content: producer.description },
          { property: 'og:type', content: 'profile' },
          { property: 'twitter:card', content: 'summary' },
          { property: 'twitter:site', content: `@${TWITTER_HANDLE}` },
          { property: 'twitter:title', content: producer.title },
          { property: 'twitter:description', content: producer.description },
        ]}
      />
    )
  }

  render() {
    const { producer, isLoading, hasErrored } = this.props

    if (hasErrored) {
      return <p>There was an error loading the producer</p>
    }

    if (!producer || isLoading) {
      return <p>Loading producer ...</p>
    }

    const categories = producer.categories.map((category, i) => (
      <span key={category._id}>
        <span>{category.title}</span>
        {i + 1 === producer.categories.length ? null : ', '}
      </span>
    ))

    return (
      <div className={styles.root}>
        {this.renderHelmetMeta()}
        <Container>
          <div className="u-margin-bottom-lg">
            <h1 className={`${styles.title} u-h1`}>{producer.title}</h1>
            <p>{categories}</p>
            <Button>Share</Button>
            <Lightbox isVisible toggleVisibility={() => { }} className="testingMcGee">
              <h3 className="u-h3">Share {producer.title} with your friends</h3>
              <a
                target="_blank"
                href={`https://facebook.com/sharer/sharer.php?u=${APP_URL}/producer/${producer.user_id}`}
              >
                Share on Facebook
              </a><br />
              <a
                target="_blank"
                href={`https://twitter.com/intent/tweet/?url=${APP_URL}/producer/${producer.user_id}&text=${producer.title}&hashtags=${SHARE_HASHTAGS}&via=${TWITTER_HANDLE}`}
              >
                Share on Twitter
              </a>
            </Lightbox>
            <p>{producer.description}</p>
            {producer.website ? (<p>{producer.website}</p>) : null}
            {producer.contact_email ? (<p>{producer.contact_email}</p>) : null}
            {producer.contact_telephone ? (<p>{producer.contact_telephone}</p>) : null}
          </div>
        </Container>
        <div className="u-margin-bottom-lg">
          <GoogleMap
            longitude={producer.location.coordinates[0]}
            latitude={producer.location.coordinates[1]}
            zoom={15}
          />
        </div>
      </div>
    )
  }
}

export default Producer
