import React, { useState } from 'react';
import { login } from '../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(email, password);
            alert('Login successful!');
            window.location.href = '/dashboard';
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h3>Login to FixIt Hub</h3>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-2" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-control mb-2" />
            <button type="submit" className="btn btn-primary">Login</button>
            <p>
                Don't have an account? <a href="/signup">Sign up here</a>
            </p>
        </form>

    );
};

export default Login;
