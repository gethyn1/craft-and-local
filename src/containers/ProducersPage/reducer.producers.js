// @flow

import types from './constants'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  producers: [],
  markers: [],
}

// Generate an array of markers to place on Google Map.
export const createProducerMarkers = (producers: Array<Object>) => (
  producers.map(producer => ({
    lat: producer.location.coordinates[1],
    lng: producer.location.coordinates[0],
    title: producer.title,
  }))
)

export const producers = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case types.PRODUCERS_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case types.PRODUCERS_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case types.PRODUCERS_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        markers: createProducerMarkers(action.payload),
        producers: action.payload,
      })
    default:
      return state
  }
}
