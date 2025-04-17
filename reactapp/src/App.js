import React from 'react'
import Login from './Components/Login'
<<<<<<< HEAD
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
=======
import ErrorPage from './Components/ErrorPage'
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
import GardenerNavbar from './GardenerComponents/GardenerNavbar'
import CustomerNavbar from './CustomerComponents/CustomerNavbar'
import { BrowserRouter } from 'react-router-dom';
import ViewPlant from './GardenerComponents/ViewPlant'
import PlantForm from './GardenerComponents/PlantForm'
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 0942c71775de6fc4ac4222fc8e26157bfff678ae
const App = () => {
  return (
    
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
<<<<<<< HEAD
         
        
=======
        <ErrorPage></ErrorPage>
>>>>>>> 0942c71775de6fc4ac4222fc8e26157bfff678ae
    </div>
</BrowserRouter>

  )
}

export default App