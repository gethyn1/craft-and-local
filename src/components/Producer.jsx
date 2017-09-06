// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'

import { APP_NAME, APP_URL, SHARE_HASHTAGS, TWITTER_HANDLE, NOT_FOUND_ROUTE } from '../config'

import Button from './Button'
import Container from './Container'
import Lightbox from './Lightbox'
import ListBare from './ListBare'

import styles from '../styles/6-components/_components.producer.scss'

type Props = {
  fetchData: Function,
  fetchInstagramFeed: Function,
  hasErrored: boolean,
  isLoading: boolean,
  producerId: string,
  producer: Object,
  resetProducerState: Function,
  isSharing: boolean,
  toggleShareProfile: Function,
  notFound: boolean,
}

class Producer extends React.Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.instagramFeedIsLoading = false
    this.handleShareProfile = this.handleShareProfile.bind(this)
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
  handleShareProfile: Function

  handleShareProfile() {
    this.props.toggleShareProfile(!this.props.isSharing)
  }

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
    const { producer, isLoading, hasErrored, isSharing, notFound } = this.props

    if (notFound) {
      return <Redirect to={`/${NOT_FOUND_ROUTE}`} />
    }

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
            <Button onClick={this.handleShareProfile}>Share</Button>
            <Lightbox isVisible={isSharing} toggleVisibility={this.handleShareProfile}>
              <h3 className="u-h2">Share {producer.title} with your friends</h3>
              <ListBare className="u-margin-none">
                <li className="u-margin-bottom-sm">
                  <Button
                    level="facebook"
                    target="_blank"
                    href={`https://facebook.com/sharer/sharer.php?u=${APP_URL}/producer/${producer.user_id}`}
                    block
                  >
                    Share on Facebook
                  </Button>
                </li>
                <li>
                  <Button
                    level="twitter"
                    target="_blank"
                    href={`https://twitter.com/intent/tweet/?url=${APP_URL}/producer/${producer.user_id}&text=${producer.title}&hashtags=${SHARE_HASHTAGS}&via=${TWITTER_HANDLE}`}
                    block
                  >
                    Share on Twitter
                  </Button>
                </li>
              </ListBare>
            </Lightbox>
            <p>{producer.description}</p>
            {producer.website ? (<p>{producer.website}</p>) : null}
            {producer.contact_email ? (<p>{producer.contact_email}</p>) : null}
            {producer.contact_telephone ? (<p>{producer.contact_telephone}</p>) : null}
          </div>
        </Container>
      </div>
    )
  }
}

export default Producer
