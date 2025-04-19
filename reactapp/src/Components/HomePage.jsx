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

      <div style={{backgroundColor:'#1a7446'}} className="content text-center position-relative">
        <img src="GardenMentor.png" alt="Garden Mentor Cover" className="img"/>
        <div className='para'>
        <p className="text-black">
          Discover and nurture the perfect plants for your space with expert recommendations and personalized gardening tips. Browse
          get tailored advice to make your gardening journey enjoyable and successful.
        </p>
        </div>
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
