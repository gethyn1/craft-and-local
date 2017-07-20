// @flow

import { API_URL_CATEGORIES } from '../config'

export const CATEGORIES_IS_LOADING = 'CATEGORIES_IS_LOADING'
export const CATEGORIES_HAS_ERRORED = 'CATEGORIES_HAS_ERRORED'
export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'

export const categoriesIsLoading = (payload: boolean) => ({
  type: CATEGORIES_IS_LOADING,
  payload,
})

export const categoriesHasErrored = (payload: boolean) => ({
  type: CATEGORIES_HAS_ERRORED,
  payload,
})

export const categoriesFetchDataSuccess = (payload: Array<Object>) => ({
  type: CATEGORIES_FETCH_DATA_SUCCESS,
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
