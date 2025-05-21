import React from 'react'
import styles from './Checkbox.module.css'

type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: string
  name?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  name
}) => {
  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          className={styles.input}
        />
        <span className={styles.customCheckbox}></span>
        {label}
      </label>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default Checkbox
