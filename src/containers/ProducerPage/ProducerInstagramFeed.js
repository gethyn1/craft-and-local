// @flow

import { connect } from 'react-redux'

import InstagramFeed from '../../components/InstagramFeed'

const mapStateToProps = (state: Object) => ({
  isLoading: state.producer.instagramFeedIsLoading,
  hasErrored: state.producer.instagramFeedHasErrored,
  items: state.producer.instagramFeed,
  limit: 4,
})

const ProducerInstagramFeed = connect(
  mapStateToProps,
)(InstagramFeed)

export default ProducerInstagramFeed
