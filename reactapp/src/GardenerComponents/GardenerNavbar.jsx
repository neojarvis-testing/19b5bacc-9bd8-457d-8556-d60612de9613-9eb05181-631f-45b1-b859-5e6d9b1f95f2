import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './GardenerNavbar.css'; 

const GardenerNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand href="#home">Garden Mentor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Button variant="outline-light" className="dashboard-button">Dashboard / Customer</Button>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#plant">Plant</Nav.Link>
        </Nav>
        <Button variant="danger" className="logout-button">Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default GardenerNavbar;
