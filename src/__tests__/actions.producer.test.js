import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import fetchMock from 'fetch-mock'

import { API_URL_PRODUCERS } from '../config'

import {
  producerHasErrored,
  producerIsLoading,
  producerFetchData,
  producerFetchDataSuccess,
} from '../actions/producer'

const mockStore = configureMockStore([thunkMiddleware])

/* eslint-disable */
const mockJSON = {
  "data": {
    "producer": {
      "id": "1",
      "title": "Test producer",
    }
  }
}
/* eslint-enable */

afterEach(() => {
  fetchMock.restore()
})

test('Fetch producer from API: success', () => {
  fetchMock.get(`${API_URL_PRODUCERS}/1`, mockJSON)

  const store = mockStore()
  return store.dispatch(producerFetchData(1))
    .then(() => {
      expect(store.getActions()).toEqual([
        producerIsLoading(true),
        producerIsLoading(false),
        producerFetchDataSuccess(mockJSON.data.producer),
      ])
    })
})

test('Fetch producer from API: 404', () => {
  fetchMock.get(`${API_URL_PRODUCERS}/1`, 404)

  const store = mockStore()
  return store.dispatch(producerFetchData(1))
    .then(() => {
      expect(store.getActions()).toEqual([
        producerIsLoading(true),
        producerHasErrored(true),
      ])
    })
})
