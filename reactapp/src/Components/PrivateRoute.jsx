import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
 
const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
 
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; 
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
 
const PrivateRoute = ({ children, requiredRole }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/" replace />;
  }
 
  if (role !== requiredRole) {
    return (
      <div className="text-center pt-5">
        <h1 className="text-danger">Access Denied</h1>
        <p className='text-black'>You do not have permission to access this page.</p>
        <img style={{height:'400px',width:'550px'}} src="accessimg.png"></img><br />
        <span className='fs-4'> <Link to="/home" className='text-success'>Click here</Link><span className='text-black'> to navigate Home</span></span>
      </div>
    );
  }

  return children;
};
 
export default PrivateRoute;