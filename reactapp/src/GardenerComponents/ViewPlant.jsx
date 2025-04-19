import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GardenerNavbar from './GardenerNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import API_BASE_URL from '../apiConfig';
import { ThreeDot } from 'react-loading-indicators';
import { Button, Modal } from 'react-bootstrap';

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

  return (
    <div>
      <GardenerNavbar />
      <h2 style={{ textAlign: "center" }}>Plants</h2>
      {successMessage && <p className="text-success"><h2>{successMessage}</h2></p>}
      {errors && <p className="text-danger"><h2>{errors}</h2></p>}
      {loading && <p><ThreeDot variant="bounce" color="#32cd32" size="medium" text="" textColor="" />Loading...</p>}
      <table className="table table-light table-striped" role="table">
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
          {!loading && !errors && plant.length === 0 && (
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
              <td>
                <button onClick={() => handleEdit(myPlant.plantId)} className="btn btn-primary">Edit</button>
                <button onClick={() => handleDeleteClick(myPlant.plantId)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default ViewPlant;
