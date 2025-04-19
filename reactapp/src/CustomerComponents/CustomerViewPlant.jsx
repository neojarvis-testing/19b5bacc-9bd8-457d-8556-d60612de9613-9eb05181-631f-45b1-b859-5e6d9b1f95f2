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
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
 
  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/Plant`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
 
  // Filtered plants based on the search term
  const filteredPlants = plant.filter((myPlant) =>
    myPlant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    myPlant.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div>
      <CustomerNavbar />
      <h2 style={{ textAlign: 'center' }}>Available Plants</h2>
      {successMessage && <p className="text-success"><h2>{successMessage}</h2></p>}
      {errors && <p className="text-danger"><h2>{errors}</h2></p>}
      {loading && <p>Loading...</p>}
      {!loading && !errors && plant.length === 0 && <p>Oops! No plants found</p>}
      <div className="py-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search plants..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
          {plant.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Oops! No plants found.
              </td>
            </tr>
          ) : filteredPlants.length > 0 ? (
            filteredPlants.map((myPlant) => (
              <tr key={myPlant.plantId || myPlant.name}>
                <td>
                  <img src={myPlant.plantImage} alt={myPlant.name} width="100" />
                </td>
                <td>{myPlant.name}</td>
                <td>{myPlant.category}</td>
                <td>{myPlant.price}</td>
                <td>{myPlant.tips}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No plants match your search. 
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
 
export default ViewPlant;