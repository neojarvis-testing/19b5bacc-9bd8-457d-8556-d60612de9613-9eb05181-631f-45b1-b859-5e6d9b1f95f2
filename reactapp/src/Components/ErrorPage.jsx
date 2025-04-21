import React from 'react';
import './ErrorPage.css';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';



const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column text-center justify-content-center align-items-center pt-3'>
      <h1 className="text-danger">Oops! Something Went Wrong</h1>
      <p className="text-muted">Please try again later.</p>
      <img src="Error.png" alt="Alert Icon" className="im2"/>
      <span> <Link to="/home" className='text-success'>Click here</Link><span className='text-black'> to navigate Home</span></span>
    </div>
  );
}

export default ErrorPage;
