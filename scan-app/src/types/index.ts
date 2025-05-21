export type Publication = {
  id: string                             
  title: { text: string }                
  issueDate: string                      
  url: string                            
  source: { name: string }               
  attributes: {
    isTechNews: boolean
    isAnnouncement: boolean
    isDigest: boolean
    wordCount: number
  }
  content: { markup: string }            
}

export type SearchRequest = {
  inn: string
  startDate: Date
  endDate: Date
  options: {
    maxFullness: boolean
    inBusinessNews: boolean | null
    onlyMainRole: boolean
    excludeTechNews: boolean
    excludeAnnouncements: boolean
    excludeDigests: boolean
  }
}
