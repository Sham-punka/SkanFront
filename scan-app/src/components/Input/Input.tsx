import React from 'react'
import styles from './Input.module.css'
import classNames from 'classnames'

type InputProps = {
  label?: string
  type?: string
  value: string
  name: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  name,
  placeholder,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classNames(styles.input, { [styles.errorInput]: !!error })}
        disabled={disabled}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default Input
