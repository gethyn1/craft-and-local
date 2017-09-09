// @flow

import React from 'react'

import Button from './Button'
import { Layout, LayoutItem } from './Layout'
import ProducerCard from './ProducerCard'

type Props = {
  category: ?string,
  producers: ?Array<Object>,
  fetchData: Function,
  hasErrored: boolean,
  isLoading: boolean,
  lat: number,
  lng: number,
  loadCount: number,
  loadMore: Function,
}

class ProducersList extends React.Component {
  constructor(props: Props) {
    super(props)

    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  componentDidMount() {
    const { lat, lng } = this.props

    if (lat && lng) {
      this.props.fetchData({ lat, lng })
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { lat, lng } = nextProps

    if (lat !== this.props.lat && lng !== this.props.lng) {
      this.props.fetchData({ lat, lng })
    }
  }

  props: Props

  handleLoadMore() {
    const { category, lat, lng, loadCount, producers } = this.props

    if (producers) {
      this.props.loadMore(
        { lat, lng },
        producers.slice(Math.max(producers.length - loadCount, 0)),
        category,
      )
    }
  }

  handleLoadMore: Function

  renderProducers() {
    const { producers } = this.props

    if (producers && producers.length) {
      const renderProducers = producers.map(producer => (
        <LayoutItem key={producer._id} cols="1/3@tablet" className="u-margin-bottom">
          <ProducerCard producer={producer} {...this.props} />
        </LayoutItem>
      ))

      return (
        <div>
          <Layout>
            {renderProducers}
          </Layout>
          {this.renderStatus()}
          <Button onClick={this.handleLoadMore}>Load more</Button>
        </div>
      )
    }

    return null
  }

  renderStatus() {
    const { producers, isLoading, hasErrored } = this.props

    if (!producers) {
      return <p>Please wait ...</p>
    }

    if (hasErrored) {
      return <p>There was an error getting producers</p>
    }

    if (isLoading) {
      return <p>Loading producers ...</p>
    }

    if (producers && !producers.length) {
      return <p>Sorry, there are no producers for that category</p>
    }

    return null
  }

  renderProducers: Function
  renderStatus: Function

  render() {
    return (
      <div>
        {this.renderProducers()}
        {this.renderStatus()}
      </div>
    )
  }
}

export default ProducersList
