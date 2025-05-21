import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './WhyUsCarousel.module.css'

import arrowLeft from '../../assets/icons/arrow-left.svg'
import arrowRight from '../../assets/icons/arrow-right.svg'

type Slide = {
  icon: string
  title: string
  description: string
}

type Props = {
  slides: Slide[]
}

const WhyUsCarousel = ({ slides }: Props) => {
  return (
    <div className={styles.wrapper}>
      {/* Кастомные стрелки */}
      <div className={styles.navLeft} id="why-prev">
        <img src={arrowLeft} alt="Назад" />
      </div>
      <div className={styles.navRight} id="why-next">
        <img src={arrowRight} alt="Вперёд" />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        navigation={{
          prevEl: '#why-prev',
          nextEl: '#why-next',
        }}
        slidesPerView={3}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <div className={styles.card}>
              <img src={slide.icon} alt="" className={styles.icon} />
              <h4>{slide.title}</h4>
              <p>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default WhyUsCarousel
