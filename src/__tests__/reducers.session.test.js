import { initialState, session } from '../reducers/session'

import {
  SESSION_LOGIN_IS_LOADING,
  SESSION_LOGIN_HAS_ERRORED,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_SET_REFERRER_PATH,
} from '../actions/session'

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

  it(`should handle ${SESSION_LOGIN_IS_LOADING}`, () => {
    expect(
      session(initialState, {
        type: SESSION_LOGIN_IS_LOADING,
        payload: true,
      }),
    )
    .toEqual(loadingTestState)
  })

  it(`should handle ${SESSION_LOGIN_HAS_ERRORED}`, () => {
    expect(
      session(initialState, {
        type: SESSION_LOGIN_HAS_ERRORED,
        payload: true,
      }),
    )
    .toEqual(erroredTestState)
  })

  it(`should handle ${SESSION_LOGIN_SUCCESS}`, () => {
    expect(
      session(initialState, {
        type: SESSION_LOGIN_SUCCESS,
        payload: {
          isAdmin: true,
          email: 'user@user.com',
        },
      }),
    )
    .toEqual(loginSuccessTestState)
  })

  it(`should handle ${SESSION_LOGIN_SET_REFERRER_PATH}`, () => {
    expect(
      session(initialState, {
        type: SESSION_LOGIN_SET_REFERRER_PATH,
        payload: '/',
      }),
    )
    .toEqual(referrerPathTestState)
  })
})
