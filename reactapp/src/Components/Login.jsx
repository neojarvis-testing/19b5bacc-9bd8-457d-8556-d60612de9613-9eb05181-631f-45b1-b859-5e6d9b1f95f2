import React, {useState} from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { Link } from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';

//import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message,setMessage] = useState('');
    // const navigate = useNavigate();
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
                const {token,role} = response.data;
                setMessage("vellipoooo raaa");
                localStorage.setItem('token',token);

                if(role === 'Gardener')
                {
                   // navigate('/GardenerNavbar');
                }
                else if(role === 'Customer')
                {
                   // navigate('/CustomerNavbar');
                }

            }catch(error)
            {
                setMessage("Login failed. Please check your credentials and try again");
            }
        }
    }
  return (
    <div className="login-page">
    <div className="info-section">
        <h1>Garden Mentor</h1>
        <p>
            Discover and nurture the perfect plants for your space with expert recommendations 
            and personalized gardening tips. Browse curated plant collections, explore trending 
            species, and get tailored advice to make your gardening journey enjoyable and successful.
        </p>
    </div>
    <div className="login-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                     
                />
                {emailError && <p className="error">{emailError}</p>}
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                     
                />
                {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <button type="submit">Login</button>
        </form>
        {message && <p className="error">{message}</p>}
        <p>Don't have an account? <a href="/register">Signup</a></p>
        <p>Don't have an account? <Link to="/register"></Link></p>
    </div>
  </div>

  )
}

export default Login