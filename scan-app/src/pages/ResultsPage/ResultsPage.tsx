import { useEffect, useState } from 'react'
import { Publication, SearchRequest } from '@/types'
import { fetchDocuments } from '@/services/searchService'
import PublicationCard from '@/components/PublicationCard/PublicationCard'
import Loader from '@/components/Loader/Loader'
import styles from './ResultsPage.module.css'

const ResultsPage = () => {
  const [allIds, setAllIds] = useState<string[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)

  const RESULTS_PER_PAGE = 10

  useEffect(() => {
    const stored = sessionStorage.getItem('docIds')
    if (stored) {
      const ids = JSON.parse(stored) as string[]
      setAllIds(ids)
    }
  }, [])

  useEffect(() => {
    if (allIds.length > 0) {
      loadNextBatch()
    }
  }, [allIds])

  const loadNextBatch = async () => {
    const nextIds = allIds.slice(page * RESULTS_PER_PAGE, (page + 1) * RESULTS_PER_PAGE)
    if (nextIds.length === 0) return

    setLoading(true)
    try {
      const newDocs = await fetchDocuments(nextIds)
      setPublications((prev) => [...prev, ...newDocs])
      setPage((prev) => prev + 1)
    } catch (err) {
      alert('Ошибка при загрузке публикаций')
    } finally {
      setLoading(false)
    }
  }

  const canLoadMore = publications.length < allIds.length

  return (
    <main className={styles.wrapper}>
      <h1>Результаты поиска</h1>

      {publications.map((pub) => (
        <PublicationCard key={pub.id} data={pub} />
      ))}

      {loading && <Loader />}

      {!loading && canLoadMore && (
        <button className={styles.button} onClick={loadNextBatch}>
          Показать ещё
        </button>
      )}
    </main>
  )
}

export default ResultsPage
