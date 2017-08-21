// @flow

import React from 'react'

type Props = {
  userEmail: string,
  isLoggedIn: boolean,
  handleLogout: Function,
}

const Logout = ({ isLoggedIn, handleLogout, userEmail }: Props) => (
  isLoggedIn ? (
    <div>
      <p>Logged in as {userEmail}</p>
      <button onClick={() => { handleLogout() }}>Logout</button>
    </div>
  ) : null
)

export default Logout
