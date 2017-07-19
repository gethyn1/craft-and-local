// @flow

import {
  PRODUCER_IS_LOADING,
  PRODUCER_HAS_ERRORED,
  PRODUCER_FETCH_DATA_SUCCESS,
} from '../actions/producer'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  producer: {},
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
    default:
      return state
  }
}
