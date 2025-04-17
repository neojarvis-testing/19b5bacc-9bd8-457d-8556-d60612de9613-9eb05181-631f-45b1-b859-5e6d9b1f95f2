<<<<<<< HEAD
import React from 'react'
//import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';
import './CustomerNavbar.css'
//import GardenerNavbar from '../GardenerComponents/GardenerNavbar';

const CustomerNavbar = () => {
  const handleLogout = () => {
    //localStorage.removeItem('token');
    //window.location.href = '/login';
  };
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand href="#home">Garden Mentor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Button variant="outline-light" className="dashboard-button">Dashboard / Gardener</Button>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#plant">Plant</Nav.Link>
        </Nav>
        <Button variant="danger" className="logout-button">Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomerNavbar
=======
>>>>>>> b5f4291e39a496d57d8d129826410e300d8d4013
