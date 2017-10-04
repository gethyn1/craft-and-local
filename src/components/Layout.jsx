// @flow

import React from 'react'

import styles from '../styles/5-objects/_objects.layout.scss'

type Props = {
  children: React.Element<*>,
  direction?: ?string,
  size?: ?string,
}

type ItemProps = {
  children: React.Element<*>,
  cols: string,
  className?: string,
}

export const Layout = ({ children, size, direction }: Props) => {
  const sizeClass = size ? `o-layout--${size}` : ''
  const directionClass = direction ? `o-layout--${direction}` : ''

  return (
    <div className={`${styles['o-layout']} ${styles[String(sizeClass)]} ${styles[String(directionClass)]}`}>
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

Layout.defaultProps = {
  direction: null,
  size: null,
  className: '',
}

LayoutItem.defaultProps = {
  direction: null,
  className: '',
}
