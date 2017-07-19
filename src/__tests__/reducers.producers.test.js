import { initialState, producers } from '../reducers/producers'

import {
  PRODUCERS_IS_LOADING,
  PRODUCERS_HAS_ERRORED,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FILTER_BY_CATEGORY,
} from '../actions/producers'

const loadingTestState = Object.assign({}, initialState, {
  isLoading: true,
})

const erroredTestState = Object.assign({}, initialState, {
  hasErrored: true,
})

const producersTestState = Object.assign({}, initialState, {
  producers: [{ id: '123', title: 'test title', categories: ['1', '2'] }],
})

describe('Categories reducer', () => {
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
        payload: [{ id: '123', title: 'test title', categories: ['1', '2'] }],
      }),
    )
    .toEqual(producersTestState)
  })

  it(`should handle ${PRODUCERS_FILTER_BY_CATEGORY}`, () => {
    expect(
      producers(producersTestState, {
        type: PRODUCERS_FILTER_BY_CATEGORY,
        payload: '1',
      }),
    )
    .toEqual(producersTestState)
  })
})
