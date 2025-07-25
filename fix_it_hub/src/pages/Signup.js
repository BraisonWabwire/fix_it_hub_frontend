import React, { useState } from 'react';
import { signup } from '../services/signup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await signup(email, password, username);
      alert('Account created! Please log in.');
      window.location.href = '/';
    } catch (err) {
      alert('Signup failed: ' + JSON.stringify(err.response?.data || err));
    }
  };

  return (
    <form onSubmit={handleSignup} className="container mt-5">
      <h3>Create an Account</h3>
      <input className="form-control mb-2" placeholder="Username (optional)" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input className="form-control mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <input className="form-control mb-2" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      <button className="btn btn-success" type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
