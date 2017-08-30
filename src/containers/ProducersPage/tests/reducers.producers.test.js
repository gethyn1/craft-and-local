import { initialState, producers, createProducerMarkers } from '../reducer.producers'

import {
  PRODUCERS_IS_LOADING,
  PRODUCERS_HAS_ERRORED,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FILTER_BY_CATEGORY,
} from '../actions.producers'

import mockProducers from '../../../data/mock-producers'

const loadingTestState = Object.assign({}, initialState, {
  isLoading: true,
})

const erroredTestState = Object.assign({}, initialState, {
  hasErrored: true,
})

const producersTestState = Object.assign({}, initialState, {
  producers: mockProducers,
  markers: createProducerMarkers(mockProducers),
})

describe('Producers reducer', () => {
  it('should return the initial state', () => {
    expect(producers(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${PRODUCERS_IS_LOADING}`, () => {
    expect(
      producers(initialState, {
        type: PRODUCERS_IS_LOADING,
        payload: true,
      }),
    )
    .toEqual(loadingTestState)
  })

  it(`should handle ${PRODUCERS_HAS_ERRORED}`, () => {
    expect(
      producers(initialState, {
        type: PRODUCERS_HAS_ERRORED,
        payload: true,
      }),
    )
    .toEqual(erroredTestState)
  })

  it(`should handle ${PRODUCERS_FETCH_DATA_SUCCESS}`, () => {
    expect(
      producers(initialState, {
        type: PRODUCERS_FETCH_DATA_SUCCESS,
        payload: mockProducers,
      }),
    )
    .toEqual(producersTestState)
  })

  it(`should handle ${PRODUCERS_FILTER_BY_CATEGORY}`, () => {
    expect(
      producers(producersTestState, {
        type: PRODUCERS_FILTER_BY_CATEGORY,
        payload: mockProducers[0].categories[0],
      }),
    )
    .toEqual(producersTestState)
  })
})
