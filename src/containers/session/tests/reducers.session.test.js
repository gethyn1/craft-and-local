import {
  STORAGE_IS_ADMIN,
  STORAGE_USER_EMAIL,
} from '../../../config'

import { initialState, session } from '../reducer'

import types from '../constants'

const loadingTestState = Object.assign({}, initialState, {
  isLoading: true,
})

const erroredTestState = Object.assign({}, initialState, {
  hasErrored: true,
})

const loginSuccessTestState = Object.assign({}, initialState, {
  isAdmin: true,
  userEmail: 'user@user.com',
})

const referrerPathTestState = Object.assign({}, initialState, {
  authReferrerPath: '/',
})

describe('Session reducer', () => {
  it('should return the initial state', () => {
    expect(session(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${types.SESSION_LOGIN_IS_LOADING}`, () => {
    expect(
      session(initialState, {
        type: types.SESSION_LOGIN_IS_LOADING,
        payload: true,
      }),
    )
    .toEqual(loadingTestState)
  })

  it(`should handle ${types.SESSION_LOGIN_HAS_ERRORED}`, () => {
    expect(
      session(initialState, {
        type: types.SESSION_LOGIN_HAS_ERRORED,
        payload: true,
      }),
    )
    .toEqual(erroredTestState)
  })

  it(`should handle ${types.SESSION_LOGIN_SUCCESS}`, () => {
    sessionStorage.setItem(STORAGE_IS_ADMIN, 'true')
    sessionStorage.setItem(STORAGE_USER_EMAIL, 'user@user.com')

    expect(
      session(initialState, {
        type: types.SESSION_LOGIN_SUCCESS,
        payload: {
          isAdmin: true,
          email: 'user@user.com',
        },
      }),
    )
    .toEqual(loginSuccessTestState)
  })

  it(`should handle ${types.SESSION_LOGIN_SET_REFERRER_PATH}`, () => {
    expect(
      session(initialState, {
        type: types.SESSION_LOGIN_SET_REFERRER_PATH,
        payload: '/',
      }),
    )
    .toEqual(referrerPathTestState)
  })

  it(`should handle ${types.SESSION_LOGOUT_SUCCESS}`, () => {
    sessionStorage.setItem(STORAGE_IS_ADMIN, false)
    sessionStorage.setItem(STORAGE_USER_EMAIL, null)

    expect(
      session(initialState, {
        type: types.SESSION_LOGOUT_SUCCESS,
      }),
    )
    .toEqual(initialState)
  })
})
