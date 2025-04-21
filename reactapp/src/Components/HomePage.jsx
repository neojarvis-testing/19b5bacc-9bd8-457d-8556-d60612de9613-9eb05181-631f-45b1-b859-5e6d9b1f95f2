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
    <div className='home'>
      <div className='content d-flex flex-column justify-content-between'>
        <div>
          <span className='bar'>{role === "Customer" ? <CustomerNavbar /> : <GardenerNavbar />}</span>
        </div>

        <span className='heading text-center' >Garden Mentor</span>

        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className='px-5 text-center border border-white w-50'>
            <span className="details">
              Discover and nurture the perfect plants for your space with expert recommendations and personalized gardening tips. Browse
              get tailored advice to make your gardening journey enjoyable and successful.
            </span>
          </div>

          <div className="contact mt-5 text-center">
            <h2>Contact Us</h2>
            <p className='details'>Email: example@example.com</p>
            <p className='details'>Phone: 123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
