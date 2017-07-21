// @flow

import { API_URL_PRODUCERS, API_URL_INSTAGRAM_FEED } from '../config'

export const PRODUCER_IS_LOADING = 'PRODUCER_IS_LOADING'
export const PRODUCER_HAS_ERRORED = 'PRODUCER_HAS_ERRORED'
export const PRODUCER_FETCH_DATA_SUCCESS = 'PRODUCER_FETCH_DATA_SUCCESS'
export const PRODUCER_INSTAGRAM_FEED_IS_LOADING = 'PRODUCER_INSTAGRAM_FEED_IS_LOADING'
export const PRODUCER_CLEAR_STATE = 'PRODUCER_CLEAR_STATE'
export const PRODUCER_INSTAGRAM_FEED_HAS_ERRORED = 'PRODUCER_INSTAGRAM_FEED_HAS_ERRORED'
export const PRODUCER_FETCH_INSTAGRAM_FEED_SUCCESS = 'PRODUCER_FETCH_INSTAGRAM_FEED_SUCCESS'
export const PRODUCER_FETCH_INSTAGRAM_FEED_CLEAR_STATE = 'PRODUCER_FETCH_INSTAGRAM_FEED_CLEAR_STATE'

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

export const producerClearState = () => ({
  type: PRODUCER_CLEAR_STATE,
})

export const producerInstagramFeedIsLoading = (payload: boolean) => ({
  type: PRODUCER_INSTAGRAM_FEED_IS_LOADING,
  payload,
})

export const producerInstagramFeedHasErrored = (payload: boolean) => ({
  type: PRODUCER_INSTAGRAM_FEED_HAS_ERRORED,
  payload,
})

export const producerFetchInstagramFeedSuccess = (payload: Array<Object>) => ({
  type: PRODUCER_FETCH_INSTAGRAM_FEED_SUCCESS,
  payload,
})

export const producerFetchInstagramFeedClearState = () => ({
  type: PRODUCER_FETCH_INSTAGRAM_FEED_CLEAR_STATE,
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

export const producerFetchInstagramFeed = (handle: string) => (dispatch: Function) => {
  const url = `${API_URL_INSTAGRAM_FEED}/${handle}`
  dispatch(producerInstagramFeedIsLoading(true))

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(producerInstagramFeedIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(producerFetchInstagramFeedSuccess(data.data)))
    .catch(() => {
      dispatch(producerInstagramFeedIsLoading(false))
      dispatch(producerInstagramFeedHasErrored(true))
    })
}
