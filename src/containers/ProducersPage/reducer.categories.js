// @flow

import {
  CATEGORIES_IS_LOADING,
  CATEGORIES_HAS_ERRORED,
  CATEGORIES_FETCH_DATA_SUCCESS,
  CATEGORIES_SET_ACTIVE_CATEGORY,
} from './actions.categories'

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
    case CATEGORIES_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case CATEGORIES_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        categories: action.payload,
      })
    case CATEGORIES_SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, {
        active: action.payload,
      })
    default:
      return state
  }
}
