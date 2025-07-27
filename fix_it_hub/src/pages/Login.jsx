import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract user and tokens
      const { access, refresh, user } = response.data;

      // Store in localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      const displayName = user?.full_name || user?.email || 'User';
      setResponseMessage(`Welcome back, ${displayName}`);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        const detail = error.response.data?.detail || 'Invalid email or password';
        setResponseMessage(`Login failed: ${detail}`);
      } else {
        setResponseMessage('Login failed: Network or server error');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:
          <input
          placeholder='Enter your email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </label>

        <label>Password:
          <input
            placeholder='Enter your password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </label>

        <button type="submit">Login</button>
      </form>
       <p>
        Don't have an account? <a href="/Register">Register here</a>
      </p>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Login;
