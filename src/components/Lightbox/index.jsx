// @flow

import React from 'react'

import styles from '../../styles/6-components/_components.lightbox.scss'

type Props = {
  children: React.Element<*>,
  className?: string,
  isVisible: boolean,
  toggleVisibility: Function,
}

const onOverlayClick = (event: & { currentTarget: HTMLElement }, fn: Function) => {
  if (event.target === event.currentTarget) {
    fn()
  }

  return null
}

const Lightbox = ({ children, className, isVisible, toggleVisibility }: Props) => {
  if (isVisible) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`${styles.overlay} ${className ? String(className) : ''}`}
        onClick={(e) => { onOverlayClick(e, toggleVisibility) }}
      >
        <div className={styles.wrapper}>
          <button className={styles.close} onClick={toggleVisibility}>X</button>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return null
}

Lightbox.defaultProps = {
  className: null,
}

export default Lightbox
