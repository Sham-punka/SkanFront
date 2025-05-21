import axios from 'axios'

const api = axios.create({
  baseURL: 'https://gateway.scan-interfax.ru/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Подключение токена из localStorage
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('auth')
  if (stored) {
    const { accessToken } = JSON.parse(stored)
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default api
