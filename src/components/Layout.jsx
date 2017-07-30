// @flow

import React from 'react'

import styles from '../styles/5-objects/_objects.layout.scss'

type Props = {
  children: React.Element<*>,
  size?: string,
}

type ItemProps = {
  children: React.Element<*>,
  cols: string,
  className?: string,
}

export const Layout = ({ children, size }: Props) => {
  const sizeClass = size ? `o-layout--${size}` : ''

  return (
    <div className={`${styles['o-layout']} ${styles[String(sizeClass)]}`}>
      {children}
    </div>
  )
}

Layout.defaultProps = {
  size: '',
}

export const LayoutItem = ({ children, cols, className }: ItemProps) => {
  const widthClass = cols ? `u-${cols}` : ''

  return (
    <div className={`${styles['o-layout__item']} ${String(widthClass)} ${String(className)}`}>
      {children}
    </div>
  )
}

LayoutItem.defaultProps = {
  className: '',
}
