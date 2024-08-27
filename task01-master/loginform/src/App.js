import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm'; 
import SignupForm from './SignupForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
