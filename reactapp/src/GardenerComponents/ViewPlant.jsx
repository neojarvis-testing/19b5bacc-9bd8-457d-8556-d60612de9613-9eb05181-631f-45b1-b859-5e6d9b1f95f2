import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewPlant.css';
import GardenerNavbar from './GardenerNavbar';

const ViewPlant = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await axios.get(`/api/plants/${plantId}`);
        setPlant(response.data);
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchPlant();
  }, [plantId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/plants/${plantId}`);
      setShowDeleteModal(false);
      alert('Plant deleted successfully!');
      // Redirect or update the UI as needed
    } catch (error) {
      console.error('Error deleting plant:', error);
      alert('Failed to delete plant. Please try again.');
    }
  };

  if (!plant) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="plant-card">
      <GardenerNavbar/>
      <Card.Body>
        <Card.Title>{plant.plantName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{plant.plantType}</Card.Subtitle>
        <Card.Text>
          <strong>Planting Date:</strong> {new Date(plant.plantingDate).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Notes:</strong> {plant.notes}
        </Card.Text>
        <Button variant="primary" href={`/edit-plant/${plantId}`}>Edit</Button>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
      </Card.Body>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this plant?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ViewPlant;
