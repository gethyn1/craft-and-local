// @flow

import { API_URL_LOCALITIES } from '../../config'

import types from './constants'

export const localitiesIsLoading = (payload: boolean) => ({
  type: types.LOCALITIES_IS_LOADING,
  payload,
})

export const localitiesHasErrored = (payload: boolean) => ({
  type: types.LOCALITIES_HAS_ERRORED,
  payload,
})

export const localitiesFetchDataSuccess = (payload: Array<Object>) => ({
  type: types.LOCALITIES_FETCH_DATA_SUCCESS,
  payload,
})

export const localitiesFetchData = () => (dispatch: Function) => {
  const url = API_URL_LOCALITIES
  dispatch(localitiesIsLoading(true))

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(localitiesIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(localitiesFetchDataSuccess(data.data.localities)))
    .catch(() => dispatch(localitiesHasErrored(true)))
}
