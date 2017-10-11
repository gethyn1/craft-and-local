// @flow

import React from 'react'

import styles from '../../styles/6-components/_components.avatar.scss'

type Props = {
  className?: string,
  alt: string,
  src: string,
  size?: string,
}

const Avatar = ({ className, alt, src, size }: Props) => {
  const classList = `${styles.wrapper} ${String(className)} ${size ? String(styles[size]) : ''}`

  return (
    <div className={classList}>
      <img src={src} alt={alt} />
    </div>
  )
}

Avatar.defaultProps = {
  className: '',
  size: '',
}

export default Avatar
