// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import Distance from './Distance'
import ListBare from './ListBare'

import styles from '../styles/6-components/_components.producers-list.scss'

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
    const producers = this.props.producers.map((producer) => {
      const coords = producer.location.coordinates

      return (
        <li key={producer._id} className={styles.item}>
          <Link to={`/producer/${producer._id}`} className={styles.link}>{producer.title}</Link><br />
          <Distance
            from={{ lat: this.props.lat, lng: this.props.lng }}
            to={{ lat: coords[1], lng: coords[0] }}
          />
        </li>
      )
    })

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
        <ListBare>
          {producers}
        </ListBare>
      </div>
    )
  }
}

export default ProducersList
