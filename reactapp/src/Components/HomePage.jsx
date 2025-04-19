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

      <div style={{backgroundColor:'white'}} className="content text-center position-relative">

        <img src="MentorPot.png" alt="PotImage" className='pot1'></img>
        <img src="GarderMentor.png" alt="Garden Mentor Cover" className="img"/>
        <img src="MentorPot.png" alt="PotImage" className='pot2'></img>
        <div className='para'>
        <p className="text-black">
          Discover and nurture the perfect plants for your space with expert recommendations and personalized gardening tips. Browse
          get tailored advice to make your gardening journey enjoyable and successful.
        </p>
        </div>
        <div style={{backgroundColor:'#347b37'}} className="contact-section mt-5">
          <h2>Contact Us</h2>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
