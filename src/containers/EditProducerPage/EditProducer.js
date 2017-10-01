// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { categoriesFetchData } from '../ProducersPage/actions.categories'
import { editProducerPostData } from './actions'
import { geocodingGetLatLngFromAddress, geocodingAddressLookupReset } from '../geocoding/actions'
import { producerFetchData } from '../ProducerPage/actions'

import ProducerForm from '../../components/ProducerForm'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  producerId: ownProps.match.params.userId,
  producer: state.producer.producer,
  categories: state.categories.categories,
  isLoading: state.editProducer.isLoading,
  hasErrored: state.editProducer.hasErrored,
  geoCodingOptions: state.geocoding.addressLookupOptions ?
    state.geocoding.addressLookupOptions.map(option => ({
      id: option.id,
      option: option.address,
      value: `${option.lng},${option.lat}`,
    })) : null,
  notFound: state.producer.notFound,
})

const mapDispatchToProps = (dispatch: Function) => ({
  getProducer: (id: string) => {
    dispatch(producerFetchData(id))
  },
  getCategories: () => {
    dispatch(categoriesFetchData())
  },
  onSubmit: (producer: Object, userId: string) => {
    dispatch(editProducerPostData(producer, userId))
  },
  geoCodingLookup: (address: string) => {
    dispatch(geocodingGetLatLngFromAddress(address))
  },
  onGeoCodingSelect: () => {
    dispatch(geocodingAddressLookupReset())
  },
})

const EditProducer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducerForm))

export default EditProducer
