import React from 'react';

const Dashboard = ({ username }) => {
  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body'>
          <h1 className='card-title'>Welcome, {username}!</h1>
          <p className='card-text'>This is your dashboard. Here you can manage your activities and view your stats.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
