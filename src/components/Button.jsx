// @flow

import React from 'react'

import styles from '../styles/6-components/_components.button.scss'

type Props = {
  text: string,
  type: string,
  onClick?: Function,
}

const Button = ({ text, type, onClick }: Props) => (
  <button onClick={onClick} type={type} className={styles.btn}>{text}</button>
)

Button.defaultProps = {
  onClick: () => {},
}

export default Button
