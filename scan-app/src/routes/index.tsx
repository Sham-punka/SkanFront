import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import SearchPage from '@/pages/SearchPage/SearchPage'
import ResultsPage from '@/pages/ResultsPage/ResultsPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  )
}

export default AppRoutes
