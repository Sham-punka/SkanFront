import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DateRangePicker.module.css'

type Props = {
  startDate: Date | null
  endDate: Date | null
  onChange: (dates: [Date | null, Date | null]) => void
  error?: string
}

const DateRangePicker: React.FC<Props> = ({ startDate, endDate, onChange, error }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Диапазон дат:</label>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        maxDate={new Date()}
        dateFormat="dd.MM.yyyy"
        placeholderText="Выберите даты"
        className={error ? styles.errorInput : styles.input}
        isClearable
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default DateRangePicker
