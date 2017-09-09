// @flow

import { connect } from 'react-redux'
import { getDistanceBetweenPoints } from '../location/distances'
import { producersFetchData } from './actions.producers'
import ProducersList from '../../components/ProducersList'

const mapStateToProps = state => ({
  category: state.categories.active,
  producers: state.producers.producers,
  hasErrored: state.producers.hasErrored,
  isLoading: state.producers.isLoading,
  lat: state.location.latitude,
  lng: state.location.longitude,
  loadCount: 2,
})

const mapDispatchToProps = dispatch => ({
  fetchData: (latLng: Object) => {
    dispatch(producersFetchData({
      latlng: `${latLng.lat},${latLng.lng}`,
    }))
  },
  loadMore: (latLng: Object, producers: Array<Object>, category: string) => {
    const furthestCoords = producers[producers.length - 1].location.coordinates

    const minDistance = getDistanceBetweenPoints(
      latLng.lat,
      latLng.lng,
      furthestCoords[1],
      furthestCoords[0],
    )

    const excludeProducers = producers.filter((producer) => {
      const coords = producer.location.coordinates
      const distance = getDistanceBetweenPoints(latLng.lat, latLng.lng, coords[1], coords[0])
      return distance === minDistance
    })

    const excludeProducerIds = excludeProducers.map((producer: Object) => producer._id)
    const queryParams = {}

    queryParams.latlng = `${latLng.lat},${latLng.lng}`
    queryParams.mindistance = minDistance
    queryParams.exclude = excludeProducerIds

    if (category) {
      queryParams.categories_like = category
    }

    dispatch(producersFetchData(queryParams))
  },
})

const AllProducers = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersList)

export default AllProducers
