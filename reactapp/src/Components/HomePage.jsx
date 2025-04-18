import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar bg="success" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Garden Mentor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home" className='home'>Home</Nav.Link>
            <Nav.Link href="#plant" className='plant'>Plant</Nav.Link>
            <Button variant="outline-danger" className="ml-2">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="content text-center position-relative">
        <img src="gardenmentorcoverimage.jfif" alt="Garden Mentor Cover" className="cover-image mx-auto d-block"/>
        <h1 className='position-absolute top-50 start-50 translate-middle bg-white p-2'>Garden Mentor</h1> 
        <p className="desc">
          Discover and nurture the perfect plants for your space with expert recommendations and personalized gardening tips. Browse 
          get tailored advice to make your gardening journey enjoyable and successful.
        </p>
        <div className="contact-section mt-5">
          <h2>Contact Us</h2>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
