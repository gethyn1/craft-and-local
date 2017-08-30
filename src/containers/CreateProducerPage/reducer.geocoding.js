// @flow

import types from './constants'

export const initialState = {
  addressLookupIsLoading: false,
  addressLookupHasErrored: false,
  addressLookupOptions: null,
}

export const geocoding = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case types.GEOCODING_ADDRESS_LOOKUP_IS_LOADING:
      return Object.assign({}, state, {
        addressLookupIsLoading: action.payload,
      })
    case types.GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED:
      return Object.assign({}, state, {
        addressLookupHasErrored: action.payload,
      })
    case types.GEOCODING_ADDRESS_LOOKUP_SUCCESS:
      return Object.assign({}, state, {
        addressLookupHasErrored: false,
        addressLookupOptions: action.payload.map(result => ({
          id: result.place_id,
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        })),
      })
    case types.GEOCODING_ADDRESS_LOOKUP_RESET:
      return Object.assign({}, state, {
        addressLookupOptions: null,
      })
    default:
      return state
  }
}
