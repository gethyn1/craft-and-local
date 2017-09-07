// @flow

import { API_URL_PRODUCERS } from '../../config'

import types from './constants'

export const producersIsLoading = (payload: boolean) => ({
  type: types.PRODUCERS_IS_LOADING,
  payload,
})

export const producersHasErrored = (payload: boolean) => ({
  type: types.PRODUCERS_HAS_ERRORED,
  payload,
})

export const producersFetchDataSuccess = (payload: Array<Object>) => ({
  type: types.PRODUCERS_FETCH_DATA_SUCCESS,
  payload,
})

export const producersResetProducers = () => ({
  type: types.PRODUCERS_RESET_PRODUCERS,
})

export const producersFetchData = (
  latLng: Object,
  minDistance: number = 0,
  exclude: Array<string> = [],
) => (dispatch: Function) => {
  const baseUrl = latLng ? `${API_URL_PRODUCERS}?latlng=${latLng.lat},${latLng.lng}` : API_URL_PRODUCERS
  const minDistanceQuery = minDistance ? `&mindistance=${minDistance * 1000}` : ''
  const excludeQuery = exclude.length ? `&exclude=${String(exclude)}` : ''
  const url = `${baseUrl}${minDistanceQuery}${excludeQuery}`

  dispatch(producersIsLoading(true))

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(producersIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(producersFetchDataSuccess(data.data.producers)))
    .catch(() => {
      producersIsLoading(false)
      dispatch(producersHasErrored(true))
    })
}

export const producersFilterByCategory = (id: string, latLng: Object) => (dispatch: Function) => {
  // If a category ID is not specified, return an empty array.
  if (!id) {
    return []
  }

  const url = latLng
    ? `${API_URL_PRODUCERS}?categories_like=${id}&latlng=${latLng.lat},${latLng.lng}`
    : `${API_URL_PRODUCERS}?categories_like=${id}`

  dispatch(producersIsLoading(true))

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(producersIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(producersFetchDataSuccess(data.data.producers)))
    .catch(() => dispatch(producersHasErrored(true)))
}
