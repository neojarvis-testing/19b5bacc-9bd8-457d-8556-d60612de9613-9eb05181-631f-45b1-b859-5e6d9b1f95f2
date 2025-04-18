import React from 'react'
import Login from './Components/Login'
import ErrorPage from './Components/ErrorPage'
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
import GardenerNavbar from './GardenerComponents/GardenerNavbar'
import CustomerNavbar from './CustomerComponents/CustomerNavbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewPlant from './GardenerComponents/ViewPlant'
import PlantForm from './GardenerComponents/PlantForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerViewPlant from './CustomerComponents/CustomerViewPlant'
const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/Plant" element={<PlantForm mode ="add" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path = "/view" element={<ViewPlant/>}/>
        <Route path = "/edit/:id" element={<PlantForm mode ="edit" />}/>
        <Route path = "cview" element={<CustomerViewPlant/>}/>

      </Routes>
    </Router>

  )
}

export default App