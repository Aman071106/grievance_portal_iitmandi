import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api.js'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/signup', { name, email, password })
      navigate('/authorities')
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed')
    }
  }

  return (
    <div className="card light">
      <h2>Create Account</h2>
      <form onSubmit={onSubmit} className="form">
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
        <input type="email" placeholder="IIT Mandi Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="muted">Already have an account? <Link to="/">Sign in</Link></div>
    </div>
  )
}


