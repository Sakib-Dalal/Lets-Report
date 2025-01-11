import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import necessary components for routing
import Login from './components/Login'; 
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
