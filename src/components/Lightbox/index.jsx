// @flow

import React from 'react'

import styles from '../../styles/6-components/_components.lightbox.scss'

type Props = {
  children: React.Element<*>,
  isVisible: boolean,
  toggleVisibility: Function,
}

const onOverlayClick = (event: & { currentTarget: HTMLElement }, fn: Function) => {
  if (event.target === event.currentTarget) {
    fn()
  }

  return null
}

const Lightbox = ({ children, isVisible, toggleVisibility }: Props) => {
  if (isVisible) {
    return (
      <div role="button" tabIndex={0} className={styles.overlay} onClick={(e) => { onOverlayClick(e, toggleVisibility) }}>
        <div className={styles.content}>
          <button className={styles.close} onClick={toggleVisibility}>X</button>
          {children}
        </div>
      </div>
    )
  }

  return null
}

export default Lightbox
