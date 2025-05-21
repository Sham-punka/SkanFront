import styles from './TariffCard.module.css'
import classNames from 'classnames'

type TariffType = 'Beginner' | 'Pro' | 'Business'

type Props = {
  title: string
  price: string
  subtitle: string
  benefits: string[]
  isCurrent?: boolean
  type: TariffType
}

const TariffCard = ({ title, price, subtitle, benefits, isCurrent = false, type }: Props) => {
  return (
    <div className={classNames(styles.card, styles[type.toLowerCase()], isCurrent && styles.current)}>
      {isCurrent && <div className={styles.badge}>Текущий тариф</div>}

      <h3 className={styles.title}>{title}</h3>
      <div className={styles.price}>{price}</div>
      <div className={styles.subtitle}>{subtitle}</div>

      <ul className={styles.benefits}>
        {benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <button className={styles.button}>
        {isCurrent ? 'Перейти в личный кабинет' : 'Подробнее'}
      </button>
    </div>
  )
}

export default TariffCard
