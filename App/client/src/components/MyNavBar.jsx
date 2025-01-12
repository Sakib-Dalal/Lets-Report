import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function MyNavBar() {
  return (
    <>
    <div>
      <Navbar expand="lg" className="bg-body-white">
      <Container>
        <Navbar.Brand href="#home" className='title-color'>Let's <span className='title-report'>Report</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='navtoggle'> <img src="/navbar-toggle.png" className='image-toggle' /> </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='dropdown-content'>All reports</Nav.Link>
            <Nav.Link href="#link" className='dropdown-content'>Local Alert</Nav.Link>
            <Nav.Link href="#link" className='dropdown-content'>Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      
    </div>
    </>
  );
}

export default MyNavBar;