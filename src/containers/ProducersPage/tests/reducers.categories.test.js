import { initialState, categories } from '../reducer.categories'

import types from '../constants'

const loadingTestState = Object.assign({}, initialState, {
  isLoading: true,
})

const erroredTestState = Object.assign({}, initialState, {
  hasErrored: true,
})

const itemsTestState = Object.assign({}, initialState, {
  categories: [{ id: '123', title: 'test title' }],
})

describe('Categories reducer', () => {
  it('should return the initial state', () => {
    expect(categories(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${types.CATEGORIES_IS_LOADING}`, () => {
    expect(
      categories(initialState, {
        type: types.CATEGORIES_IS_LOADING,
        payload: true,
      }),
    )
    .toEqual(loadingTestState)
  })

  it(`should handle ${types.CATEGORIES_HAS_ERRORED}`, () => {
    expect(
      categories(initialState, {
        type: types.CATEGORIES_HAS_ERRORED,
        payload: true,
      }),
    )
    .toEqual(erroredTestState)
  })

  it(`should handle ${types.CATEGORIES_FETCH_DATA_SUCCESS}`, () => {
    expect(
      categories(initialState, {
        type: types.CATEGORIES_FETCH_DATA_SUCCESS,
        payload: [{ id: '123', title: 'test title' }],
      }),
    )
    .toEqual(itemsTestState)
  })
})
