import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GardenerNavbar from './GardenerNavbar';
import API_BASE_URL from '../apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlantForm.css'

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
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch plant data when editing
    useEffect(() => {
        if (isEditing) {
            const fetchPlant = async () => {
                setLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${API_BASE_URL}/Plant/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFormData({
                        name: response.data.name,
                        category: response.data.category,
                        price: response.data.price,
                        tips: response.data.tips,
                        plantImage: response.data.plantImage, // Ensure this line sets the plantImage
                    });
                    setFileName(response.data.plantImage ? 'Current Image' : '');
                } catch (error) {
                    setFormError('Error fetching plant data');
                } finally {
                    setLoading(false);
                }
            };
    
            fetchPlant();
        }
    }, [isEditing, id]);
    
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
                // Fetch the current plant data
                const currentPlantResponse = await axios.get(`${API_BASE_URL}/Plant/${id}`, {
                    headers,
                });
                const currentCategory = currentPlantResponse.data.category;
    
                if (formData.category === currentCategory) {
                    setFormError('Please choose a different category.');
                    setLoading(false);
                    return;
                }
    
                // PUT request to update the plant
                await axios.put(`${API_BASE_URL}/Plant/${id}`, formData, { headers });
                setShowPopup(true); // Show success popup
            } else {
                // Check if the name already exists
                const existingPlantsResponse = await axios.get(`${API_BASE_URL}/Plant`, {
                    headers,
                });
                const existingPlant = existingPlantsResponse.data.find(plant => plant.name === formData.name);
    
                if (existingPlant) {
                    setFormError('Name already exists. Cannot add the plant.');
                    setLoading(false);
                    return;
                }
    
                // POST request to create a new plant
                await axios.post(`${API_BASE_URL}/Plant`, formData, { headers });
                setShowPopup(true); // Show success popup
            }
    
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error saving plant:', error);
            console.error('Error details:', error.response ? error.response.data : error.message);
    
            if (error.response) {
                if (error.response.status === 400 && !isEditing) {
                    const errorMessage = error.response.data.message || 'An error occurred. Please try again.';
                    setFormError(errorMessage);
                } else if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    setFormError('An error occurred while saving the plant. Please try again.');
                }
            } else {
                setFormError('An error occurred while saving the plant. Please try again.');
            }
        }
    };
    
    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/view');
    };

    return (
        <div className="card">
            <div className='navB px-3 m-2'><GardenerNavbar /></div>
            <div className="card mx-auto" style={{ maxWidth: '600px', marginTop: '60px' }}>
                <div className="card-body p-4">
                    <h2 style={{ color: 'white' }} className="card-title text-center mb-4">
                        {isEditing ? 'Edit Plant' : 'Create New Plant'}
                    </h2>
                    {formError && <div className="alert alert-danger">{formError}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" style={{ color: 'white' }}>Name<span className="text-danger">*</span></label>
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
                            <label htmlFor="category" style={{ color: 'white' }}>Category<span className="text-danger">*</span></label>
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
                            <label htmlFor="price" style={{ color: 'white' }}>Price<span className="text-danger">*</span></label>
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
                            <label htmlFor="tips" style={{ color: 'white' }}>Tips<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="tips"
                                name="tips"
                                className="form-control"
                                value={formData.tips}
                                onChange={handleChange}
                            />
                            {errors.tips && <small className="text-danger">{errors.tips}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="plantImage" style={{ color: 'white' }}>Plant Image<span className="text-danger">*</span></label>
                            <input
                                type="file"
                                id="plantImage"
                                name="plantImage"
                                className="form-control"
                                onChange={handleChange}
                            />
                            {fileName && <small className="text-muted">{fileName}</small>}
                            {errors.plantImage && <small className="text-danger">{errors.plantImage}</small>}
                            {formData.plantImage && (
                                <div className="mt-3">
                                    <img
                                        src={formData.plantImage}
                                        alt="Plant"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            )}
                        </div>
                        <button style={{ color: '#00ABFF', fontSize: '20px' }} className="btn btn-link mb-3" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <button type="submit" style={{ marginLeft: '360px' }} className="btn btn-primary btn-block" disabled={loading}>
                            {isEditing ? (loading ? 'Updating...' : 'Update') : (loading ? 'Adding...' : 'Add Plant')}
                        </button>
                    </form>
                </div>
            </div>

           
           
            {/* Success Popup */}
            <Modal show={showPopup} onHide={handlePopupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Plant Updated' : 'Plant Created'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isEditing ? 'The plant has been successfully updated.' : 'The plant has been successfully created.'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handlePopupClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
 
export default PlantForm;