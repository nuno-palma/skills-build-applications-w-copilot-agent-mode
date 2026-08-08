import { useEffect, useState } from 'react'
import { fetchApiList, formatItemLabel, getApiUrl, renderRecordFields } from './api'

export default function Teams() {
  const [teams, setTeams] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getApiUrl('teams')

    fetchApiList<Record<string, unknown>>(url)
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <p className="text-muted">Fetched from {getApiUrl('teams')}</p>

      {loading && <div className="alert alert-secondary">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-info">No teams found.</div>
      )}

      <div className="row g-3">
        {teams.map((team, index) => (
          <article key={formatItemLabel(team, index)} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{formatItemLabel(team, index)}</h3>
                {renderRecordFields(team)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
