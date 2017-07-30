// @flow

import React from 'react'

import { Layout, LayoutItem } from './Layout'
import ProducerCard from './ProducerCard'

type Props = {
  producers: Array<Object>,
  fetchData: Function,
  hasErrored: boolean,
  isLoading: boolean,
  lat: number,
  lng: number,

}

class ProducersList extends React.Component {
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

  render() {
    const producers = this.props.producers.map(producer => (
      <LayoutItem key={producer._id} cols="1/3@tablet" className="u-margin-bottom">
        <ProducerCard producer={producer} {...this.props} />
      </LayoutItem>
    ))

    if (this.props.hasErrored) {
      return <p>There was an error getting producers</p>
    }

    if (this.props.isLoading) {
      return <p>Loading producers ...</p>
    }

    if (!producers.length) {
      return <p>Sorry, there are no producers for that category</p>
    }

    return (
      <div>
        <Layout>
          {producers}
        </Layout>
      </div>
    )
  }
}

export default ProducersList
