// @flow

import { API_URL_USER_AUTH } from '../config'

export const SESSION_LOGIN_IS_LOADING = 'SESSION_LOGIN_IS_LOADING'
export const SESSION_LOGIN_HAS_ERRORED = 'SESSION_LOGIN_HAS_ERRORED'
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'

export const sessionLoginIsLoading = (payload: boolean) => ({
  type: SESSION_LOGIN_IS_LOADING,
  payload,
})

export const sessionLoginHasErrored = (payload: boolean) => ({
  type: SESSION_LOGIN_HAS_ERRORED,
  payload,
})

export const sessionLoginSuccess = () => ({
  type: SESSION_LOGIN_SUCCESS,
})

export const sessionPostLoginCredentials = (
  username: string,
  password: string,
) => (dispatch: Function) => {
  const url = API_URL_USER_AUTH
  dispatch(sessionLoginHasErrored(false))
  dispatch(sessionLoginIsLoading(true))

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: username,
      password,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      dispatch(sessionLoginIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'error') {
        dispatch(sessionLoginHasErrored(true))
      } else {
        // Set the json web token in local storage
        sessionStorage.setItem('jwt', data.data.token)
        dispatch(sessionLoginSuccess())
      }
    })
    .catch(() => dispatch(sessionLoginHasErrored(true)))
}
