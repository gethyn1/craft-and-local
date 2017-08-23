// @flow

import {
  CREATE_PRODUCER_IS_LOADING,
  CREATE_PRODUCER_HAS_ERRORED,
  CREATE_PRODUCER_SUCCESS,
} from '../actions/createProducer'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  producer: null,
  addressLookupIsLoading: false,
  addressLookupHasErrored: false,
  geoCodingOptions: null,
}

export const createProducer = (
  state: Object = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case CREATE_PRODUCER_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case CREATE_PRODUCER_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case CREATE_PRODUCER_SUCCESS:
      return Object.assign({}, state, {
        producer: action.payload,
        geoCodingOptions: null,
      })
    default:
      return state
  }
}
