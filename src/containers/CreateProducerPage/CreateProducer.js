// @flow

import { connect } from 'react-redux'

import { categoriesFetchData } from '../ProducersPage/actions.categories'
import { createProducerPostData } from './actions.createProducer'
import {
  geocodingGetLatLngFromAddress,
  geocodingAddressLookupReset,
} from './actions.geocoding'

import ProducerForm from '../../components/ProducerForm'

const mapStateToProps = state => ({
  categories: state.categories.categories,
  isLoading: state.createProducer.isLoading,
  hasErrored: state.createProducer.hasErrored,
  geoCodingOptions: state.geocoding.addressLookupOptions ?
    state.geocoding.addressLookupOptions.map(option => ({
      id: option.id,
      option: option.address,
      value: `${option.lng},${option.lat}`,
    })) : null,
})

const mapDispatchToProps = dispatch => ({
  getCategories: () => {
    dispatch(categoriesFetchData())
  },
  onSubmit: (producer: Object) => {
    dispatch(createProducerPostData(producer))
  },
  geoCodingLookup: (address: string) => {
    dispatch(geocodingGetLatLngFromAddress(address))
  },
  onGeoCodingSelect: () => {
    dispatch(geocodingAddressLookupReset())
  },
})

const CreateProducer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducerForm)

export default CreateProducer
