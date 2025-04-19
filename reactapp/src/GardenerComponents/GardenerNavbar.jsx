import React ,{useState}from 'react';
import { Navbar, Nav, Button, Dropdown, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './GardenerNavbar.css'; 


const GardenerNavbar = () => {
   const [show, setShow] = useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>
  {
    localStorage.clear();
    navigate('/');
  };

  const userName=localStorage.getItem('userName') || 'Guest';
  const role=localStorage.getItem('role') || 'Customer';
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
    <Navbar bg="success" variant="dark" expand="lg">
        <Navbar.Brand href="#home"><b style={{fontSize:'19px'}}>Garden Mentor</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <div style={{marginLeft:'50px'}} className='text-white border border-white p-2'>
          <span >{userName}</span> / <span>{role}</span>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{height:'40px'}} className="ml-auto">
            <Nav.Link href="/home" className='home'>Home</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} className="plant">
                Plant
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/Plant">Add Plant</Dropdown.Item>
                <Dropdown.Item href="/view">View Plant</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button style={{color:'white',backgroundColor:'red',height:'40px',width:'70px'}}  className="ml-2" onClick={handleShow}>Logout</button>
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
}

export default GardenerNavbar;
