import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import ErrorPage from './Components/ErrorPage'
import HomePage from './Components.HomePage'

const App = () => {
  return (
    
<BrowserRouter>

    <div>
        <CustomerNavbar/>
        <Signup />
        <Login />
        <GardenerNavbar/>
        <HomePage />
        <Login></Login>
        <ErrorPage></ErrorPage>
        
    </div>
    
</BrowserRouter>

  )
}

export default App