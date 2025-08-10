import React from 'react';
import { motion } from 'framer-motion';
import './MyGrievances.css';

const grievances = [
  {
    id: 1,
    title: 'Broken Chair in Classroom A',
    status: 'Pending',
    date: '2023-10-26',
    description: 'The chair in classroom A, row 3, seat 5 is broken and unusable.'
  },
  {
    id: 2,
    title: 'No Wi-Fi in Hostel Block C',
    status: 'Resolved',
    date: '2023-10-20',
    description: 'Wi-Fi is not working in any of the rooms in Hostel Block C since yesterday.'
  },
  {
    id: 3,
    title: 'Mess Food Quality Degradation',
    status: 'In Progress',
    date: '2023-10-18',
    description: 'The quality of food served in the mess has significantly degraded over the past week.'
  },
  {
    id: 4,
    title: 'Library Noise Issue',
    status: 'Pending',
    date: '2023-10-15',
    description: 'Students are making excessive noise in the silent zone of the library.'
  }
];

const MyGrievances = () => {
  return (
    <div className="my-grievances-container">
      <h1 className="page-title">My Grievances</h1>
      <div className="grievances-list">
        {grievances.map((grievance) => (
          <motion.div
            key={grievance.id}
            className="grievance-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: grievance.id * 0.1 }}
          >
            <div className="card-header">
              <h3>{grievance.title}</h3>
              <span className={`status ${grievance.status.toLowerCase().replace(' ', '-')}`}>
                {grievance.status}
              </span>
            </div>
            <p className="card-date">Filed on: {grievance.date}</p>
            <p className="card-description">{grievance.description}</p>
            <button className="view-details-button">View Details</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyGrievances;
