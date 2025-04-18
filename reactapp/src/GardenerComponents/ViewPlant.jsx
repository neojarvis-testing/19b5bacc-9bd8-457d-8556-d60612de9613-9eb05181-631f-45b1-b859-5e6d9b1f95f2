import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GardenerNavbar from './GardenerNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import API_BASE_URL from '../apiConfig';
import ErrorPage from '../Components/ErrorPage';
import {ThreeDot} from 'react-loading-indicators'
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
      setErrors(<ErrorPage/>);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = (plantId) => {
    axios
      .delete(`${API_BASE_URL}/Plant/${plantId}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setSuccessMessage("Plant successfully deleted.");
        setPlant((prevPlants) => prevPlants.filter((plant) => plant.plantId !== plantId));
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setErrors('Failed to delete plant.');
        setTimeout(() => setErrors(""), 3000);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <GardenerNavbar />
      <h2 style={{ textAlign: "center" }}>Plants</h2>
      {successMessage && <p className="text-success"><h2>{successMessage}</h2></p>}
      {errors && <p className="text-danger"><h2>{errors}</h2></p>}
      {loading && <p><ThreeDot variant="bounce" color="#32cd32" size="medium" text="" textColor="" />Loading...</p>}
      {!loading && !errors && plant.length === 0 && <p>No plants available</p>}
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
          {plant.length > 0 && plant.map((myPlant) => (
            <tr key={myPlant.plantId || myPlant.name}>
              <td><img src={myPlant.plantImage} alt={myPlant.name} width="100" /></td>
              <td>{myPlant.name}</td>
              <td>{myPlant.category}</td>
              <td>{myPlant.price}</td>
              <td>{myPlant.tips}</td>
              <td>
                <button onClick={() => handleEdit(myPlant.plantId)} className="btn btn-primary">Edit</button>
                <button onClick={() => handleDelete(myPlant.plantId)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPlant;
