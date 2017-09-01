// @flow

import React from 'react'

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
  renderInstagramFeed: Function

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
        <Container>
          <div className="u-margin-bottom-lg">
            <h1 className={`${styles.title} u-h1`}>{producer.title}</h1>
            <p>{categories}</p>
            <Button>Share</Button>
            <Lightbox isVisible toggleVisibility={() => { }} className="testingMcGee">
              <h2>test</h2>
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
