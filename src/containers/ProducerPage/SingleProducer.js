// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  producerFetchData,
  producerClearState,
  producerFetchInstagramFeed,
  producerFetchInstagramFeedClearState,
} from './actions'

import Producer from '../../components/Producer'

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.producer.isLoading,
  hasErrored: state.producer.hasErrored,
  producerId: ownProps.match.params.userId,
  producer: state.producer.producer,
  instagramFeedIsLoading: state.producer.instagramFeedIsLoading,
  instagramFeedHasErrored: state.producer.instagramFeedHasErrored,
  instagramFeed: state.producer.instagramFeed,
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
})

const SingleProducer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Producer))

export default SingleProducer
