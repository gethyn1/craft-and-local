// @flow

import React from 'react'

type Props = {
  children: React.Element<*>,
}

const Loading = ({ children }: Props) => (
  <div>
    {children}
  </div>
)

export default Loading
