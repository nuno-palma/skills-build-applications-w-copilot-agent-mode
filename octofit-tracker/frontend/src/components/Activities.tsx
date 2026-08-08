import { useEffect, useState } from 'react'
import { fetchApiList, formatItemLabel, getApiUrl, renderRecordFields } from './api'

export default function Activities() {
  const [activities, setActivities] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getApiUrl('activities')

    fetchApiList<Record<string, unknown>>(url)
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <p className="text-muted">Fetched from {getApiUrl('activities')}</p>

      {loading && <div className="alert alert-secondary">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-info">No activities found.</div>
      )}

      <div className="row g-3">
        {activities.map((activity, index) => (
          <article key={formatItemLabel(activity, index)} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{formatItemLabel(activity, index)}</h3>
                {renderRecordFields(activity)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
