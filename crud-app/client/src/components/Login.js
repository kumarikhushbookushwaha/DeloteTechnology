// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/login', credentials)
      .then((response) => {
        toast.success('Login successful', { position: 'top-right' });
        navigate('/dashboard');
      })
      .catch(error => toast.error('Login failed', { position: 'top-right' }));
  };

  return (
    <div className='login'>
      <h3>Login</h3>
      <form onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input type="text" onChange={inputHandler} id="username" name="username" autoComplete='off' placeholder='Username' />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='Password' />
        </div>
        <div className="inputGroup">
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
