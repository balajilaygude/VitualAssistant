import React, { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'

export default function Cards({image}) {
      const { serverURL,userdata,setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,
        selectedImage,setSelectedImage }=useContext(userDataContext)
  return (
    <div className={`w-36 h-60 border-2 rounded-2xl border-blue-800 hover:border-white cursor-pointer 
    overflow-hidden hover:shadow-2xl shadow-blue-800 ${selectedImage ==image ?"border-white shadow-2xl" :null}`}
    onClick={()=>{
      setSelectedImage(image)
      setFrontendImage(null)
      setBackendImage(null)
    }}>
      <img src={image} className='h-full object-cover ' />
    </div>
  )
}
