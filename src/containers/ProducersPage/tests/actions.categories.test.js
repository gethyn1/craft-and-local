import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import fetchMock from 'fetch-mock'

import { API_URL_CATEGORIES } from '../../../config'

import {
  categoriesHasErrored,
  categoriesIsLoading,
  categoriesFetchData,
  categoriesFetchDataSuccess,
} from '../actions.categories'

const mockStore = configureMockStore([thunkMiddleware])

/* eslint-disable */
const mockJSON = {
  "data": {
    "categories": [
      {
        "id": "1",
        "title": "Test category",
      }
    ]
  }
}
/* eslint-enable */

afterEach(() => {
  fetchMock.restore()
})

test('Fetch categories from API: success', () => {
  fetchMock.get(API_URL_CATEGORIES, mockJSON)

  const store = mockStore()
  return store.dispatch(categoriesFetchData())
    .then(() => {
      expect(store.getActions()).toEqual([
        categoriesIsLoading(true),
        categoriesIsLoading(false),
        categoriesFetchDataSuccess(mockJSON.data.categories),
      ])
    })
})

test('Fetch categories from API: 404', () => {
  fetchMock.get(API_URL_CATEGORIES, 404)

  const store = mockStore()
  return store.dispatch(categoriesFetchData())
    .then(() => {
      expect(store.getActions()).toEqual([
        categoriesIsLoading(true),
        categoriesHasErrored(true),
      ])
    })
})
