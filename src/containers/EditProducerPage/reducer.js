// @flow

import types from './constants'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  producer: null,
  addressLookupIsLoading: false,
  addressLookupHasErrored: false,
  geoCodingOptions: null,
}

export const editProducer = (
  state: Object = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case types.EDIT_PRODUCER_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case types.EDIT_PRODUCER_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case types.EDIT_PRODUCER_SUCCESS:
      return Object.assign({}, state, {
        producer: action.payload,
        geoCodingOptions: null,
      })
    default:
      return state
  }
}
