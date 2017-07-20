// @flow

import { connect } from 'react-redux'

import { producersFetchData } from '../actions/producers'

import ProducersList from '../components/ProducersList'

const mapStateToProps = state => ({
  producers: state.producers.producers,
  hasErrored: state.producers.hasErrored,
  isLoading: state.producers.isLoading,
  lat: state.location.latitude,
  lng: state.location.longitude,
})

const mapDispatchToProps = dispatch => ({
  fetchData: (latLng: Object) => {
    dispatch(producersFetchData(latLng))
  },
})

const AllProducers = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersList)

export default AllProducers
