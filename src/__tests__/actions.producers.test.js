import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import fetchMock from 'fetch-mock'

import { API_URL_PRODUCERS } from '../config'

import {
  producersHasErrored,
  producersIsLoading,
  producersFetchData,
  producersFetchDataSuccess,
  producersFilterByCategory,
} from '../actions/producers'

const mockStore = configureMockStore([thunkMiddleware])

/* eslint-disable */
const mockJSON = {
  "data": {
    "producers": [
      {
        "id": "1",
        "title": "Test producer 1",
        "categories": [1, 2]
      }
    ]
  }
}
/* eslint-enable */

afterEach(() => {
  fetchMock.restore()
})

test('Fetch producers from API: success', () => {
  fetchMock.get(API_URL_PRODUCERS, mockJSON)

  const store = mockStore()
  return store.dispatch(producersFetchData())
    .then(() => {
      expect(store.getActions()).toEqual([
        producersIsLoading(true),
        producersIsLoading(false),
        producersFetchDataSuccess(mockJSON.data.producers),
      ])
    })
})

test('Fetch producers from API: 404', () => {
  fetchMock.get(API_URL_PRODUCERS, 404)

  const store = mockStore()
  return store.dispatch(producersFetchData())
    .then(() => {
      expect(store.getActions()).toEqual([
        producersIsLoading(true),
        producersHasErrored(true),
      ])
    })
})

test('Fetch producers from API by category: success', () => {
  fetchMock.get(`${API_URL_PRODUCERS}?categories_like=1`, mockJSON)

  const store = mockStore()
  return store.dispatch(producersFilterByCategory(1))
    .then(() => {
      expect(store.getActions()).toEqual([
        producersIsLoading(true),
        producersIsLoading(false),
        producersFetchDataSuccess(mockJSON.data.producers),
      ])
    })
})

test('Fetch producers from API by category: 404', () => {
  fetchMock.get(`${API_URL_PRODUCERS}?categories_like=1`, 404)

  const store = mockStore()
  return store.dispatch(producersFilterByCategory(1))
    .then(() => {
      expect(store.getActions()).toEqual([
        producersIsLoading(true),
        producersHasErrored(true),
      ])
    })
})
