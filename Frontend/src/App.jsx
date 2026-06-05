import { useContext, useState } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Customize from './Pages/Customize'
import { userDataContext } from './Context/UserContext'
import Home from './Pages/Home'
import Customize2 from './Pages/Customize2'

function App() {
  const {userdata,setUserData}=useContext(userDataContext)

  return (
    <Routes>
      
      <Route path="/" element={(userdata?.assistantImage && userdata.assistantName) ?
      <Home/>: <Navigate to={"/customize"}/>     }/>
      <Route path="/signin" element={!userdata ? <Signin/>:<Navigate to={"/"}/>}/>
      <Route path="/signup" element={!userdata ? <Signup/>:<Navigate to={"/"}/>}/>
      <Route path="/customize" element={userdata?<Customize/>:<Navigate to={"/signup"}/>}/>
      <Route path="/customize2" element={userdata?<Customize2/>:<Navigate to={"/signup"}/>}/>


    </Routes>
  )
}

export default App
