import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './HistogramCarousel.module.css'

type HistogramItem = {
  date: string
  value: number
}

type Props = {
  title: string
  data: HistogramItem[]
}

const HistogramCarousel = ({ title, data }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={12}
        slidesPerView={5}
        breakpoints={{
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
        }}
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.date}>{new Date(item.date).toLocaleDateString()}</div>
              <div className={styles.value}>{item.value}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HistogramCarousel
