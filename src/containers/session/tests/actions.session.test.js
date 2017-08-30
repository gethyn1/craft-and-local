import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {
  sessionLoginIsLoading,
  sessionLoginHasErrored,
  sessionLoginSuccess,
  sessionPostLoginCredentials,
} from '../actions'

const mockStore = configureMockStore([thunkMiddleware])

const mockResponseSuccess = {
  status: 'success',
  data: {
    token: '1234',
    isAdmin: false,
    email: 'user@user.com',
  },
}

const mockResponseFailure = {
  status: 'error',
  data: {},
}

describe('Session actions', () => {
  test('Post login details to API: success', () => {
    fetch.mockResponse(JSON.stringify(mockResponseSuccess), {
      status: 200,
      ok: true,
    })

    const store = mockStore()

    return store.dispatch(sessionPostLoginCredentials('user@user.com', 'password'))
      .then(() => {
        expect(store.getActions()).toEqual([
          sessionLoginHasErrored(false),
          sessionLoginIsLoading(true),
          sessionLoginIsLoading(false),
          sessionLoginSuccess({
            email: mockResponseSuccess.data.email,
            isAdmin: mockResponseSuccess.data.isAdmin,
          }),
        ])
      })
  })

  test('Post login details to API: failure', () => {
    fetch.mockResponse(JSON.stringify(mockResponseFailure), {
      status: 200,
      ok: true,
    })

    const store = mockStore()

    return store.dispatch(sessionPostLoginCredentials('user@user.com', 'password'))
      .then(() => {
        expect(store.getActions()).toEqual([
          sessionLoginHasErrored(false),
          sessionLoginIsLoading(true),
          sessionLoginIsLoading(false),
          sessionLoginHasErrored(true),
        ])
      })
  })
})
