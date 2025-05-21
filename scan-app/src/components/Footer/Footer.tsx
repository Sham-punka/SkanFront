import styles from './Footer.module.css'
import logo from '@/assets/images/logo.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <img src={logo} alt="СКАН" className={styles.logo} />
        <span>© СКАН. Все права защищены.</span>
      </div>
      <div className={styles.right}>
        <Link to="#">Пользовательское соглашение</Link>
        <Link to="#">Политика конфиденциальности</Link>
      </div>
    </footer>
  )
}

export default Footer
