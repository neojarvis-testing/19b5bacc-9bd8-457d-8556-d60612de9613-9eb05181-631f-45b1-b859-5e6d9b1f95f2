import React, {useState} from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import './Login.css';
import {useNavigate} from 'react-router-dom';
 
//import {useNavigate} from 'react-router-dom';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    //const navigate = useNavigate();
 
    const validateForm = () => {
        let valid = true;
        if(!email){
            setEmailError('Email is required');
            valid = false;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setEmailError('Invalid Email');
            valid = false;
        }
        else{
            setEmailError('');
        }
 
        if(!password){
            setPasswordError('Password is required');
            valid = false;
        }
        else{
            setPasswordError('');
        }
        return valid;
       
    };
 
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(validateForm()){
            try{
                const response = await axios.post(`${API_BASE_URL}/login`,{email,password});
                const {token} = response.data;
                localStorage.setItem('token',token);
                const tokenDecoded = jwtDecode(token);
                console.log(tokenDecoded);
                const userName = tokenDecoded.name;
                const role = tokenDecoded.role;
                localStorage.setItem('userName',userName);
                localStorage.setItem('role',role);
                navigate('/home');
 
            }catch(error)
            {
                setMessage("Login failed. Please check your credentials and try again");
            }
        }
    }
    return (
      <div className="login-page container">
        <div className="row">
          <div className="info-section col-md-6">
            <h1>Garden Mentor</h1>
            <p>
              Discover and nurture the perfect plants for your space with expert recommendations
              and personalized gardening tips. Browse curated plant collections, explore trending
              species, and get tailored advice to make your gardening journey enjoyable and successful.
          </p>
          <img src='logoimage.png' className='logoimg'></img>
      </div>
      <div className="login-section col-md-6">
      <h2 className='head2'>Login</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label style={{color:"white"}}>Email</label>

                  <input 
                      type="text"
                      className="form-control" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="Email" 
                       
                  />
                  {emailError && <p className="error">{emailError}</p>}
              </div>
              <div className="form-group">
                <label style={{color:"white"}}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {passwordError && <p style={{color:"rgb(26, 255, 0)"}}>{passwordError}</p>}
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {message && <p className="error text-danger">{message}</p>}
            <p>Don't have an account? <Link to="/register" className='linking'>Signup</Link></p>
            
            
          </div>
        </div>
      </div>
    );  
}
 
export default Login