import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerNavbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing tokens, etc.
    localStorage.removeItem('token');
    navigate('/login');
  };

  const userName=localStorage.getItem('userName') || 'Guest';
  const role=localStorage.getItem('role') || 'Customer';

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Navbar.Brand  href="#home"><b style={{fontSize:'20px'}}>Garden Mentor</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <div style={{marginLeft:'920px'}} className='text-white border border-white p-2'>
          <span >{userName}</span> / <span>{role}</span>
        </div>
          <Nav style={{height:'40px'}} className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} className="plant">
                Plant
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/cview">View Plant</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button style={{color:'white',backgroundColor:'red'}} className="ml-2" onClick={handleShow}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>No
            </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomerNavbar;