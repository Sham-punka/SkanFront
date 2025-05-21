import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AuthData = {
  accessToken: string
  expire: string
  login: string // добавляем логин пользователя для отображения
}

type AuthContextType = {
  auth: AuthData | null
  isAuthenticated: boolean
  user: string | null
  login: (data: AuthData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthData | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      const parsed = JSON.parse(saved) as AuthData
      const isExpired = new Date(parsed.expire) < new Date()
      if (!isExpired) setAuth(parsed)
      else localStorage.removeItem('auth')
    }
  }, [])

  const login = (data: AuthData) => {
    localStorage.setItem('auth', JSON.stringify(data))
    setAuth(data)
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setAuth(null)
  }

  const isAuthenticated = !!auth?.accessToken
  const user = auth?.login ?? null

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
