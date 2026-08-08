import { useEffect, useState } from 'react'
import { fetchApiList } from './api'

const codespaceApiUrl = 'https://${import.meta.env.VITE_CODESPACE_NAME || "local"}-8000.app.github.dev/api/activities'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApiList(codespaceApiUrl)
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <p>{codespaceApiUrl}</p>
      {loading && <div>Loading activities...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && activities.length === 0 && <div>No activities found.</div>}
    </section>
  )
}
