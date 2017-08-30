// @flow

import types from './constants'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  categories: null,
  active: null,
}

export const categories = (
  state: Object = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case types.CATEGORIES_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case types.CATEGORIES_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case types.CATEGORIES_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        categories: action.payload,
      })
    case types.CATEGORIES_SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, {
        active: action.payload,
      })
    default:
      return state
  }
}
