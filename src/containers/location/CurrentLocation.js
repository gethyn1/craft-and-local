import { connect } from 'react-redux'

import { locationGetUserLocation } from './actions'

import UserLocation from '../../components/UserLocation'

const mapStateToProps = state => ({
  isLoading: state.location.isLoading,
  hasErrored: state.location.hasErrored,
  latitude: state.location.latitude,
  longitude: state.location.longitude,
  address: state.location.address,
  markers: state.producers.markers,
})

const mapDispatchToProps = dispatch => ({
  getUserLocation: () => {
    dispatch(locationGetUserLocation())
  },
})

const CurrentLocation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLocation)

export default CurrentLocation
