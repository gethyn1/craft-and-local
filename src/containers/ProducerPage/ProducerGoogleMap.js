// @flow

import { connect } from 'react-redux'

import GoogleMap from '../../components/GoogleMap'

const mapStateToProps = (state: Object) => ({
  longitude: state.producer.lng,
  latitude: state.producer.lat,
})

const ProducerGoogleMap = connect(
  mapStateToProps,
)(GoogleMap)

export default ProducerGoogleMap
