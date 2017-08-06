// @flow

import React from 'react'

import Button from './Button'
import Container from './Container'
import GoogleMap from './GoogleMap'
import InstagramFeed from './InstagramFeed'

import styles from '../styles/6-components/_components.producer.scss'

type Props = {
  fetchData: Function,
  fetchInstagramFeed: Function,
  instagramFeed: Array<Object>,
  instagramFeedHasErrored: boolean,
  instagramFeedIsLoading: boolean,
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
  renderInstagramFeed: Function

  renderInstagramFeed() {
    const { instagramFeedHasErrored, instagramFeedIsLoading, instagramFeed, producer } = this.props

    if (instagramFeedIsLoading) {
      return <p>Loading Instagram feed ...</p>
    }

    if (instagramFeedHasErrored) {
      return <p>Error loading Instagram feed</p>
    }

    if (instagramFeed) {
      return (
        <div>
          <h2 className="u-h3">{producer.title} on Instagram</h2>
          <InstagramFeed items={instagramFeed} />
        </div>
      )
    }

    return null
  }

  render() {
    const { producer } = this.props

    if (!producer) {
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
        <Container>
          <div className="u-margin-bottom-lg">
            <h1 className={`${styles.title} u-h1`}>{producer.title}</h1>
            <p>{categories}</p>
            <Button>Share</Button>
            <p>{producer.description}</p>
          </div>
        </Container>
        <div className="u-margin-bottom-lg">
          <GoogleMap
            longitude={producer.location.coordinates[0]}
            latitude={producer.location.coordinates[1]}
            zoom={15}
          />
        </div>
        <Container>
          {this.renderInstagramFeed()}
        </Container>
      </div>
    )
  }
}

export default Producer
