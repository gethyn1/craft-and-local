// @flow

import { API_URL_PRODUCERS } from '../config'

export const PRODUCER_IS_LOADING = 'PRODUCER_IS_LOADING'
export const PRODUCER_HAS_ERRORED = 'PRODUCER_HAS_ERRORED'
export const PRODUCER_FETCH_DATA_SUCCESS = 'PRODUCER_FETCH_DATA_SUCCESS'

export const producerIsLoading = (payload: boolean) => ({
  type: PRODUCER_IS_LOADING,
  payload,
})

export const producerHasErrored = (payload: boolean) => ({
  type: PRODUCER_HAS_ERRORED,
  payload,
})

export const producerFetchDataSuccess = (payload: Array<Object>) => ({
  type: PRODUCER_FETCH_DATA_SUCCESS,
  payload,
})

export const producerFetchData = (id: string) => (dispatch: Function) => {
  const url = `${API_URL_PRODUCERS}/${id}`
  dispatch(producerIsLoading(true))

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(producerIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(producerFetchDataSuccess(data.data.producer)))
    .catch(() => dispatch(producerHasErrored(true)))
}
