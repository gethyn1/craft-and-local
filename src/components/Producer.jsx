// @flow

import React from 'react'

import GoogleMap from './GoogleMap'
import InstagramFeed from './InstagramFeed'

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
    const { instagramFeedHasErrored, instagramFeedIsLoading, instagramFeed } = this.props

    if (instagramFeedIsLoading) {
      return <p>Loading Instagram feed ...</p>
    }

    if (instagramFeedHasErrored) {
      return <p>Error loading Instagram feed</p>
    }

    if (instagramFeed) {
      return <InstagramFeed items={instagramFeed} />
    }

    return null
  }

  render() {
    const { producer } = this.props

    if (!producer) {
      return <p>Loading producer ...</p>
    }

    return (
      <div>
        <h1>{producer.title}</h1>
        <GoogleMap
          longitude={producer.location.coordinates[0]}
          latitude={producer.location.coordinates[1]}
          zoom={15}
        />
        <p>{producer.description}</p>
        {this.renderInstagramFeed()}
      </div>
    )
  }
}

export default Producer
