// @flow

import types from './constants'

export const initialState = {
  isLoading: false,
  isSharing: false,
  hasErrored: false,
  producer: null,
  lng: null,
  lat: null,
  notFound: false,
  instagramFeedIsLoading: false,
  instagramFeedHasErrored: false,
  instagramFeed: null,
}

export const producer = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case types.PRODUCER_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case types.PRODUCER_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case types.PRODUCER_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        producer: action.payload,
        lng: action.payload.location.coordinates[0],
        lat: action.payload.location.coordinates[1],
      })
    case types.PRODUCER_NOT_FOUND:
      return Object.assign({}, state, {
        notFound: action.payload,
      })
    case types.PRODUCER_CLEAR_STATE:
      return Object.assign({}, state, {
        producer: initialState.producer,
      })
    case types.PRODUCER_INSTAGRAM_FEED_IS_LOADING:
      return Object.assign({}, state, {
        instagramFeedIsLoading: action.payload,
      })
    case types.PRODUCER_INSTAGRAM_FEED_HAS_ERRORED:
      return Object.assign({}, state, {
        instagramFeedHasErrored: action.payload,
      })
    case types.PRODUCER_FETCH_INSTAGRAM_FEED_SUCCESS:
      return Object.assign({}, state, {
        instagramFeed: action.payload,
      })
    case types.PRODUCER_FETCH_INSTAGRAM_FEED_CLEAR_STATE:
      return Object.assign({}, state, {
        instagramFeed: initialState.instagramFeed,
      })
    case types.PRODUCER_SHARE_PROFILE:
      return Object.assign({}, state, {
        isSharing: action.payload,
      })
    default:
      return state
  }
}
