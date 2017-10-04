// @flow

import React from 'react'

import styles from '../../styles/6-components/_components.avatar.scss'

type Props = {
  className?: string,
  alt: string,
  src: string,
}

const Avatar = ({ className, alt, src }: Props) => {
  const classList = `${styles.wrapper} ${String(className)}`

  return (
    <div className={classList}>
      <img src={src} alt={alt} />
    </div>
  )
}

Avatar.defaultProps = {
  className: null,
}

export default Avatar
