import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GardenerNavbar from './GardenerNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import API_BASE_URL from '../apiConfig';
import { ThreeDot } from 'react-loading-indicators';
import { Button, Modal } from 'react-bootstrap';
import './ViewPlant.css';

const ViewPlant = () => {
  const navigate = useNavigate();
  const [plant, setPlant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/Plant`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPlant(response.data);
      console.log('Fetched plants:', response.data); // Log fetched data
    } catch (error) {
      console.error('Error fetching plants:', error); // Log error details
      setErrors('Error fetching plants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/Plant/${plantToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setPlant((prevPlants) => prevPlants.filter((plant) => plant.plantId !== plantToDelete));
      setTimeout(() => setSuccessMessage(""), 3000);
      setShowDeletePopup(false);
    } catch (error) {
      console.error('Error deleting plant:', error); // Log error details
      setErrors('Failed to delete plant.');
      setTimeout(() => setErrors(""), 3000);
    }
  };

  const handleEdit = (id) => {
        navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (plantId) => {
    setPlantToDelete(plantId);
    setShowDeletePopup(true);
  };

  const textDec ={
    fontSize:'10px'
  }
  const minWid ={
    width:'575px'
  }

  return (
    <div className='plant-list'>
      <div className='blur py-3'>
        <div className='px-3'>
          <GardenerNavbar />
        </div>
      <h2 className=' text-white text-center p-2'>Plants</h2>
      {successMessage && <p className="text-success"><h2>{successMessage}</h2></p>}
      {errors && <p className="text-danger"><h2>{errors}</h2></p>}
      
      <table className="table table-striped d-none" role="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Tips</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && !errors && plant?.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                <h3>Oops! No plants found.</h3>
              </td>
            </tr>
          )}
          {plant.length > 0 && plant.map((myPlant) => (
            <tr key={myPlant.plantId || myPlant.name}>
              <td><img src={myPlant.plantImage} alt={myPlant.name} width="100" /></td>
              <td>{myPlant.name}</td>
              <td>{myPlant.category}</td>
              <td>{myPlant.price}</td>
              <td>{myPlant.tips}</td>
            </tr>
          ))}
        </tbody>
      </table>

        <div className='row bg-transparent text-white '>
          {loading &&
            <div className='d-flex flex-column align-items-center justify-content-center'>
              <ThreeDot variant="bounce" color="#32cd32" size="medium" text="" textColor="" /><p className="text-center">Loading...</p>
            </div>}

          {!loading && !errors && plant?.length === 0 && (
              <span colSpan="6" className="text-center">
                <h3>Oops! No plants found.</h3>
              </span>
          )}
          
          {plant.length > 0 && plant.map((myPlant) => (
            <div style={minWid} className="m-4 p-4 border border-white col-md-4 " key={myPlant.plantId}>
              <div className='d-flex justify-content-between gap-5'>
                <div>
                  <img src={myPlant.plantImage} alt={myPlant.name} width="250" height="175" />
                </div>
                <div className='d-flex flex-column justify-content-between w-50'>
                  <div className='d-flex gap-3'>
                    <span>Name: </span>
                    <span>{myPlant.name}</span>
                  </div>

                  <div className='d-flex gap-3'>
                    <span>Category: </span>
                    <span>{myPlant.category}</span>
                  </div>

                  <div className='d-flex gap-3'>
                    <span>Price: </span>
                    <span><i class="bi bi-currency-rupee"/>{myPlant.price}</span>
                  </div>

                  <div className='d-flex gap-3'>
                    <span>Tips: </span>
                    <span>{myPlant.tips}</span>
                  </div>

                  <div className='d-flex justify-content-between gap-4'>
                    <button onClick={() => handleEdit(myPlant.plantId)} className="btn btn-outline-light ">Edit</button>
                    <button onClick={() => handleDeleteClick(myPlant.plantId)} className="btn btn-outline-light">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      {/* Delete Confirmation Popup */}
      <Modal show={showDeletePopup} onHide={() => setShowDeletePopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this plant?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeletePopup(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};

export default ViewPlant;
