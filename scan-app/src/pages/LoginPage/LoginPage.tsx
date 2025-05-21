import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import Input from '../../components/Input/Input'
import Button from '@/components/Button/Button'
import axios from 'axios'
import styles from './LoginPage.module.css'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({ login: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      login({
        accessToken: res.data.accessToken,
        expire: res.data.expire,
        login: formData.login,
      })

      navigate('/search')
    } catch (err) {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <div className={styles.container}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Логин"
          name="login"
          value={formData.login}
          onChange={handleChange}
        />
        <Input
          label="Пароль"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <div className={styles.error}>{error}</div>}
        <Button type="submit">Войти</Button>
      </form>
    </div>
  )
}

export default LoginPage
