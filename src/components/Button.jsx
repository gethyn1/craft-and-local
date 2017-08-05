// @flow

import React from 'react'

import styles from '../styles/6-components/_components.button.scss'

type Props = {
  children: React.Element<*>,
  type?: string,
  onClick?: Function,
}

const Button = ({ type, onClick, children }: Props) => (
  <button onClick={onClick} type={type} className={styles.btn}>{children}</button>
)

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
}

export default Button
