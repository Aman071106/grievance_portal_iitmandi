import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api.js'

export default function Inbox() {
  const { key } = useParams()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/grievances/authority/${key}`)
      .then(res => setItems(res.data.items || []))
      .catch(err => setError(err.response?.data?.message || 'Failed to load'))
  }, [key])

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/grievances/${id}/status`, { status })
      setItems(items => items.map(i => i._id === id ? { ...i, status } : i))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update')
    }
  }

  return (
    <div>
      <h2>{key?.toUpperCase()} Inbox</h2>
      {error && <div className="error">{error}</div>}
      <ul className="list">
        {items.map(g => (
          <li key={g._id} className="list-item">
            <div>
              <strong>{g.title}</strong>
              <div className="muted">by {g.author?.name} • {new Date(g.createdAt).toLocaleString()} • {g.status}</div>
            </div>
            <div>{g.description}</div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={() => setStatus(g._id, 'approved')}>Approve</button>
              <button onClick={() => setStatus(g._id, 'discarded')}>Discard</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


