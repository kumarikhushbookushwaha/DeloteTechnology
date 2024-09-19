// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear any authentication tokens or user data here
    toast.success('Logged out successfully', { position: 'top-right' });
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <Link to="/employees">Employee List</Link>
      <span>Welcome, {username}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
