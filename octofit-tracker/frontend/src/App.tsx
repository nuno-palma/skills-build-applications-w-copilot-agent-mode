import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const links = [
  { path: '/', label: 'Home' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
]

function Home() {
  return (
    <section>
      <h2>Octofit Tracker</h2>
      <p className="lead">
        Browse the activity tracker data from the backend API using React Router and Vite environment
        variables.
      </p>
      <p>
        The app uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to build the endpoint
        URL for the backend at <code>https://&lt;codespace-name&gt;-8000.app.github.dev/api/&lt;component&gt;/</code>.
      </p>
      <div className="alert alert-warning">
        If <code>VITE_CODESPACE_NAME</code> is not defined, the application falls back to
        <code>http://localhost:8000/api/&lt;component&gt;/</code>.
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-3">Octofit Tracker</h1>
        <nav className="nav nav-pills flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ' text-secondary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
