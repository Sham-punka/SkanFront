import { Publication } from '../../types'
import styles from './PublicationCard.module.css'

type Props = {
  data: Publication
}

const PublicationCard = ({ data }: Props) => {
  const tags: string[] = []
  if (data.attributes.isTechNews) tags.push('Технические новости')
  if (data.attributes.isAnnouncement) tags.push('Анонсы')
  if (data.attributes.isDigest) tags.push('Сводки')

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.date}>
          {new Date(data.issueDate).toLocaleDateString()}
        </span>
        <a className={styles.source} href={data.url} target="_blank" rel="noreferrer">
          {data.source.name}
        </a>
      </div>

      <h3 className={styles.title}>{data.title.text}</h3>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data.content.markup }}
      />

      <div className={styles.footer}>
        <a href={data.url} target="_blank" rel="noreferrer">
          Читать в источнике
        </a>
        <span>{data.attributes.wordCount} слов</span>
      </div>
    </div>
  )
}

export default PublicationCard
