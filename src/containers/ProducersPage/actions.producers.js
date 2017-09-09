// @flow

import { API_URL_PRODUCERS, LOAD_PRODUCERS_COUNT } from '../../config'

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

export const generateUrl = (base: string, opts: Object = {}) => {
  let query = ''
  let first = true

  Object.keys(opts).forEach((key) => {
    if (opts && Object.prototype.hasOwnProperty.call(opts, key)) {
      query = `${query}${first ? '?' : '&'}${key}=${opts[key]}`
      first = false
    }
  })

  return `${base}${query}`
}

export const producersFetchData = (params: ?Object) => (dispatch: Function) => {
  const paramsWithLimit = Object.assign({}, params, {
    limit: LOAD_PRODUCERS_COUNT,
  })

  dispatch(producersIsLoading(true))

  return fetch(generateUrl(API_URL_PRODUCERS, paramsWithLimit), { method: 'GET' })
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
