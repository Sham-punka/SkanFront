import React from 'react'
import styles from './Select.module.css'

type Option = {
  value: string
  label: string
}

type SelectProps = {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
  name?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  name,
  placeholder = 'Выберите...',
  disabled = false,
  error
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={error ? styles.errorSelect : styles.select}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default Select
