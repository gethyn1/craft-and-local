import { initialState, geocoding } from '../reducer.geocoding'

import {
  GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
  GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED,
  GEOCODING_ADDRESS_LOOKUP_SUCCESS,
  GEOCODING_ADDRESS_LOOKUP_RESET,
} from '../actions.geocoding'

const addressLookupLoadingTestState = Object.assign({}, initialState, {
  addressLookupIsLoading: true,
})

const addressLoadingErroredTestState = Object.assign({}, initialState, {
  addressLookupHasErrored: true,
})

const addressLoadingSuccessTestState = Object.assign({}, initialState, {
  addressLookupOptions: [
    {
      id: '123',
      address: 'test address',
      lat: '123',
      lng: '456',
    },
  ],
})

describe('Geocoding reducer', () => {
  it('should return the initial state', () => {
    expect(geocoding(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${GEOCODING_ADDRESS_LOOKUP_IS_LOADING}`, () => {
    expect(
      geocoding(initialState, {
        type: GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
        payload: true,
      }),
    )
    .toEqual(addressLookupLoadingTestState)
  })

  it(`should handle ${GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED}`, () => {
    expect(
      geocoding(initialState, {
        type: GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED,
        payload: true,
      }),
    )
    .toEqual(addressLoadingErroredTestState)
  })

  it(`should handle ${GEOCODING_ADDRESS_LOOKUP_SUCCESS}`, () => {
    expect(
      geocoding(initialState, {
        type: GEOCODING_ADDRESS_LOOKUP_SUCCESS,
        payload: [
          {
            place_id: '123',
            formatted_address: 'test address',
            geometry: {
              location: {
                lat: '123',
                lng: '456',
              },
            },
          },
        ],
      }),
    )
    .toEqual(addressLoadingSuccessTestState)
  })

  it(`should handle ${GEOCODING_ADDRESS_LOOKUP_RESET}`, () => {
    expect(
      geocoding(initialState, {
        type: GEOCODING_ADDRESS_LOOKUP_RESET,
      }),
    )
    .toEqual(initialState)
  })
})
