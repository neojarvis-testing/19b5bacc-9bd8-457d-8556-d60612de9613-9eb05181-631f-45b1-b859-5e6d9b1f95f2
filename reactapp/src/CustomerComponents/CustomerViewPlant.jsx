import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import API_BASE_URL from '../apiConfig';
import { ThreeDot } from 'react-loading-indicators';
import './CustomerViewPlant.css'

 
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

  const minWid ={
    width:'575px'
  }
 
  return (
    <div className='plant-list'>
      <div className='blur py-3'>
        <div className='px-3'>
          <CustomerNavbar />
        </div>
      <h2 className='text-center text-white p-2'>Available Plants</h2>
      {successMessage && <p className="text-success"><h2>{successMessage}</h2></p>}
      {errors && <p className="text-danger"><h2>{errors}</h2></p>}
      {/* {loading && <p>Loading...</p>}
      {!loading && !errors && plant.length === 0 && <p>Oops! No plants found</p>} */}
      <div className="mx-2 px-4 py-2 w-25">
        <input
          type="text"
          placeholder="Search plants..."
          className="form-control border transparent-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-light table-striped d-none" role="table">
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


        <div className="row bg-transparent text-white">
          {loading && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <ThreeDot variant="bounce" color="#32cd32" size="medium" text="" textColor="" />
              <p className="text-center">Loading...</p>
            </div>
          )}

          {!loading && errors && (
            <div className="text-center">
              <h3>Something went wrong. Please try again later.</h3>
            </div>
          )}

          {!loading && !errors && plant?.length === 0 && (
            <div className="text-center">
              <h3>Oops! No plants found.</h3>
            </div>
          )}

          {!loading && !errors && filteredPlants.length > 0 ? (
            filteredPlants.map((myPlant) => (
              <div
                style={minWid}
                className="m-4 p-4 border border-white col-md-4"
                key={myPlant.plantId}
              >
                <div className="d-flex justify-content-between gap-5">
                  <div>
                    <img src={myPlant.plantImage} alt={myPlant.name} width="250" height="175" />
                  </div>
                  <div className="d-flex flex-column justify-content-between w-50">
                    <div className="d-flex gap-3">
                      <span>Name: </span>
                      <span>{myPlant.name}</span>
                    </div>
                    <div className="d-flex gap-3">
                      <span>Category: </span>
                      <span>{myPlant.category}</span>
                    </div>
                    <div className="d-flex gap-3">
                      <span>Price: </span>
                      <span>
                        <i className="bi bi-currency-rupee" />
                        {myPlant.price}
                      </span>
                    </div>
                    <div className="d-flex gap-3">
                      <span>Tips: </span>
                      <span>{myPlant.tips}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <h4 className="text-center">No plants match your search.</h4>
          )}
        </div>

      </div>
    </div>
  );
};
 
export default ViewPlant;