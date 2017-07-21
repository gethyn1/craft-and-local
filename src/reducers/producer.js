// @flow

import {
  PRODUCER_IS_LOADING,
  PRODUCER_HAS_ERRORED,
  PRODUCER_FETCH_DATA_SUCCESS,
  PRODUCER_CLEAR_STATE,
  PRODUCER_INSTAGRAM_FEED_IS_LOADING,
  PRODUCER_INSTAGRAM_FEED_HAS_ERRORED,
  PRODUCER_FETCH_INSTAGRAM_FEED_SUCCESS,
  PRODUCER_FETCH_INSTAGRAM_FEED_CLEAR_STATE,
} from '../actions/producer'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  producer: null,
  instagramFeedIsLoading: false,
  instagramFeedHasErrored: false,
  instagramFeed: null,
}

export const producer = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCER_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case PRODUCER_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case PRODUCER_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        producer: action.payload,
      })
    case PRODUCER_CLEAR_STATE:
      return Object.assign({}, state, {
        producer: initialState.producer,
      })
    case PRODUCER_INSTAGRAM_FEED_IS_LOADING:
      return Object.assign({}, state, {
        instagramFeedIsLoading: action.payload,
      })
    case PRODUCER_INSTAGRAM_FEED_HAS_ERRORED:
      return Object.assign({}, state, {
        instagramFeedHasErrored: action.payload,
      })
    case PRODUCER_FETCH_INSTAGRAM_FEED_SUCCESS:
      return Object.assign({}, state, {
        instagramFeed: action.payload,
      })
    case PRODUCER_FETCH_INSTAGRAM_FEED_CLEAR_STATE:
      return Object.assign({}, state, {
        instagramFeed: initialState.instagramFeed,
      })
    default:
      return state
  }
}
