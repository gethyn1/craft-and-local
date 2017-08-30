// @flow

import { API_URL_CATEGORIES } from '../../config'

import types from './constants'

export const categoriesIsLoading = (payload: boolean) => ({
  type: types.CATEGORIES_IS_LOADING,
  payload,
})

export const categoriesHasErrored = (payload: boolean) => ({
  type: types.CATEGORIES_HAS_ERRORED,
  payload,
})

export const categoriesFetchDataSuccess = (payload: Array<Object>) => ({
  type: types.CATEGORIES_FETCH_DATA_SUCCESS,
  payload,
})

export const categoriesSetActiveCategory = (payload: ?string) => ({
  type: types.CATEGORIES_SET_ACTIVE_CATEGORY,
  payload,
})

export const categoriesFetchData = () => (dispatch: Function) => {
  const url = API_URL_CATEGORIES
  dispatch(categoriesIsLoading(true))

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch(categoriesIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(categoriesFetchDataSuccess(data.data.categories)))
    .catch(() => dispatch(categoriesHasErrored(true)))
}
