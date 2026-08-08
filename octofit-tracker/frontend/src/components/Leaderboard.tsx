import { useEffect, useState } from 'react'
import { fetchApiList, formatItemLabel, getApiUrl, renderRecordFields } from './api'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getApiUrl('leaderboard')

    fetchApiList<Record<string, unknown>>(url)
      .then(setLeaders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="text-muted">Fetched from {getApiUrl('leaderboard')}</p>

      {loading && <div className="alert alert-secondary">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && leaders.length === 0 && (
        <div className="alert alert-info">No leaderboard data found.</div>
      )}

      <div className="row g-3">
        {leaders.map((leader, index) => (
          <article key={formatItemLabel(leader, index)} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{formatItemLabel(leader, index)}</h3>
                {renderRecordFields(leader)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
