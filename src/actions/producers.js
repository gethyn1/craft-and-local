// @flow

import { API_URL_PRODUCERS } from '../config'

export const PRODUCERS_IS_LOADING = 'PRODUCERS_IS_LOADING'
export const PRODUCERS_HAS_ERRORED = 'PRODUCERS_HAS_ERRORED'
export const PRODUCERS_FETCH_DATA_SUCCESS = 'PRODUCERS_FETCH_DATA_SUCCESS'
export const PRODUCERS_FILTER_BY_CATEGORY = 'PRODUCERS_FILTER_BY_CATEGORY'

export const producersIsLoading = (payload: boolean) => ({
  type: PRODUCERS_IS_LOADING,
  payload,
})

export const producersHasErrored = (payload: boolean) => ({
  type: PRODUCERS_HAS_ERRORED,
  payload,
})

export const producersFetchDataSuccess = (payload: Array<Object>) => ({
  type: PRODUCERS_FETCH_DATA_SUCCESS,
  payload,
})

export const producersFetchData = () => (dispatch: Function) => {
  const url = API_URL_PRODUCERS
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
    .then(producers => dispatch(producersFetchDataSuccess(producers)))
    .catch(() => dispatch(producersHasErrored(true)))
}

export const producersFilterByCategory = (id: string) => (dispatch: Function) => {
  const url = `${API_URL_PRODUCERS}?categories_like=${id}`
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
    .then(producers => dispatch(producersFetchDataSuccess(producers)))
    .catch(() => dispatch(producersHasErrored(true)))
}
