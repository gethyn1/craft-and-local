// @flow

import React from 'react'

import styles from '../styles/5-objects/_objects.list-inline.scss'

type Props = {
  children: React.Element<*>,
  className?: string,
  bare?: boolean,
}

const ListInline = ({ children, className, bare }: Props) => (
  <ul className={`${styles.list} ${String(className)} ${bare ? styles.bare : ''}`}>
    {children}
  </ul>
)

ListInline.defaultProps = {
  className: '',
  bare: true,
}

export default ListInline
