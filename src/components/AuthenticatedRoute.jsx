// @flow

import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

type Props = {
  isAuthenticated: boolean,
  component: any,
}

const AuthenticatedRoute = ({ isAuthenticated, component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    )}
  />
)

export default AuthenticatedRoute
