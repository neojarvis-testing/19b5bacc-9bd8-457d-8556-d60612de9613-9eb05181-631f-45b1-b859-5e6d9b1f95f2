import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../CustomerComponents/CustomerNavbar';
import GardenerNavbar from '../GardenerComponents/GardenerNavbar';

const HomePage = () => {
  const userName=localStorage.getItem('userName') || 'Guest';
  const role=localStorage.getItem('role') || 'Customer';
  const navigate=useNavigate();
  const handleLogout=()=>
  {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div>
      
      <span>{role === "Customer" ? <CustomerNavbar/> : <GardenerNavbar/>}</span>

      <div className="content text-center position-relative">
        <img src="gardenmentorcoverimage.jfif" alt="Garden Mentor Cover" className="cover-image mx-auto d-block"/>
        <h1 className='position-absolute top-50 start-50 translate-middle bg-white p-2'>Garden Mentor</h1> 
        <p className="text-black">
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
