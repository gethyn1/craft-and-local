// @flow

import React from 'react'

import Button from '../Button'
import Error from '../Error'
import { Layout, LayoutItem } from '../Layout'
import Loading from '../Loading'
import ProducerCard from '../ProducerCard'

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

type State = {
  noMoreProducers: boolean,
}

class ProducersList extends React.Component {
  constructor(props: Props) {
    super(props)

    this.state = {
      noMoreProducers: false,
    }

    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  state: State

  componentDidMount() {
    const { lat, lng } = this.props

    if (lat && lng) {
      this.props.fetchData({ lat, lng })
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { category, lat, lng, isLoading, producers } = nextProps

    if (lat !== this.props.lat && lng !== this.props.lng) {
      this.props.fetchData({ lat, lng })
    }

    if (
      isLoading === this.props.isLoading
      && (producers && this.props.producers)
      && category === this.props.category
    ) {
      this.setState({
        noMoreProducers: producers.length === this.props.producers.length,
      })
    }

    if (category !== this.props.category) {
      this.setState({
        noMoreProducers: false,
      })
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
        </div>
      )
    }

    return null
  }

  renderStatus() {
    const { producers, isLoading, hasErrored } = this.props

    if (hasErrored) {
      return <Error>There was an error getting producers</Error>
    }

    if (!producers && isLoading) {
      return <Loading>Loading producers ...</Loading>
    }

    if (!producers) {
      return <p>Please wait ...</p>
    }

    if (producers && !producers.length) {
      return <p>Sorry, there are no producers for that category</p>
    }

    return null
  }

  renderLoadMore() {
    if (!this.props.producers) {
      return null
    }

    if (this.state.noMoreProducers) {
      return <p>That is all we have at the moment</p>
    }

    return <Button onClick={this.handleLoadMore}>Load more</Button>
  }

  renderProducers: Function
  renderStatus: Function
  renderLoadMore: Function

  render() {
    return (
      <div>
        {this.renderProducers()}
        {this.renderStatus()}
        {this.renderLoadMore()}
      </div>
    )
  }
}

export default ProducersList
