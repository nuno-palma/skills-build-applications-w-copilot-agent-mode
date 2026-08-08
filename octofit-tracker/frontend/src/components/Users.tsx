import { useEffect, useState } from 'react'
import { fetchApiList, formatItemLabel, getApiUrl, renderRecordFields } from './api'

export default function Users() {
  const [users, setUsers] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = getApiUrl('users')

    fetchApiList<Record<string, unknown>>(url)
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p className="text-muted">Fetched from {getApiUrl('users')}</p>

      {loading && <div className="alert alert-secondary">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-info">No users found.</div>
      )}

      <div className="row g-3">
        {users.map((user, index) => (
          <article key={formatItemLabel(user, index)} className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{formatItemLabel(user, index)}</h3>
                {renderRecordFields(user)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
