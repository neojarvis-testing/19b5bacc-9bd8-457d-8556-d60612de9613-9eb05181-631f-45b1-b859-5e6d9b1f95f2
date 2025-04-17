import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">Oops! Something Went Wrong</h1>
      <p className="text-muted">Please try again later.</p>
      <img src="alert.png" alt="Alert Icon" className="img-fluid mt-3"/>
    </div>
  );
}

export default ErrorPage;
