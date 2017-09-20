// @flow

import types from './constants'

export const initialState = {
  isLoading: [],
  hasErrored: [],
  uploaded: [],
}

export const uploads = (
  state: Object = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case types.FILE_IS_UPLOADING_ADD:
      return Object.assign({}, state, {
        isLoading: [...state.isLoading, action.payload],
      })
    case types.FILE_IS_UPLOADING_REMOVE:
      return Object.assign({}, state, {
        isLoading: state.isLoading.filter(item => item !== action.payload),
      })
    case types.FILE_HAS_ERRORED_ADD:
      return Object.assign({}, state, {
        hasErrored: [...state.hasErrored, action.payload],
      })
    case types.FILE_HAS_ERRORED_REMOVE:
      return Object.assign({}, state, {
        hasErrored: state.hasErrored.filter(item => item !== action.payload),
      })
    case types.FILE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        uploaded: [...state.uploaded, action.payload],
      })
    default:
      return state
  }
}
