import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import ErrorPage from './Components/ErrorPage'
import HomePage from './Components.HomePage'

const App = () => {
  return (
    <div>
        <Signup />
        <Login />
        <HomePage />
        <Login></Login>
        <ErrorPage></ErrorPage>
        
    </div>
  )
}

export default App