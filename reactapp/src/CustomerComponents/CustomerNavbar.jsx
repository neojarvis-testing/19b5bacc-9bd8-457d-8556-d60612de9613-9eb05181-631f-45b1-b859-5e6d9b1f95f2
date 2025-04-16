import React from 'react'
import { Link } from 'react-router-dom'

const CustomerNavbar = () => {
  const handleLogout = () => {
    //localStorage.removeItem('token');
    //window.location.href = '/login';
  };
  return (
    <nav>
      <ul>
        
        <li><Link to="/customer/home">Home</Link></li>
        <li><Link to="/customer/plant">Plant</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  )
}

export default CustomerNavbar