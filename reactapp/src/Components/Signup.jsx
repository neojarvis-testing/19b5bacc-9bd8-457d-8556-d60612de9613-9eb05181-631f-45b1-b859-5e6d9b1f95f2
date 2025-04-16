import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/api/register', { username, email, mobileNumber, password, userRole });
            setShowModal(true);
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                        required 
                    />
                    {!username && <p>User Name is required</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        required 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    {!email && <p>Email is required</p>}
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input 
                        type="text" 
                        value={mobileNumber} 
                        onChange={(e) => setMobileNumber(e.target.value)} 
                        placeholder="Mobile Number" 
                        required 
                        pattern="^\d{10}$"
                    />
                    {!mobileNumber && <p>Mobile number is required</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                    />
                    {!password && <p>Password is required</p>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm Password" 
                        required 
                    />
                    {!confirmPassword && <p>Confirm Password is required</p>}
                </div>
                <div>
                    <label>Role:</label>
                    <select value={userRole} onChange={(e) => setUserRole(e.target.value)} required>
                        <option value="" disabled>Please select a role</option>
                        <option value="Customer">Customer</option>
                        <option value="Gardener">Gardener</option>
                    </select>
                </div>
                <button type="submit">Signup</button>
            </form>
            {message && <p>{message}</p>}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Signup successful! Please login.</p>
                        <button onClick={() => window.location.href = '/login'}>Ok</button>
                    </div>
                </div>
            )}
            <p>Already have an Account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
