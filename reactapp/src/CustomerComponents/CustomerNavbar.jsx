import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerNavbar.css'


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
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <div className='d-flex gap-2 align-items-center'>
            <img src="./sunflower.svg" alt="nav-icon" className='logo'/>
          <h2 className="text-white">Garden Mentor</h2>
          </div>
          <div className="d-flex justyfy-content-between align-items-center gap-4">
            <div style={{ marginLeft: '50px' }} className='text-white border border-white p-2'> <span >{userName}</span> / <span>{role}</span> </div>
            <span onClick={() => navigate('/home')} className='text-white pointer'>Home</span>

            <Dropdown className="transparent-dropdown">
              <Dropdown.Toggle as="span" className="cursor text-white cursor-pointer">
                Plant
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/cview">View Plant</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <button className="btn btn-outline-light mx-2" onClick={handleShow}>Logout</button>
          </div>
        </div>
      </nav>

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