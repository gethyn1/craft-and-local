// @flow

import {
  SESSION_LOGIN_IS_LOADING,
  SESSION_LOGIN_HAS_ERRORED,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_SET_REFERRER_PATH,
  SESSION_LOGOUT_SUCCESS,
} from '../actions/session'

export const initialState = {
  isLoading: false,
  hasErrored: false,
  isLoggedIn: !!sessionStorage.getItem('jwt'),
  isAdmin: false,
  userEmail: null,
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
        isLoggedIn: !!sessionStorage.getItem('jwt'),
        isAdmin: action.payload.isAdmin,
        userEmail: action.payload.email,
      })
    case SESSION_LOGIN_SET_REFERRER_PATH:
      return Object.assign({}, state, {
        authReferrerPath: action.payload,
      })
    case SESSION_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: !!sessionStorage.getItem('jwt'),
        isAdmin: false,
        userEmail: null,
        authReferrerPath: null,
      })
    default:
      return state
  }
}
