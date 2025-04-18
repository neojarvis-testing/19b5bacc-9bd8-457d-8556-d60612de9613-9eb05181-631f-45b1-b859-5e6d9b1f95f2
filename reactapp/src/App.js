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
const App = () => {
  return (
<<<<<<< HEAD
    
<BrowserRouter>
    <div>
        <CustomerNavbar/>
        <Signup />
        <Login />
        <GardenerNavbar/>
        <HomePage />
        <ViewPlant/>
        <PlantForm/>
        <Login></Login>

        <ErrorPage></ErrorPage>
    </div>
</BrowserRouter>
=======

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/Plant" element={<PlantForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
>>>>>>> 1d3aa4cc6ab1731be5e48bec4af5514a1e34fc09

  )
}

export default App