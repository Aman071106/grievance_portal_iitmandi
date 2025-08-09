import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'
import techImg from '../assets/tech_secy.png'
import generalImg from '../assets/general_secy.png'
import hostelImg from '../assets/hostel_secy.png'
import acadImg from '../assets/acad_secy.png'
import personIcon from '../assets/person.svg'

export default function Authorities() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/authorities')
      .then(res => setItems(res.data.items || []))
      .catch(err => setError(err.response?.data?.message || 'Failed to load'))
  }, [])

  return (
    <div>
      <h2>Choose a Secretary</h2>
      {error && <div className="error">{error}</div>}
      <div className="grid">
        {items.map(a => {
          const keyToImg = { tech: techImg, general: generalImg, hostel: hostelImg, acad: acadImg }
          const imgSrc = keyToImg[a.key] || personIcon
          return (
            <div key={a.key} className="card">
              <img src={imgSrc} alt={a.name} className="avatar" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = personIcon }} />
              <h3>{a.name}</h3>
              <p>{a.description}</p>
              <Link to={`/inbox/${a.key}`} className="btn">View Inbox</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}


