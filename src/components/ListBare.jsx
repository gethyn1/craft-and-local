// @flow

import React from 'react'

import styles from '../styles/5-objects/_objects.list-bare.scss'

type Props = {
  children: React.Element<*>,
  className?: string,
}

const ListBare = ({ children, className }: Props) => (
  <ul className={`${styles['o-list-bare']} ${String(className)}`}>
    {children}
  </ul>
)

ListBare.defaultProps = {
  className: '',
}

export default ListBare
