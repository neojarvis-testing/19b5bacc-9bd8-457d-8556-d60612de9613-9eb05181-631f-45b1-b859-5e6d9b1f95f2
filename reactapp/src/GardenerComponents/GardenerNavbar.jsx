import React ,{useState}from 'react';
import { Navbar, Nav, Button, Dropdown, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './GardenerNavbar.css'; 


const GardenerNavbar = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/home";
  const isAdd = location.pathname === "/Plant";
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
    <div className='w-100' style={{backgroundColor: isHomeRoute || isAdd ? "rgba(255,228,196,0.7)" : "", borderRadius: "10px"}}>
      
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
        <div className='d-flex gap-2 align-items-center'>
            <img src="./sunflower.svg" alt="nav-icon" className='logo'/>
          <h2 className="text-white">Garden Mentor</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-4 font-weight-bold">
            <div style={{ marginLeft: '50px' }} className='text-white border border-white p-2'> <span >{userName}</span> / <span>{role}</span> </div>
            <span onClick={() => navigate('/home')} className='text-white pointer'>Home</span>

            <Dropdown className='transparent-dropdown'>
              <Dropdown.Toggle as="span" className="cursor text-white cursor-pointer">Plant</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/Plant">Add Plant</Dropdown.Item>
                <Dropdown.Item href="/view">View Plant</Dropdown.Item>
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
    </div>  
  );
}

export default GardenerNavbar;
