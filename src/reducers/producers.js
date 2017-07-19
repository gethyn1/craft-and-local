// @flow

import {
  PRODUCERS_IS_LOADING,
  PRODUCERS_HAS_ERRORED,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FILTER_BY_CATEGORY,
} from '../actions/producers'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  producers: [],
}

export const producers = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case PRODUCERS_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        producers: action.payload,
      })
    case PRODUCERS_FILTER_BY_CATEGORY:
      return Object.assign({}, state, {
        producers: state.producers.filter(producer => producer.categories.includes(action.payload)),
      })
    default:
      return state
  }
}
