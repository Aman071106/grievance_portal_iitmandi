import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api.js'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/signin', { email, password })
      navigate('/authorities')
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed')
    }
  }

  return (
    <div className="card light">
      <h2>Sign In</h2>
      <form onSubmit={onSubmit} className="form">
        <input type="email" placeholder="IIT Mandi Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="muted">New here? <Link to="/signup">Create an account</Link></div>
    </div>
  )
}


