// @flow

import React from 'react'

type Props = {
  children: React.Element<*>,
}

const Error = ({ children }: Props) => (
  <div>
    {children}
  </div>
)

export default Error
