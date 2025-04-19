import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import GardenerNavbar from './GardenerComponents/GardenerNavbar';
import CustomerNavbar from './CustomerComponents/CustomerNavbar';
import ViewPlant from './GardenerComponents/ViewPlant';
import PlantForm from './GardenerComponents/PlantForm';
import CustomerViewPlant from './CustomerComponents/CustomerViewPlant';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/gardenernavbar" element={<GardenerNavbar username="GardenerUser" role="Gardener" />} />
        <Route path="/customernavbar" element={<CustomerNavbar username="CustomerUser" role="Customer" />} />
        <Route path="/home" element={<HomePage />} />

        <Route
          path="/Plant"
          element={
            <PrivateRoute requiredRole="Gardener">
              <PlantForm isEditing={false} />
            </PrivateRoute>
          }
        />
        <Route
          path="/view"
          element={
            <PrivateRoute requiredRole="Gardener">
              <ViewPlant />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute requiredRole="Gardener">
              <PlantForm isEditing={true} />
            </PrivateRoute>
          }
        />
        <Route
          path="/cview"
          element={
            <PrivateRoute requiredRole="Customer">
              <CustomerViewPlant />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
