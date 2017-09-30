// @flow

import { GOOGLE_MAPS_API_KEY } from '../../config'

import types from './constants'

export const geocodingAddressLookupIsLoading = (payload: boolean) => ({
  type: types.GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
  payload,
})

export const geocodingAddressLookupHasErrored = (payload: boolean) => ({
  type: types.GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED,
  payload,
})

export const geocodingAddressLookupSuccess = (payload: Object) => ({
  type: types.GEOCODING_ADDRESS_LOOKUP_SUCCESS,
  payload,
})

export const geocodingAddressLookupReset = () => ({
  type: types.GEOCODING_ADDRESS_LOOKUP_RESET,
})

export const geocodingGetLatLngFromAddress = (address: string) => (dispatch: Function) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`
  dispatch(geocodingAddressLookupIsLoading(true))

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(geocodingAddressLookupIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(geocodingAddressLookupSuccess(data.results)))
    .catch(() => dispatch(geocodingAddressLookupHasErrored(true)))
}
