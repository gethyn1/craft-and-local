// @flow

import { connect } from 'react-redux'

import {
  createProducerPostData,
} from '../actions/createProducer'

import ProducerForm from '../components/ProducerForm'

const mapStateToProps = state => ({
  isLoading: state.createProducer.isLoading,
  hasErrored: state.createProducer.hasErrored,
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (producer: Object) => {
    dispatch(createProducerPostData(producer))
  },
})

const CreateProducer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducerForm)

export default CreateProducer
