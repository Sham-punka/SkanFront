import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '@/components/Input/Input'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker'
import Checkbox from '@/components/Checkbox/Checkbox'
import Button from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import HistogramCarousel from '@/components/Carousel/HistogramCarousel'
import { validateInn, validateDateRange } from '@/utils/validators'
import {
  fetchHistograms,
  fetchObjectSearch,
  SearchRequest,
} from '@/services/searchService'
import styles from './SearchPage.module.css'

const SearchPage = () => {
  const navigate = useNavigate()

  const [inn, setInn] = useState('')
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [checkboxes, setCheckboxes] = useState({
    maxFullness: true,
    inBusinessNews: false,
    onlyMainRole: true,
    excludeTechNews: true,
    excludeAnnouncements: true,
    excludeDigests: true,
  })

  const [innError, setInnError] = useState('')
  const [rangeError, setRangeError] = useState('')
  const [loading, setLoading] = useState(false)
  const [histogramData, setHistogramData] = useState<any | null>(null)

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCheckboxes((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSearch = async () => {
    const [startDate, endDate] = dateRange
    const isInnValid = validateInn(inn)
    const isDateRangeValid = validateDateRange(startDate, endDate)

    setInnError(isInnValid ? '' : 'Неверный ИНН')
    setRangeError(isDateRangeValid ? '' : 'Неверный диапазон дат')
    if (!isInnValid || !isDateRangeValid) return

    const params: SearchRequest = {
      inn,
      startDate: startDate!,
      endDate: endDate!,
      options: checkboxes,
    }

    try {
      setLoading(true)
      setHistogramData(null)

      const histograms = await fetchHistograms(params)
      setHistogramData(histograms)

      const ids = await fetchObjectSearch(params)

      // сохраняем в sessionStorage
      sessionStorage.setItem('docIds', JSON.stringify(ids))
      sessionStorage.setItem('searchParams', JSON.stringify(params))

      // переход на ResultsPage
      navigate('/results')
    } catch (err) {
      alert('Ошибка при поиске. Повторите позже.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.wrapper}>
      <h1>Поиск публикаций</h1>

      <Input
        label="ИНН компании"
        name="inn"
        value={inn}
        onChange={(e) => setInn(e.target.value)}
        placeholder="10 или 12 цифр"
        error={innError}
      />

      <DateRangePicker
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={(range) => setDateRange(range)}
        error={rangeError}
      />

      <div className={styles.checkboxes}>
        {Object.entries(checkboxes).map(([key, value]) => (
          <Checkbox
            key={key}
            name={key}
            label={key}
            checked={value}
            onChange={handleCheckbox}
          />
        ))}
      </div>

      <Button onClick={handleSearch} disabled={loading}>
        {loading ? 'Поиск...' : 'Найти'}
      </Button>

      {loading && <Loader />}

      {histogramData && (
        <div className={styles.result}>
          <HistogramCarousel
            title="Количество публикаций"
            data={
              histogramData.data.find((h: any) => h.histogramType === 'totalDocuments')?.data || []
            }
          />
          <HistogramCarousel
            title="Факторы риска"
            data={
              histogramData.data.find((h: any) => h.histogramType === 'riskFactors')?.data || []
            }
          />
        </div>
      )}
    </main>
  )
}

export default SearchPage
