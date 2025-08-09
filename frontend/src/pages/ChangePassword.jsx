import { useState } from 'react'
import api from '../services/api.js'

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage(''); setError('')
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword })
      setMessage('Password updated')
      setCurrentPassword(''); setNewPassword('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update')
    }
  }

  return (
    <div className="card">
      <h2>Change Password</h2>
      <form onSubmit={onSubmit} className="form">
        <input type="password" placeholder="Current password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} required />
        <input type="password" placeholder="New password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  )
}


