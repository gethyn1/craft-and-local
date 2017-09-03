// @flow

import { connect } from 'react-redux'

import GoogleMap from '../../components/GoogleMap'

const mapStateToProps = (state: Object) => {
  // Check producer is defined before setting lng / lat values
  if (state.producer.location) {
    return {
      longitude: state.producer.location.coordinates[0],
      latitude: state.producer.location.coordinates[1],
    }
  }

  // Return an empty object if producer is not defined
  return {}
}

const ProducerGoogleMap = connect(
  mapStateToProps,
)(GoogleMap)

export default ProducerGoogleMap
