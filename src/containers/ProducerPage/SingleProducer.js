// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  producerFetchData,
  producerClearState,
  producerFetchInstagramFeed,
  producerFetchInstagramFeedClearState,
  producerShareProfile,
} from './actions'

import Producer from '../../components/Producer'

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.producer.isLoading,
  isSharing: state.producer.isSharing,
  hasErrored: state.producer.hasErrored,
  producerId: ownProps.match.params.userId,
  producer: state.producer.producer,
  notFound: state.producer.notFound,
})

const mapDispatchToProps = (dispatch: Function) => ({
  fetchData: (id: string) => {
    dispatch(producerFetchData(id))
  },
  fetchInstagramFeed: (handle: string) => {
    dispatch(producerFetchInstagramFeed(handle))
  },
  resetProducerState: () => {
    dispatch(producerClearState())
    dispatch(producerFetchInstagramFeedClearState())
  },
  toggleShareProfile: (isSharing: boolean) => {
    dispatch(producerShareProfile(isSharing))
  },
})

const SingleProducer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Producer))

export default SingleProducer
