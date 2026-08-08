import { useEffect, useState } from 'react'
import { fetchApiList } from './api'

const codespaceApiUrl = 'https://${import.meta.env.VITE_CODESPACE_NAME || "local"}-8000.app.github.dev/api/workouts'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApiList(codespaceApiUrl)
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <p>{codespaceApiUrl}</p>
      {loading && <div>Loading workouts...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && workouts.length === 0 && <div>No workouts found.</div>}
    </section>
  )
}
