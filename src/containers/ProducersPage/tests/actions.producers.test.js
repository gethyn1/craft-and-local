import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  producersHasErrored,
  producersIsLoading,
  producersFetchData,
  producersFetchDataSuccess,
  producersFilterByCategory,
} from '../actions.producers'

const mockStore = configureMockStore([thunkMiddleware])

const mockResponseSuccess = {
  status: 'success',
  data: {
    producers: [
      {
        id: '1',
        title: 'Test producer 1',
        categories: [1, 2],
      },
    ],
  },
}

const mockResponseFailure = {
  status: 'error',
  data: {},
}

const latLng = { lat: 123, lng: 456 }
const categoryId = '789'

describe('Producers actions', () => {
  test('Fetch producers from API: success', () => {
    fetch.mockResponse(JSON.stringify(mockResponseSuccess), {
      status: 200,
      ok: true,
    })

    const store = mockStore()

    return store.dispatch(producersFetchData(latLng))
      .then(() => {
        expect(store.getActions()).toEqual([
          producersIsLoading(true),
          producersIsLoading(false),
          producersFetchDataSuccess(mockResponseSuccess.data.producers),
        ])
      })
  })

  test('Fetch producers from API: failure', () => {
    fetch.mockResponse(JSON.stringify(mockResponseFailure), {
      status: 404,
      ok: true,
    })

    const store = mockStore()

    return store.dispatch(producersFetchData(latLng))
      .then(() => {
        expect(store.getActions()).toEqual([
          producersIsLoading(true),
          producersHasErrored(true),
        ])
      })
  })

  test('Fetch producers by category from API: success', () => {
    fetch.mockResponse(JSON.stringify(mockResponseSuccess), {
      status: 200,
      ok: true,
    })

    const store = mockStore()

    return store.dispatch(producersFilterByCategory(latLng, categoryId))
      .then(() => {
        expect(store.getActions()).toEqual([
          producersIsLoading(true),
          producersIsLoading(false),
          producersFetchDataSuccess(mockResponseSuccess.data.producers),
        ])
      })
  })

  test('Fetch producers by category from API: failure', () => {
    fetch.mockResponse(JSON.stringify(mockResponseFailure), {
      status: 404,
      ok: true,
    })

    const store = mockStore()

    return store.dispatch(producersFilterByCategory(latLng, categoryId))
      .then(() => {
        expect(store.getActions()).toEqual([
          producersIsLoading(true),
          producersHasErrored(true),
        ])
      })
  })
})
