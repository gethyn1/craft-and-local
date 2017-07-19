// @flow

import React from 'react'

type Props = {
  producerId: string,
  producer: Object,
  fetchData: Function,
}

class Producer extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.producerId)
  }

  props: Props

  render() {
    const { producer } = this.props

    return (
      <div>
        <h1>{producer.title}</h1>
        <p>{producer.description}</p>
      </div>
    )
  }
}

export default Producer
