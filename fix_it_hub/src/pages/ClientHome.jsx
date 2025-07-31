import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ClientHome.css';

const ClientHome = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch handyman profiles on mount
  useEffect(() => {
    const fetchProfiles = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in to view profiles');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/handyman-profiles/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_role');
          localStorage.removeItem('user');
          navigate('/login');
        } else {
          setError('Failed to load profiles. Please try again.');
        }
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Check user role
  const userRole = localStorage.getItem('user_role');
  if (userRole !== 'client') {
    navigate('/login');
    return null;
  }

  return (
    <div className="client-home-container">
      <div className="side-nav">
        <div className="logo">
          <h3>Client Dashboard</h3>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="main-content">
        <h2>Welcome, Client!</h2>
        <h3>Handyman Profiles</h3>
        {loading && <p>Loading profiles...</p>}
        {error && <p className="error-message">{error}</p>}
        {profiles.length === 0 && !loading && !error && <p>No handyman profiles available.</p>}
        <div className="profiles-list">
          {profiles.map((profile) => (
            <div key={profile.handyman.user_id} className="profile-card">
              <h4>{profile.handyman.full_name} ({profile.category})</h4>
              <p><strong>Email:</strong> {profile.handyman.email}</p>
              <p><strong>Phone:</strong> {profile.handyman.phone}</p>
              <p><strong>Location:</strong> {profile.handyman.location}</p>
              <p><strong>Experience:</strong> {profile.experience_years} years</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              <p><strong>Rating:</strong> {profile.rating} / 5</p>
              <p><strong>Jobs Completed:</strong> {profile.jobs_completed}</p>
              <p><strong>Verified:</strong> {profile.is_verified ? 'Yes' : 'No'}</p>
              <p><strong>Plan:</strong> {profile.subscription_plan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientHome;