import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import { useEffect, useState } from 'react'
import api from '@/services/api'
import styles from './Header.module.css'
import logo from '@/assets/images/logo.svg'
import avatar from '@/assets/icons/avatar.svg'
import Loader from '@/components/Loader/Loader'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [limitData, setLimitData] = useState<{ used: number; limit: number } | null>(null)
  const [loadingLimit, setLoadingLimit] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setLoadingLimit(true)
      api
        .get('/account/info')
        .then((res) => {
          const info = res.data.eventFiltersInfo
          setLimitData({ used: info.usedCompanyCount, limit: info.companyLimit })
        })
        .finally(() => setLoadingLimit(false))
    }
  }, [isAuthenticated])

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="СКАН" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link to="/">Главная</Link>
        <a href="#">Тарифы</a>
        <a href="#">FAQ</a>
      </nav>

      <div className={styles.right}>
        {isAuthenticated ? (
          <>
            {loadingLimit ? (
              <Loader />
            ) : (
              limitData && (
                <div className={styles.limitBox}>
                  <div>Использовано компаний: {limitData.used}</div>
                  <div>Лимит по тарифу: {limitData.limit}</div>
                </div>
              )
            )}
            <div className={styles.profile}>
              <span>{user}</span>
              <img src={avatar} alt="avatar" className={styles.avatar} />
              <button onClick={logout}>Выйти</button>
            </div>
          </>
        ) : (
          <div className={styles.auth}>
            <a href="#">Зарегистрироваться</a>
            <button onClick={() => navigate('/login')}>Войти</button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
