// @flow

import React from 'react'

import Button from './Button'
import { Layout, LayoutItem } from './Layout'
import ProducerCard from './ProducerCard'

type Props = {
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
    const { lat, lng, loadCount, producers } = this.props

    if (producers) {
      this.props.loadMore(
        { lat, lng },
        producers.slice(Math.max(producers.length - loadCount, 0)),
      )
    }
  }

  handleLoadMore: Function

  render() {
    if (this.props.hasErrored) {
      return <p>There was an error getting producers</p>
    }

    if (this.props.isLoading || !this.props.producers) {
      return <p>Loading producers ...</p>
    }

    if (!this.props.producers.length) {
      return <p>Sorry, there are no producers for that category</p>
    }

    const producers = this.props.producers.map(producer => (
      <LayoutItem key={producer._id} cols="1/3@tablet" className="u-margin-bottom">
        <ProducerCard producer={producer} {...this.props} />
      </LayoutItem>
    ))

    return (
      <div>
        <Layout>
          {producers}
        </Layout>
        <Button onClick={this.handleLoadMore}>Load more</Button>
      </div>
    )
  }
}

export default ProducersList
