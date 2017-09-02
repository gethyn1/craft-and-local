// @flow

/**
 *
 * <Button>{children}</Button>
 *
 * A common button, if you pass it a prop "href" it will render an <a> tag
 * otherwise it will render a button with an onClick method.
 */

import React from 'react'

import styles from '../../styles/6-components/_components.button.scss'

type Props = {
  children: React.Element<*>,
  className?: string,
  href?: string,
  level?: string,
  onClick?: Function,
  type?: string,
}


/**
 * Return a space separated string from an array.
 */

export const generateClassList = (classes: Array<*>) =>
  classes
    .filter(className => className)
    .join(' ')


/**
 * Button react component.
 */

const Button = ({ children, className, href, level, onClick, type }: Props) => {
  // Create the class list for the Button
  const classList = generateClassList([
    styles.btn,
    styles[level],
    String(className),
  ])

  // Render an <a> tag if href prop is defined
  if (href) {
    return (
      <a href={href} className={classList}>
        {children}
      </a>
    )
  }

  // Render a <button> tag if no href prop is defined
  return (
    <button type={type} onClick={onClick} className={classList}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  className: null,
  href: null,
  level: null,
  onClick: null,
  type: null,
}

export default Button
