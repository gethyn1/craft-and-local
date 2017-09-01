// @flow

import React from 'react'

import styles from '../../styles/6-components/_components.button.scss'

type Props = {
  children: React.Element<*>,
  className: ?string,
  href: ?string,
  onClick: ?Function,
  type: ?string,
}

const Button = ({ children, className, href, onClick, type }: Props) => {
  if (href) {
    return (
      <a href={href} className={`${styles.btn} ${String(className)}`}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`${styles.btn} ${String(className)}`}>
      {children}
    </button>
  )
}

export default Button
