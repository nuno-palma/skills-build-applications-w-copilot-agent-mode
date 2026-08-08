import { useEffect, useState } from 'react'
import { fetchApiList } from './api'

const codespaceApiUrl = 'https://${import.meta.env.VITE_CODESPACE_NAME || "local"}-8000.app.github.dev/api/teams'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApiList(codespaceApiUrl)
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <p>{codespaceApiUrl}</p>
      {loading && <div>Loading teams...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && teams.length === 0 && <div>No teams found.</div>}
    </section>
  )
}
