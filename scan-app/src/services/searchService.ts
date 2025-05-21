import api from './api'

// Типы параметров
export type SearchOptions = {
  maxFullness: boolean
  inBusinessNews: boolean
  onlyMainRole: boolean
  excludeTechNews: boolean
  excludeAnnouncements: boolean
  excludeDigests: boolean
}

export type SearchRequest = {
  inn: string
  startDate: Date
  endDate: Date
  options: SearchOptions
}

// 🔧 Общая функция построения тела запроса
const buildSearchBody = (
  inn: string,
  startDate: Date,
  endDate: Date,
  options: SearchOptions,
  histogramTypes?: string[] // ← сюда передаём только для fetchHistograms
): any => {
  const body: any = {
    issueDateInterval: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            sparkId: null,
            entityId: null,
            inn: inn,
            maxFullness: options.maxFullness,
            inBusinessNews: options.inBusinessNews || null,
          },
        ],
        onlyMainRole: options.onlyMainRole,
        tonality: 'any',
        onlyWithRiskFactors: false,
        riskFactors: { and: [], or: [], not: [] },
        themes: { and: [], or: [], not: [] },
      },
      themesFilter: { and: [], or: [], not: [] },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: options.excludeTechNews,
      excludeAnnouncements: options.excludeAnnouncements,
      excludeDigests: options.excludeDigests,
    },
    similarMode: 'duplicates',
    limit: 1000,
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
    intervalType: 'month',
  }

  if (histogramTypes) {
    body.histogramTypes = histogramTypes
  }

  return body
}

// 📘 Гистограммы
export const fetchHistograms = async ({
  inn,
  startDate,
  endDate,
  options,
}: SearchRequest) => {
  const body = buildSearchBody(inn, startDate, endDate, options, [
    'totalDocuments',
    'riskFactors',
  ])
  const response = await api.post('/objectsearch/histograms', body)
  return response.data
}

// 📘 ID документов
export const fetchObjectSearch = async ({
  inn,
  startDate,
  endDate,
  options,
}: SearchRequest) => {
  const body = buildSearchBody(inn, startDate, endDate, options)
  const response = await api.post('/objectsearch', body)
  return response.data.items.map((item: any) => item.encodedId)
}

// 📘 Загрузка публикаций по ID
export const fetchDocuments = async (ids: string[]) => {
  const response = await api.post('/documents', { ids })
  return response.data.map((doc: any) => doc.ok)
}
