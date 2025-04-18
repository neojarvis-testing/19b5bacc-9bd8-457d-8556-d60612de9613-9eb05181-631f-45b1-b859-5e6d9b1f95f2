import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GardenerNavbar from './GardenerNavbar';
import API_BASE_URL from '../apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlantForm = ({ isEditing, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        tips: '',
        plantImage: null,
    });
    const [fileName, setFileName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Populate formData when editing and initialData is provided
    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || '',
                price: initialData.price || '',
                tips: initialData.tips || '',
                plantImage: initialData.plantImage || null,
            });
        }
    }, [isEditing, JSON.stringify(initialData)]);
    

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.tips) newErrors.tips = 'Tips are required';
        if (!formData.plantImage) newErrors.plantImage = 'Plant image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: reader.result, // Store the base64-encoded image
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (isEditing) {
                const response = await axios.put(
                    `${API_BASE_URL}/Plant/${id}`,
                    formData,
                    { headers }
                );
                console.log('Plant updated successfully:', response.data);
            } else {
                const response = await axios.post(
                    `${API_BASE_URL}/Plant`,
                    formData,
                    { headers }
                );
                console.log('Plant added successfully:', response.data);
            }

            setLoading(false);
            setShowPopup(true);
        } catch (error) {
            setLoading(false);
            console.error('Error saving plant:', error);

            if (error.response) {
                console.error('Error response:', error.response.data); // Log backend error details
            } else if (error.request) {
                console.error('No response received:', error.request); // Log request details if no response
            } else {
                console.error('Error setting up request:', error.message); // Log any other errors
            }

            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Redirecting to login');
                localStorage.removeItem('token');
                navigate('/');
            }
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/Plant');
    };

    return (
        <div className="container mt-5">
            <GardenerNavbar />
            <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
                Back
            </button>
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">{isEditing ? 'Edit Plant' : 'Create New Plant'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category">Category<span className="text-danger">*</span></label>
                            <select
                                id="category"
                                name="category"
                                className="form-control"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                                <option value="Succulents">Succulents</option>
                                <option value="Ferns">Ferns</option>
                                <option value="Flowers">Flowers</option>
                                <option value="Herbs">Herbs</option>
                                <option value="Cacti">Cacti</option>
                            </select>
                            {errors.category && <small className="text-danger">{errors.category}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="price">Price<span className="text-danger">*</span></label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="form-control"
                                value={formData.price}
                                onChange={handleChange}
                            />
                            {errors.price && <small className="text-danger">{errors.price}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="tips">Tips<span className="text-danger">*</span></label>
                            <textarea
                                id="tips"
                                name="tips"
                                className="form-control"
                                value={formData.tips}
                                onChange={handleChange}
                            ></textarea>
                            {errors.tips && <small className="text-danger">{errors.tips}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="plantImage">Plant Image<span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    type="file"
                                    id="plantImage"
                                    name="plantImage"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                                {fileName && <span className="input-group-text">{fileName}</span>}
                            </div>
                            {errors.plantImage && <small className="text-danger">{errors.plantImage}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Saving...' : isEditing ? 'Update Plant' : 'Add Plant'}
                        </button>
                    </form>
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <p>{isEditing
                            ? 'Plant updated successfully!'
                            : 'Plant added successfully!'}</p>
                                <button className="btn btn-primary" onClick={handlePopupClose}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlantForm;
