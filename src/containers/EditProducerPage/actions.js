// @flow

import {
  API_URL_PRODUCERS,
  STORAGE_JSON_WEB_TOKEN,
} from '../../config'

import createPostHeaders from '../session/headers'
import { sessionAuthenticate } from '../session/actions'

import types from './constants'

export const editProducerIsLoading = (payload: boolean) => ({
  type: types.EDIT_PRODUCER_IS_LOADING,
  payload,
})

export const editProducerHasErrored = (payload: boolean) => ({
  type: types.EDIT_PRODUCER_HAS_ERRORED,
  payload,
})

export const editProducerSuccess = (payload: Object) => ({
  type: types.EDIT_PRODUCER_SUCCESS,
  payload,
})

export const editProducerPostData = (producer: Object, userId: string) => (dispatch: Function) => {
  const url = `${API_URL_PRODUCERS}/${userId}`
  dispatch(editProducerHasErrored(false))
  dispatch(editProducerIsLoading(true))

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(producer),
    headers: createPostHeaders(STORAGE_JSON_WEB_TOKEN, true),
  })
    .then((response) => {
      if (!response.ok) {
        dispatch(sessionAuthenticate(response.status))
        throw new Error(response.statusText)
      }

      dispatch(editProducerIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'error') {
        dispatch(editProducerHasErrored(true))
      } else {
        dispatch(editProducerSuccess(data.data.producer))
      }
    })
    .catch(() => dispatch(editProducerHasErrored(true)))
}
