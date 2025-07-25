import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get('/api/jobs/')  // Your Django job endpoint
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Available Jobs</h2>
      <ul className="list-group">
        {jobs.map(job => (
          <li className="list-group-item" key={job.id}>{job.title} - {job.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
