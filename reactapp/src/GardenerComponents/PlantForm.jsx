import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GardenerNavbar from './GardenerNavbar';
import API_BASE_URL from '../apiConfig';
import { useNavigate, useParams } from 'react-router-dom';

const PlantForm = ({ mode = "add" }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [tips, setTips] = useState("");
  const [plantImage, setPlantImage] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [tipsError, setTipsError] = useState(null);
  const [plantImageError, setplantImageError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (mode === "edit" && id) {
      console.log(id);
      setLoading(true);
      axios
        .get(`${API_BASE_URL}}/${id}`, {headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          const plantData = res.data;
          setName(plantData.Name);
          setCategory(plantData.Category);
          setPrice(plantData.Price);
          setTips(plantData.Tips);
          setPlantImage(plantData.PlantImage);
          setLoading(false)
        })
        .catch(() => {
          setFormError();
          setLoading(false);
        })
    }
  }, [mode, id]);

  const handleSubmit = (i) => {
    i.preventDefault();
    setNameError(false);
    setCategoryError(false);
    setPriceError(false);
    setTipsError(false);
    setplantImageError(false);
    let hasError = false;
    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    }
    if (!category.trim()) {
      setCategoryError(true);
      hasError = true;
    }
    if (price === "") {
      setPriceError(true);
      hasError = true;
    }
    if (!tips.trim()) {
      setTipsError(true);
      hasError = true;
    }
    if (!plantImage.trim()) {
      setplantImageError(true);
      hasError = true;
    }
    if (hasError) {
      return;
    }

    const plantData = { name, category, price, tips, plantImage };
    console.log(plantData);

    if (mode === "add") {
      console.log(mode);
      axios
        .post(`${API_BASE_URL}/Plant`, plantData, {headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          setSuccessMessage("Plant added successfully!");
          setTimeout(() => navigate("/Plant"), 2000);
        })
        .catch(() => {
          setFormError("Error while adding Plant");
        });
    }
    else if (mode === "edit") {
      console.log(mode);
      axios
        .put(`${API_BASE_URL}/Plant/${id}`, plantData, {headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          setSuccessMessage("Plant updated successfully!");
          setTimeout(() => navigate("/Plant"), 2000);
        })
        .catch(() => {
          setFormError("Error while updating Plant");
        });
    }
  };

  const handleBackButton = () => {
    navigate("/Plant");
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPlantImage(reader.result); // Store the base64-encoded image
        };
        reader.readAsDataURL(file);
    } else {
        if (name === 'name') setName(value);
        if (name === 'category') setCategory(value);
        if (name === 'price') setPrice(value);
        if (name === 'tips') setTips(value);
        if (name === 'plantImage') setPlantImage(value);

    }
  };

  return (
    <div className="plant-form">
      <div>
        <GardenerNavbar/>
        <h2>{mode === "add" ? "Create New Plant" : "Update Plant"}</h2>
        {formError && <p className="text-danger">{formError}</p>}
        {loading && <div className="d-flex flex-column justify-content-center align-items-center vh-100"><p className="text-white">Loading...</p> </div>}
        {!loading &&(

        
        <form onSubmit={handleSubmit}>
            <div className="py-2">
              <label>Name:</label>
              <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} />
              {nameError && <p>Name is required</p>}
            </div>

            <div className="py-2">
              <label>Category<span>*</span></label><br />
              <select id="category" name="category"  value={category} onChange={handleChange} >
                <option value="Indoor">Select a Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulents">Succulents</option>
                <option value="Ferns">Ferns</option>
                <option value="Flowers">Flowers</option>
                <option value="Herbs">Herbs</option>
                <option value="Cacti">Cacti</option>
              </select>
              {categoryError && <p>Category is required</p>}
            </div>

            <div className="py-2">
              <label>Price:</label>
              <input  type="number" placeholder="Price" name="price" value={price} onChange={handleChange} />
              {priceError && <p>Price is required</p>}
            </div>

            <div className="py-2">
              <label>Tips:</label>
              <textarea  placeholder="Tips" name="tips" value={tips} onChange={handleChange}></textarea>
              {tipsError && <p>Tips are required</p>}
            </div>

            <div className="py-2">
              <label htmlFor="placeImage">Plant Image <span className="text-danger">*</span></label>
              <input type="text" className="form-control-file"
                id="plantImage"
                name="plantImage"
                onChange={handleChange}
              />
              {plantImageError && <p>Image is required</p>}
            </div>

          <button className="btn rounded-0" onClick={handleBackButton}>Back</button>
          <button className="btn btn-outline-light rounded-0" type="submit">{mode === "add" ? "Save" : "Update"}</button>

          <button variant="primary" type="submit">{mode === "add" ? "Add Plant" : "Update Plant"}</button>
        </form>
        )}
        {successMessage && <p className="">{successMessage}</p>}
      </div>
    </div>
  );
};

export default PlantForm;
