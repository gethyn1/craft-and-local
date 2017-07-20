// @flow

import React from 'react'

import GoogleMap from './GoogleMap'

type Props = {
  producerId: string,
  producer: Object,
  fetchData: Function,
}

class Producer extends React.Component {
  static defaultProps: Object

  componentDidMount() {
    this.props.fetchData(this.props.producerId)
  }

  props: Props

  render() {
    const { producer } = this.props

    return (
      <div>
        <h1>{producer.title}</h1>
        <GoogleMap longitude={producer.latLng.lng} latitude={producer.latLng.lat} zoom={15} />
        <p>{producer.description}</p>
      </div>
    )
  }
}

Producer.defaultProps = {
  producer: {
    title: '',
    description: '',
    latLng: {
      lat: 0,
      lng: 0,
    },
  },
}

export default Producer
