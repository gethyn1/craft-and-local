// @flow

import { connect } from 'react-redux'

import { categoriesFetchData } from '../actions/categories'

import {
  createProducerPostData,
} from '../actions/createProducer'

import ProducerForm from '../components/ProducerForm'

const mapStateToProps = state => ({
  categories: state.categories.categories,
  isLoading: state.createProducer.isLoading,
  hasErrored: state.createProducer.hasErrored,
})

const mapDispatchToProps = dispatch => ({
  getCategories: () => {
    dispatch(categoriesFetchData())
  },
  onSubmit: (producer: Object) => {
    dispatch(createProducerPostData(producer))
  },
})

const CreateProducer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducerForm)

export default CreateProducer
