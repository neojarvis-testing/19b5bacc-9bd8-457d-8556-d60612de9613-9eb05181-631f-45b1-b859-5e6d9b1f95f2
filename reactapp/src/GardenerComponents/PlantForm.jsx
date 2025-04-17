import React from 'react'
import {Form,Button} from 'react-bootstrap';
import axios from 'axios'
import { useState } from 'react';
import GardenerNavbar from './GardenerNavbar';


const PlantForm = () => {
    const [formData, setFormData] = useState({
      plantName: '',
      plantType: '',
      plantingDate: '',
      notes: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/plants', formData);
        console.log('Form data submitted:', response.data);
        alert('Plant added successfully!');
        // Reset form after successful submission
        setFormData({
          plantName: '',
          plantType: '',
          plantingDate: '',
          notes: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to add plant. Please try again.');
      }
    };
  
    return (
      <div className="plant-form">
        <GardenerNavbar/>
        <h2>Add New Plant</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPlantName">
            <Form.Label>Plant Name</Form.Label>
            <Form.Control
             text="date"
              name="plantName"
              value={formData.plantName}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formPlantType">
            <Form.Label>Plant Type</Form.Label>
            <Form.Control
              type="text"
              name="plantType"
              value={formData.plantType}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formPlantingDate">
            <Form.Label>Planting Date</Form.Label>
            <Form.Control
              type="date"
              name="plantingDate"
              value={formData.plantingDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  };
  
  export default PlantForm;
  