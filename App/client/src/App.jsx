import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import necessary components for routing
import Login from './components/Login'; 
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PostDetail from './components/PostDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/:reportid" element={<PostDetail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
