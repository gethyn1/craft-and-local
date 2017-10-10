// @flow

import types from './constants'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  localities: null,
}

export const localities = (
  state: Object = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case types.LOCALITIES_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case types.LOCALITIES_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case types.LOCALITIES_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        localities: action.payload,
      })
    default:
      return state
  }
}
