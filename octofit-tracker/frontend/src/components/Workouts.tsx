import { useEffect, useState } from 'react'
import { fetchApiList, formatItemLabel, getApiUrl, renderRecordFields } from './api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getApiUrl('workouts')

    fetchApiList<Record<string, unknown>>(url)
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <p className="text-muted">Fetched from {getApiUrl('workouts')}</p>

      {loading && <div className="alert alert-secondary">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-info">No workouts found.</div>
      )}

      <div className="row g-3">
        {workouts.map((workout, index) => (
          <article key={formatItemLabel(workout, index)} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{formatItemLabel(workout, index)}</h3>
                {renderRecordFields(workout)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
