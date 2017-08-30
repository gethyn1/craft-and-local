// @flow

import {
  API_URL_USER_AUTH,
  STORAGE_JSON_WEB_TOKEN,
  STORAGE_IS_ADMIN,
  STORAGE_USER_EMAIL,
} from '../../config'

export const SESSION_LOGIN_IS_LOADING = 'SESSION_LOGIN_IS_LOADING'
export const SESSION_LOGIN_HAS_ERRORED = 'SESSION_LOGIN_HAS_ERRORED'
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
export const SESSION_LOGIN_SET_REFERRER_PATH = 'SESSION_LOGIN_SET_REFERRER_PATH'
export const SESSION_LOGOUT_SUCCESS = 'SESSION_LOGOUT_SUCCESS'

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

export const sessionLoginSetReferrerPath = (payload: ?string) => ({
  type: SESSION_LOGIN_SET_REFERRER_PATH,
  payload,
})

export const sessionLogoutSuccess = () => ({
  type: SESSION_LOGOUT_SUCCESS,
})

export const sessionLogout = () => (dispatch: Function) => {
  // Remove json web token and user settings from session storage
  sessionStorage.removeItem(STORAGE_JSON_WEB_TOKEN)
  sessionStorage.removeItem(STORAGE_IS_ADMIN)
  sessionStorage.removeItem(STORAGE_USER_EMAIL)
  dispatch(sessionLogoutSuccess())
}

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
        const { token, isAdmin, email } = data.data

        // Set json web token and user settings in session storage
        sessionStorage.setItem(STORAGE_JSON_WEB_TOKEN, token)
        sessionStorage.setItem(STORAGE_IS_ADMIN, isAdmin)
        sessionStorage.setItem(STORAGE_USER_EMAIL, email)
        dispatch(sessionLoginSuccess())
      }
    })
    .catch(() => dispatch(sessionLoginHasErrored(true)))
}
