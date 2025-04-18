import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import API_BASE_URL from '../apiConfig';

const ViewPlant = () => {
  const navigate = useNavigate();
  const [plant, setPlant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/Plant`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
      setPlant(response.data);
    } catch (error) {
      setErrors('Failed to load plants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);



  return (
    <div>
      <CustomerNavbar />
      <h2 style={{ textAlign: "center" }}>Plants</h2>
      {successMessage && <p className="text-success"><h2>{successMessage}</h2></p>}
      {errors && <p className="text-danger"><h2>{errors}</h2></p>}
      {loading && <p>Loading...</p>}
      {!loading && !errors && plant.length === 0 && <p>No plants available</p>}
      <table className="table table-light table-striped" role="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Tips</th>
          </tr>
        </thead>
        <tbody>
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
      <button className="btn btn-secondary" onClick={() => navigate('/logout')}>Logout</button>
    </div>
  );
};

export default ViewPlant;
