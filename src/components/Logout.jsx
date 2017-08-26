// @flow

import React from 'react'

type Props = {
  isLoggedIn: boolean,
  handleLogout: Function,
}

const Logout = ({ isLoggedIn, handleLogout }: Props) => (
  isLoggedIn ? (
    <button onClick={handleLogout}>Logout</button>
  ) : null
)

export default Logout
