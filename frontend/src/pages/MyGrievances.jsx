import { useEffect, useState } from 'react'
import api from '../services/api.js'

export default function MyGrievances() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/grievances/mine')
      .then(res => setItems(res.data.items || []))
      .catch(err => setError(err.response?.data?.message || 'Failed to load'))
  }, [])

  return (
    <div>
      <h2>My Grievances</h2>
      {error && <div className="error">{error}</div>}
      <ul className="list">
        {items.map(g => (
          <li key={g._id} className="list-item">
            <div>
              <strong>{g.title}</strong>
              <div className="muted">to {g.authorityKey} • {new Date(g.createdAt).toLocaleString()} • status: {g.status}</div>
            </div>
            <div>{g.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}


