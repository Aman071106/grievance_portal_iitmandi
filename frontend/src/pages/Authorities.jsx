import React from 'react';
import { motion } from 'framer-motion';
import './Authorities.css';

import acad_secy from '../assets/acad_secy.png';
import general_secy from '../assets/general_secy.png';
import hostel_secy from '../assets/hostel_secy.png';
// import tech_secy from '../assets/tech_secy.png';
import imageNotFound from '../assets/image_not_found.svg';

const authorities = [
  {
    id: 1,
    name: 'Academic Secretary',
    role: 'Manages academic grievances',
    image: acad_secy,
  },
  {
    id: 2,
    name: 'Cultural Secretary',
    role: 'Handles cultural event issues',
    image: cult_secy,
  },
  {
    id: 3,
    name: 'General Secretary',
    role: 'Oversees general administration',
    image: general_secy,
  },
  {
    id: 4,
    name: 'Hostel Secretary',
    role: 'Addresses hostel-related complaints',
    image: hostel_secy,
  },
  {
    id: 5,
    name: 'Technical Secretary',
    role: 'Resolves technical infrastructure issues',
    image: imageNotFound,
  },
];

const Authorities = () => {
  const handleImageError = (e) => {
    e.target.src = imageNotFound;
    e.target.onerror = null; // Prevent infinite loop if fallback also fails
  };

  return (
    <div className="authorities-container">
      <h1 className="page-title">Authorities</h1>
      <div className="authorities-grid">
        {authorities.map((authority) => (
          <motion.div
            key={authority.id}
            className="authority-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: authority.id * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={authority.image} 
              alt={authority.name} 
              className="authority-image" 
              onError={handleImageError} 
            />
            <h3 className="authority-name">{authority.name}</h3>
            <p className="authority-role">{authority.role}</p>
            <button className="contact-button">Contact</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Authorities;
