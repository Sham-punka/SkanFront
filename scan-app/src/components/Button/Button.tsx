import React from 'react'
import styles from './Button.module.css'
import classNames from 'classnames'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.button, className)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
