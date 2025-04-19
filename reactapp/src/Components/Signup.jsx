import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        userRole: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();

    const validatePassword = (password) => {
        let passErrors = [];
   
        if (!password.trim()) {
            passErrors.push("Password is required.");
        }
        if (password.length < 6) {
            passErrors.push("Password must be at least 6 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            passErrors.push("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            passErrors.push("Password must contain at least one lowercase letter.");
        }
        if (!/\d/.test(password)) {
            passErrors.push("Password must contain at least one number.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passErrors.push("Password must contain at least one special character.");
        }
   
        return passErrors;
    };



    const validateForm = () => {
        const errors = {};
        const passwordErrors = validatePassword(formData.password);
        if (!formData.username.trim()) {
            errors.username = 'User Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } 
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!formData.mobileNumber.trim()) {
            errors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            errors.mobileNumber = 'Mobile number must be 10 digits';
        }
        if (passwordErrors.length > 0) {
            errors.password = passwordErrors.join("\n");
        }
        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.userRole.trim()) {
            errors.userRole = 'Please select a role';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        // const validationErrors = Object.keys(validateForm).reduce((acc, key) => {
        //     const error = validateForm[key](formData[key]);
        //     if (error) acc[key] = error;
        //     return acc;
        //   }, {});
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            await axios.post(`${API_BASE_URL}/register`, formData).then((res) => {
                setMessage('Successful!');
                setShowModal(true);

            }).catch(() => {
                setFormError("Signup failed!")
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Signup</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="username" style={{color: 'white'}}>User Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Username"
                                    />
                                    {errors.username && <small className="te" style={{color:'rgb(255, 145, 0)'}}>{errors.username}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" style={{color: 'white'}}>Email <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                    {errors.email && <small className="te" style={{color:'rgb(255, 145, 0)'}}>{errors.email}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="mobileNumber" style={{color: 'white'}}>Mobile Number <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        className="form-control"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
                                    />
                                    {errors.mobileNumber && <small className="te" style={{color:'rgb(255, 145, 0)'}}>{errors.mobileNumber}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" style={{color: 'white'}}>Password <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"

                                    />
                                    {errors.password && <small className="te" style={{color:'rgb(255, 145, 0)'}}>{errors.password}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword" style={{color: 'white'}}>Confirm Password <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"

                                    />
                                    {errors.confirmPassword && <small className="te" style={{color:'rgb(255, 145, 0)'}}>{errors.confirmPassword}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="userRole" style={{color: 'white'}}>Role <span className="text-danger">*</span></label>
                                    <select
                                        id="userRole"
                                        name="userRole"
                                        className="form-control"
                                        value={formData.userRole}
                                        onChange={handleChange}

                                    >
                                        <option value="">Please select a role</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Gardener">Gardener</option>
                                    </select>
                                    {errors.userRole && <small className="te" style={{color:'rgb(255, 145, 0)'}}>{errors.userRole}</small>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            {message && <p className="text-danger mt-3">{message}</p>}
                            {showModal && (
                                <div className="modal show d-block" tabIndex="-1">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Signup Successful</h5>
                                                <img src="plant.png" className='plant'></img>
                                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/login'}>Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <p className="mt-3" style={{color: 'white'}}>Already have an Account? <a href="/login" className='log'>Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
