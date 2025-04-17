import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

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

    const validateForm = () => {
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = 'User Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!formData.mobileNumber.trim()) {
            errors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            errors.mobileNumber = 'Mobile number must be 10 digits';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
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
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('/api/register', formData);
                setShowModal(true);
            } catch (error) {
                setMessage('Signup failed. Please try again.');
            }
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
                                    <label htmlFor="username">User Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Username"
                                        required
                                    />
                                    {errors.username && <small className="text-danger">{errors.username}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="mobileNumber">Mobile Number <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        className="form-control"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
                                        required
                                    />
                                    {errors.mobileNumber && <small className="text-danger">{errors.mobileNumber}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        required
                                    />
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword">Confirm Password <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="userRole">Role <span className="text-danger">*</span></label>
                                    <select
                                        id="userRole"
                                        name="userRole"
                                        className="form-control"
                                        value={formData.userRole}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Please select a role</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Gardener">Gardener</option>
                                    </select>
                                    {errors.userRole && <small className="text-danger">{errors.userRole}</small>}
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
                                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                            </div>
                                            <div className="modal-body">
                                                <p>User Registration is Successful!</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/login'}>Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <p className="mt-3">Already have an Account? <a href="/login">Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
