// @flow

import {
  LOCATION_IS_LOADING,
  LOCATION_HAS_ERRORED,
  LOCATION_GET_POSITION_SUCCESS,
  LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS,
} from './actions'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  latitude: 0,
  longitude: 0,
  address: null,
}

export const location = (
  state: Object = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case LOCATION_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case LOCATION_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case LOCATION_GET_POSITION_SUCCESS:
      return Object.assign({}, state, {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      })
    case LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS:
      return Object.assign({}, state, {
        address: action.payload,
      })
    default:
      return state
  }
}
