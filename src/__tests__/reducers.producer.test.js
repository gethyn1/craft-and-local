import { initialState, producer } from '../reducers/producer'

import {
  PRODUCER_IS_LOADING,
  PRODUCER_HAS_ERRORED,
  PRODUCER_FETCH_DATA_SUCCESS,
} from '../actions/producer'

const loadingTestState = Object.assign({}, initialState, {
  isLoading: true,
})

const erroredTestState = Object.assign({}, initialState, {
  hasErrored: true,
})

const producerTestState = Object.assign({}, initialState, {
  producer: { id: '123', title: 'test title', categories: ['1', '2'] },
})

describe('Categories reducer', () => {
  it('should return the initial state', () => {
    expect(producer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${PRODUCER_IS_LOADING}`, () => {
    expect(
      producer(initialState, {
        type: PRODUCER_IS_LOADING,
        payload: true,
      }),
    )
    .toEqual(loadingTestState)
  })

  it(`should handle ${PRODUCER_HAS_ERRORED}`, () => {
    expect(
      producer(initialState, {
        type: PRODUCER_HAS_ERRORED,
        payload: true,
      }),
    )
    .toEqual(erroredTestState)
  })

  it(`should handle ${PRODUCER_FETCH_DATA_SUCCESS}`, () => {
    expect(
      producer(initialState, {
        type: PRODUCER_FETCH_DATA_SUCCESS,
        payload: { id: '123', title: 'test title', categories: ['1', '2'] },
      }),
    )
    .toEqual(producerTestState)
  })
})
