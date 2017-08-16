// @flow

import { API_URL_PRODUCERS_CREATE } from '../config'

export const CREATE_PRODUCER_IS_LOADING = 'CREATE_PRODUCER_IS_LOADING'
export const CREATE_PRODUCER_HAS_ERRORED = 'CREATE_PRODUCER_HAS_ERRORED'
export const CREATE_PRODUCER_SUCCESS = 'CREATE_PRODUCER_SUCCESS'

export const createProducerIsLoading = (payload: boolean) => ({
  type: CREATE_PRODUCER_IS_LOADING,
  payload,
})

export const createProducerHasErrored = (payload: boolean) => ({
  type: CREATE_PRODUCER_HAS_ERRORED,
  payload,
})

export const createProducerSuccess = (payload: Object) => ({
  type: CREATE_PRODUCER_SUCCESS,
  payload,
})

export const createProducerPostData = (producer: Object) => (dispatch: Function) => {
  const url = API_URL_PRODUCERS_CREATE
  dispatch(createProducerHasErrored(false))
  dispatch(createProducerIsLoading(true))

  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  const jwtToken = sessionStorage.getItem('jwt')

  if (jwtToken !== null) {
    // flow-disable-next-line
    headers.set('Authorization', jwtToken)
  }

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(producer),
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      dispatch(createProducerIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'error') {
        dispatch(createProducerHasErrored(true))
      } else {
        dispatch(createProducerSuccess(data.data.producer))
      }
    })
    .catch(() => dispatch(createProducerHasErrored(true)))
}
