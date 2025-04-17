import React from 'react'
import Login from './Components/Login'
import ErrorPage from './Components/ErrorPage'
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
import GardenerNavbar from './GardenerComponents/GardenerNavbar'
import CustomerNavbar from './CustomerComponents/CustomerNavbar'
import { BrowserRouter } from 'react-router-dom';
import ViewPlant from './GardenerComponents/ViewPlant'
import PlantForm from './GardenerComponents/PlantForm'

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
        <ErrorPage></ErrorPage>
    </div>
</BrowserRouter>

  )
}

export default App