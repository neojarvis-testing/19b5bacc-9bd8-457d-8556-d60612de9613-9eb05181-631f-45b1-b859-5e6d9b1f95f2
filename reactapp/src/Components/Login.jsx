import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        if(!email){
            setEmailError('Email is required');
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
        
    }
  return (
    <div>Login</div>
  )
}

export default Login