import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponseMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Extract user and tokens
      const { access, refresh, user } = response.data;

      // Store in localStorage
      localStorage.setItem('access_token', access); // Changed to match ClientHome.js
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_role', user.role); // Store role for ClientHome.js
      localStorage.setItem('user', JSON.stringify(user));

      const displayName = user?.full_name || user?.email || 'User';
      setResponseMessage(`Welcome back, ${displayName}`);

      // Redirect based on role
      if (user.role === 'client') {
        setTimeout(() => navigate('/client-home'), 1000); // Delay for user to see message
      } else {
        setResponseMessage(`Welcome, ${displayName}! Role: ${user.role} (No homepage for this role yet)`);
        // Optionally redirect to a default page or show a message
        // Example: navigate('/dashboard') for handyman/admin in future
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        const detail = error.response.data?.detail || 'Invalid email or password';
        setResponseMessage(`Login failed: ${detail}`);
      } else {
        setResponseMessage('Login failed: Network or server error');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login to FixItHub</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      {responseMessage && <p className={responseMessage.includes('failed') ? 'error-message' : 'success-message'}>{responseMessage}</p>}
    </div>
  );
}

export default Login;