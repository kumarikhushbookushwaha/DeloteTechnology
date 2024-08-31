import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-center">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <p className="text-center">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <div className="w-100 mb-4 text-center">
            <hr className="d-inline-block w-40 hr-custom" />
            <span className="mx-2">Or</span>
            <hr className="d-inline-block w-40 hr-custom" />
          </div>
          <button className="btn btn-primary w-100 mb-3">
            <i className="fab fa-facebook-f"></i> Login with Facebook
          </button>
          <button className="btn btn-danger w-100 mb-3">
            <i className="fab fa-google"></i> Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
