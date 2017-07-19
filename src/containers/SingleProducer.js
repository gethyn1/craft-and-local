// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { producerFetchData } from '../actions/producer'

import Producer from '../components/Producer'

const mapStateToProps = (state, ownProps) => ({
  producerId: ownProps.match.params.producerId,
  producer: state.producer.producer,
})

const mapDispatchToProps = (dispatch: Function) => ({
  fetchData: (id: string) => {
    dispatch(producerFetchData(id))
  },
})

const SingleProducer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Producer))

export default SingleProducer
