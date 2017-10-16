// @flow

import { connect } from 'react-redux'

import { createProducerPostData } from './actions'

import CreateProducerForm from '../../components/CreateProducerForm'

const mapStateToProps = state => ({
  isLoading: state.createProducer.isLoading,
  hasErrored: state.createProducer.hasErrored,
  hasCreatedProducer: state.createProducer.producer,
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (producer: Object) => {
    dispatch(createProducerPostData(producer))
  },
})

const CreateProducer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProducerForm)

export default CreateProducer
