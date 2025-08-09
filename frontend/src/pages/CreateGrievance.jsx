import { useEffect, useState } from 'react'
import api from '../services/api.js'

export default function CreateGrievance() {
  const [authorities, setAuthorities] = useState([])
  const [authorityKey, setAuthorityKey] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/authorities').then(res => {
      setAuthorities(res.data.items)
      if (res.data.items?.length) setAuthorityKey(res.data.items[0].key)
    })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(''); setMessage('')
    if (!confirm('Are you sure you want to post this grievance?')) return
    try {
      await api.post('/grievances', { authorityKey, title, description })
      setMessage('Grievance posted!')
      setTitle(''); setDescription('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post')
    }
  }

  return (
    <div className="card">
      <h2>Post a Grievance</h2>
      <form onSubmit={onSubmit} className="form">
        <select value={authorityKey} onChange={e=>setAuthorityKey(e.target.value)}>
          {authorities.map(a => (<option key={a.key} value={a.key}>{a.name}</option>))}
        </select>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea placeholder="Describe your grievance..." value={description} onChange={e=>setDescription(e.target.value)} required />
        <button type="submit">Post</button>
      </form>
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
    </div>
  )
}


