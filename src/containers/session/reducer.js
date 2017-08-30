// @flow

import {
  STORAGE_JSON_WEB_TOKEN,
  STORAGE_IS_ADMIN,
  STORAGE_USER_EMAIL,
} from '../../config'

import {
  SESSION_LOGIN_IS_LOADING,
  SESSION_LOGIN_HAS_ERRORED,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_SET_REFERRER_PATH,
  SESSION_LOGOUT_SUCCESS,
} from './actions'

const setUserEmail = () => {
  const emailInSessionStorage = sessionStorage.getItem(STORAGE_USER_EMAIL)
  return emailInSessionStorage || null
}

export const initialState = {
  isLoading: false,
  hasErrored: false,
  isLoggedIn: !!sessionStorage.getItem(STORAGE_JSON_WEB_TOKEN),
  isAdmin: sessionStorage.getItem(STORAGE_IS_ADMIN) === 'true',
  userEmail: setUserEmail(),
  authReferrerPath: null,
}

export const session = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case SESSION_LOGIN_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      })
    case SESSION_LOGIN_HAS_ERRORED:
      return Object.assign({}, state, {
        hasErrored: action.payload,
      })
    case SESSION_LOGIN_SUCCESS:
      // Set isLoggedIn boolean based on presence of jwt in session storage
      return Object.assign({}, state, {
        isLoggedIn: !!sessionStorage.getItem(STORAGE_JSON_WEB_TOKEN),
        isAdmin: sessionStorage.getItem(STORAGE_IS_ADMIN) === 'true',
        userEmail: setUserEmail(),
      })
    case SESSION_LOGIN_SET_REFERRER_PATH:
      return Object.assign({}, state, {
        authReferrerPath: action.payload,
      })
    case SESSION_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: !!sessionStorage.getItem(STORAGE_JSON_WEB_TOKEN),
        isAdmin: sessionStorage.getItem(STORAGE_IS_ADMIN) === 'true',
        userEmail: setUserEmail(),
        authReferrerPath: null,
      })
    default:
      return state
  }
}
