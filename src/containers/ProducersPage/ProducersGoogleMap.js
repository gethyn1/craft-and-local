// @flow

import { connect } from 'react-redux'

import GoogleMap from '../../components/GoogleMap'

const mapStateToProps = (state: Object) => ({
  latitude: state.location.latitude,
  longitude: state.location.longitude,
  markers: state.producers.markers,
  addCenterMarker: false,
  zoom: 12,
})

const ProducersGoogleMap = connect(
  mapStateToProps,
)(GoogleMap)

export default ProducersGoogleMap
