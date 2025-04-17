import React from 'react'
import Login from './Components/Login'
import ErrorPage from './Components/ErrorPage'
import Signup from './Components/Signup'
import HomePage from './Components/HomePage'
<<<<<<< HEAD
=======
import GardenerNavbar from './GardenerComponents/GardenerNavbar'
import CustomerNavbar from './CustomerComponents/CustomerNavbar'
import { BrowserRouter } from 'react-router-dom';
import ViewPlant from './GardenerComponents/ViewPlant'
import PlantForm from './GardenerComponents/PlantForm'
>>>>>>> 941f01d8a46c3f561cb1b0029c23516cfbeb8f91

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
<<<<<<< HEAD

        
=======
>>>>>>> 941f01d8a46c3f561cb1b0029c23516cfbeb8f91
    </div>
</BrowserRouter>

  )
}

export default App