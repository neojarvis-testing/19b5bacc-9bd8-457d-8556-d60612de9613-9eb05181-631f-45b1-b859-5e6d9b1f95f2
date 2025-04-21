import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className='d-flex flex-column text-center justify-content-center align-items-center pt-3'>
      <h1 className="text-danger">Oops! Something Went Wrong</h1>
      <p className="text-muted">Please try again later.</p>
      <img src="Error.png" alt="Alert Icon" className="im2"/>
    </div>
  );
}

export default ErrorPage;
