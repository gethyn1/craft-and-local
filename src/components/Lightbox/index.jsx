// @flow

import React from 'react'

import Icon from '../Icon'

/* eslint-disable no-unused-vars */
import closeIcon from '../../images/icons/close.svg'
/* eslint-enable no-unused-vars */

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
          <button className={styles.close} onClick={toggleVisibility}><Icon type="close" size="20" /></button>
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
