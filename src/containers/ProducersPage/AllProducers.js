// @flow

import { connect } from 'react-redux'

import { getDistanceFromLatLonInKm } from '../location/distances'

import { producersFetchData } from './actions.producers'

import ProducersList from '../../components/ProducersList'

const mapStateToProps = state => ({
  producers: state.producers.producers,
  hasErrored: state.producers.hasErrored,
  isLoading: state.producers.isLoading,
  lat: state.location.latitude,
  lng: state.location.longitude,
  loadCount: 2,
})

const mapDispatchToProps = dispatch => ({
  fetchData: (latLng: Object) => {
    dispatch(producersFetchData(latLng))
  },
  loadMore: (latLng: Object, producers: Array<Object>) => {
    const furthestCoords = producers[producers.length - 1].location.coordinates

    const minDistance = getDistanceFromLatLonInKm(
      latLng.lat,
      latLng.lng,
      furthestCoords[1],
      furthestCoords[0],
    )

    const excludeProducers = producers.filter((producer) => {
      const coords = producer.location.coordinates
      const distance = getDistanceFromLatLonInKm(latLng.lat, latLng.lng, coords[1], coords[0])
      return distance === minDistance
    })

    const excludeIds = excludeProducers.map((producer: Object) => producer._id)

    dispatch(producersFetchData(latLng, minDistance, excludeIds))
  },
})

const AllProducers = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersList)

export default AllProducers
