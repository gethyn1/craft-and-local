// @flow

import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

type Props = {
  isAuthenticated: boolean,
  component: any,
  setReferrerPath: Function,
}

const AuthenticatedRoute = ({
  isAuthenticated,
  setReferrerPath,
  component: Component,
  ...rest }: Props,
) => {
  if (!isAuthenticated) {
    // Update the referrer path for session
    setReferrerPath(location.pathname)
  }

  return (
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
}

export default AuthenticatedRoute
