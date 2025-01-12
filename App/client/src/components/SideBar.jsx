// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="bg-light border-right fixed-left" style={{ width: '250px', height: '100vh' }}>
      <div className="sidebar-heading">Let's Report</div>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/trending">Trending Issues</Nav.Link>
        <Nav.Link href="/types">Types of Issues</Nav.Link>
        <Nav.Link href="/issues">Issues</Nav.Link>
        <Nav.Link href="/analytics">Analytics</Nav.Link>
        <Nav.Link href="/settings">Account Settings</Nav.Link>
        <Nav.Link href="/logout">Log out</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
