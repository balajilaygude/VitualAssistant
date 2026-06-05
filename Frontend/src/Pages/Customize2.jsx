import React, { useContext, useState } from "react";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Customize2() {
  const { userdata , backendImage,selectedImage ,serverURL,setUserData} = useContext(userDataContext);
  const [assistant, setAssistant] = useState(userdata?.assistantName || "");
  const[loading,setLoading]=useState(false)

  const navigate=useNavigate()

  async function UpdateAssistant() {
    setLoading(true)
    try {
      console.log("backendImage:", backendImage);
console.log("type:", typeof backendImage);
      let formData=new FormData()
      formData.append("assistantName",assistant)
      if(backendImage){
        formData.append("assistantImage",backendImage)
      }else{
        formData.append("imageURL",selectedImage)
      }
      const result=await axios.post(`${serverURL}/api/user/update`,formData,{withCredentials:true})
      setLoading(false)
      console.log(result.data)
      setUserData(result.data)
      navigate("/")
    } catch (error) {
      setLoading(false)
      console.log(error.response?.data?.message)
    }
  }


  return (
    <div className="w-full p-5 relative min-h-screen bg-linear-to-t from-black to-indigo-900 flex flex-col justify-center items-center">
      <MdArrowBack className="text-white text-4xl cursor-pointer absolute top-5 left-5"
      onClick={()=>navigate("/customize")}/>
      <h2 className="text-white text-2xl m-5 font-semibold">
        Enter your <span className="text-blue-600">Assistant name</span>
      </h2>
      <input
        type="text"
        onChange={(e) => setAssistant(e.target.value)}
        value={assistant}
        required
        placeholder="eg. Luffy"
        className="w-90 p-5 outline-none text-white bg-transparent placeholder:text-white rounded-full h-8 border border-white"
      />
      {assistant && (
        <button className="w-50 mt-4 min-h-5 p-2 bg-white rounded-full font-semibold cursor-pointer" 
        onClick={UpdateAssistant} disabled={loading}>
          {!loading?"Create Your Assistant":"Loading"}
        </button>
      )}
    </div>
  );
}
