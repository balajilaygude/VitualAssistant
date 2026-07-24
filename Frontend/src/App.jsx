import { useContext, useState } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Customize from './Pages/Customize'
import { userDataContext } from './Context/UserContext'
import Home from './Pages/Home'
import Customize2 from './Pages/Customize2'
import Info from './Pages/Info'
import Navbar from './Components/Navbar'

function App() {
  const {userdata,setUserData}=useContext(userDataContext)
  console.log("userdata", userdata);

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Info/>}/>

      <Route path="/dashboard" element={(userdata?.assistantImage && userdata.assistantName) ?
      <Home/>: <Navigate to={"/customize"}/>     }/>

      <Route path="/signin" element={!userdata ? <Signin/>:<Navigate to={"/dashboard"}/>}/>
      <Route path="/signup" element={!userdata ? <Signup/>:<Navigate to={"/dashboard"}/>}/>

      <Route path="/customize" element={userdata?<Customize/>:<Navigate to={"/signup"}/>}/>
      <Route path="/customize2" element={userdata?<Customize2/>:<Navigate to={"/signup"}/>}/>


    </Routes>
    </>
  )
}

export default App
