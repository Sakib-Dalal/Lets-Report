import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

// LoginButton component inside MyNavBar
const LoginButton = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleLoginClick = () => {
      navigate('/login');  // Navigate to the login page
  };

  return (
      <button onClick={handleLoginClick} 
      className="btn btn-primary btn-sm signup-button">
          Login
      </button>
  );
};
const SignupButton = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleLoginClick = () => {
      navigate('/signup');  // Navigate to the login page
  };

  return (
    <button 
    onClick={handleSignupClick} 
    className="btn btn-primary btn-sm signup-button">
    Signup
  </button>
  
  );
};

function MyNavBar() {
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-body-white">
          <Container>
            <Navbar.Brand href="#home" className="title-color">
              Let's <span className="title-report">Report</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navtoggle">
              <img src="https://cdn-icons-png.flaticon.com/512/7066/7066144.png" className="image-toggle" />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home" className="dropdown-content">
                  All reports
                </Nav.Link>
                <Nav.Link href="#link" className="dropdown-content">
                </Nav.Link>
                <Nav.Link href="" className="dropdown-contentmr-50 ">
                   <LoginButton />
                </Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
      
      </div>
    </>
  );
}

export default MyNavBar;
