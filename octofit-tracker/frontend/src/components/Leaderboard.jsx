import { useEffect, useState } from 'react'
import { fetchApiList } from './api'

const codespaceApiUrl = 'https://${import.meta.env.VITE_CODESPACE_NAME || "local"}-8000.app.github.dev/api/leaderboard'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApiList(codespaceApiUrl)
      .then(setLeaders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>{codespaceApiUrl}</p>
      {loading && <div>Loading leaderboard...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && leaders.length === 0 && <div>No leaderboard data found.</div>}
    </section>
  )
}
