// @flow
import { GOOGLE_MAPS_API_KEY } from '../../config'

import types from './constants'

export const locationIsLoading = (payload: boolean) => ({
  type: types.LOCATION_IS_LOADING,
  payload,
})

export const locationHasErrored = (payload: boolean) => ({
  type: types.LOCATION_HAS_ERRORED,
  payload,
})

export const locationGetPositionSuccess = (payload: Object) => ({
  type: types.LOCATION_GET_POSITION_SUCCESS,
  payload,
})

export const locationGetAddressFromLatLngSuccess = (payload: string) => ({
  type: types.LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS,
  payload,
})

export const locationGetAddressFromLatLng = (lat: number, lng: number) => (dispatch: Function) => {
  dispatch(locationIsLoading(true))
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(locationIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then((address) => {
      dispatch(locationGetAddressFromLatLngSuccess(address.results[0].formatted_address))
    })
    .catch(() => dispatch(locationHasErrored(true)))
}

export const locationGetUserLocation = () => (dispatch: Function) => {
  dispatch(locationIsLoading(true))

  let latitude = null
  let longitude = null

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude
      longitude = position.coords.longitude

      dispatch(locationGetAddressFromLatLng(latitude, longitude))
      dispatch(locationGetPositionSuccess({ latitude, longitude }))
    })
  } else {
    dispatch(locationIsLoading(true))
    dispatch(locationHasErrored(true))
  }
}
