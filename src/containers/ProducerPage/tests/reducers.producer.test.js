import { initialState, producer } from '../reducer'

import types from '../constants'

const loadingTestState = Object.assign({}, initialState, {
  isLoading: true,
})

const erroredTestState = Object.assign({}, initialState, {
  hasErrored: true,
})

const producerTestState = Object.assign({}, initialState, {
  producer: { id: '123', title: 'test title', categories: ['1', '2'] },
})

const isSharingTestState = Object.assign({}, initialState, {
  isSharing: true,
})

const notFoundTestState = Object.assign({}, initialState, {
  notFound: true,
})

describe('Categories reducer', () => {
  it('should return the initial state', () => {
    expect(producer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${types.PRODUCER_IS_LOADING}`, () => {
    expect(
      producer(initialState, {
        type: types.PRODUCER_IS_LOADING,
        payload: true,
      }),
    )
    .toEqual(loadingTestState)
  })

  it(`should handle ${types.PRODUCER_HAS_ERRORED}`, () => {
    expect(
      producer(initialState, {
        type: types.PRODUCER_HAS_ERRORED,
        payload: true,
      }),
    )
    .toEqual(erroredTestState)
  })

  it(`should handle ${types.PRODUCER_FETCH_DATA_SUCCESS}`, () => {
    expect(
      producer(initialState, {
        type: types.PRODUCER_FETCH_DATA_SUCCESS,
        payload: { id: '123', title: 'test title', categories: ['1', '2'] },
      }),
    )
    .toEqual(producerTestState)
  })

  it(`should handle ${types.PRODUCER_SHARE_PROFILE}`, () => {
    expect(
      producer(initialState, {
        type: types.PRODUCER_SHARE_PROFILE,
        payload: true,
      }),
    )
    .toEqual(isSharingTestState)
  })

  it(`should handle ${types.PRODUCER_NOT_FOUND}`, () => {
    expect(
      producer(initialState, {
        type: types.PRODUCER_NOT_FOUND,
        payload: true,
      }),
    )
    .toEqual(notFoundTestState)
  })
})
