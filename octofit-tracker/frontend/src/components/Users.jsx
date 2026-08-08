import { useEffect, useState } from 'react'
import { fetchApiList } from './api'

const codespaceApiUrl = 'https://${import.meta.env.VITE_CODESPACE_NAME || "local"}-8000.app.github.dev/api/users'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApiList(codespaceApiUrl)
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p>{codespaceApiUrl}</p>
      {loading && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && users.length === 0 && <div>No users found.</div>}
    </section>
  )
}
