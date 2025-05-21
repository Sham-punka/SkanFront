import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <span className={styles.text}>Загрузка...</span>
    </div>
  )
}

export default Loader
