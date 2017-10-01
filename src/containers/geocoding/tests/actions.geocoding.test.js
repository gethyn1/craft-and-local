import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  geocodingAddressLookupIsLoading,
  geocodingAddressLookupHasErrored,
  geocodingAddressLookupSuccess,
  geocodingGetLatLngFromAddress,
  geocodingAddressLookupReset,
} from '../actions'

import types from '../constants'

const mockStore = configureMockStore([thunkMiddleware])

const mockResponseSuccess = {
  results: ['address 1', 'address 2'],
}

const mockResponseFailure = {}


describe('Geocoding actions', () => {
  it('should create an action for addressLookupIsLoading', () => {
    const isLoading = true
    const expectedAction = {
      type: types.GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
      payload: isLoading,
    }

    expect(geocodingAddressLookupIsLoading(isLoading)).toEqual(expectedAction)
  })

  it('should create an action for addressLookupHasErrored', () => {
    const hasErrored = true
    const expectedAction = {
      type: types.GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED,
      payload: hasErrored,
    }

    expect(geocodingAddressLookupHasErrored(hasErrored)).toEqual(expectedAction)
  })

  it('should create an action for addressLookupSuccess', () => {
    const expectedAction = {
      type: types.GEOCODING_ADDRESS_LOOKUP_SUCCESS,
      payload: mockResponseSuccess,
    }

    expect(geocodingAddressLookupSuccess(mockResponseSuccess)).toEqual(expectedAction)
  })

  it('should create an action for addressLookupReset', () => {
    const expectedAction = {
      type: types.GEOCODING_ADDRESS_LOOKUP_RESET,
    }

    expect(geocodingAddressLookupReset()).toEqual(expectedAction)
  })

  test('get results from Google Maps API: success', () => {
    fetch.mockResponse(JSON.stringify(mockResponseSuccess), {
      status: 200,
      ok: true,
    })

    const store = mockStore()

    return store.dispatch(geocodingGetLatLngFromAddress('test'))
      .then(() => {
        expect(store.getActions()).toEqual([
          geocodingAddressLookupIsLoading(true),
          geocodingAddressLookupIsLoading(false),
          geocodingAddressLookupSuccess(mockResponseSuccess.results),
        ])
      })
  })

  test('get results from Google Maps API: failure', () => {
    fetch.mockResponse(JSON.stringify(mockResponseFailure), {
      status: 400,
      ok: false,
    })

    const store = mockStore()

    return store.dispatch(geocodingGetLatLngFromAddress('test'))
      .then(() => {
        expect(store.getActions()).toEqual([
          geocodingAddressLookupIsLoading(true),
          geocodingAddressLookupHasErrored(true),
        ])
      })
  })
})
