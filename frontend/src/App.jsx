import { Outlet, Link, useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  return (
    <div className="app">
      <header className="header">
        <div className="brand" onClick={() => navigate('/')}>IIT Mandi Grievance Portal</div>
        <nav>
          <Link to="/">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/authorities">Authorities</Link>
          <Link to="/create">Post Grievance</Link>
          <Link to="/my">My Grievances</Link>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}

export default App
