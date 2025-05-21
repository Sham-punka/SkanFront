import styles from './HomePage.module.css'
import TariffCard from '../../components/TariffCard/TariffCard'
import WhyUsCarousel from '../../components/Carousel/WhyUsCarousel'

// Иконки (предположительно в src/assets/icons/)
import bulbIcon from '../../assets/icons/bulb.svg'
import rocketIcon from '../../assets/icons/rocket.svg'
import shieldIcon from '../../assets/icons/shield.svg'

const HomePage = () => {
  const whyUsData = [
    {
      icon: bulbIcon,
      title: 'Инновационные алгоритмы',
      description: 'Мы используем самые современные технологии ИИ для поиска информации',
    },
    {
      icon: rocketIcon,
      title: 'Быстрый поиск',
      description: 'Результаты запроса доступны в считанные секунды',
    },
    {
      icon: shieldIcon,
      title: 'Надёжность и безопасность',
      description: 'Все данные надёжно защищены и не передаются третьим лицам',
    },
    // Можно добавить дополнительные карточки
  ]

  return (
    <main className={styles.main}>
      <section className={styles.why}>
        <h2 className={styles.title}>Почему именно мы</h2>
        <WhyUsCarousel slides={whyUsData} />
      </section>

      <section className={styles.tariffs}>
        <h2 className={styles.title}>Наши тарифы</h2>
        <div className={styles.cards}>
          <TariffCard
            title="Beginner"
            price="799 ₽/мес"
            subtitle="Для небольшого исследования"
            benefits={[
              'Безлимитная история запросов',
              'Безопасная сделка',
              'Поддержка 24/7'
            ]}
            isCurrent={true}
            type="Beginner"
          />
          <TariffCard
            title="Pro"
            price="1299 ₽/мес"
            subtitle="Для HR и фрилансеров"
            benefits={[
              'Все возможности Beginner',
              'Экспорт истории',
              'Расширенный доступ к источникам'
            ]}
            type="Pro"
          />
          <TariffCard
            title="Business"
            price="2379 ₽/мес"
            subtitle="Для корпоративных клиентов"
            benefits={[
              'Все возможности Pro',
              'Безлимитный доступ',
              'Премиум-поддержка'
            ]}
            type="Business"
          />
        </div>
      </section>
    </main>
  )
}

export default HomePage
