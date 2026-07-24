import React, { useContext, useRef, useState } from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import Cards from "../Components/Cards";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../Context/UserContext";
import {  useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

export default function Customize() {
  const {
    serverURL,
    userdata,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  const inputImage = useRef();
  const navigate=useNavigate()
  function handleImage(e) {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }

  return (
    <div className="w-full p-5 min-h-screen bg-linear-to-t from-black to-indigo-900 flex flex-col justify-center items-center">
      <MdArrowBack className="text-white text-4xl cursor-pointer absolute top-5 left-5"
            onClick={()=>navigate("/dashboard")}/>
      <h2 className="text-white text-2xl mb-3 font-semibold">
        Select your <span className="text-blue-600">Virtual Assistant</span>
      </h2>
      <div className="w-9/10  lg:max-w-3/5 flex justify-center items-center flex-wrap gap-3">
        <Cards image={image1} />
        <Cards image={image2} />
        <Cards image={image3} />
        <Cards image={image4} />
        <Cards image={image5} />
        <Cards image={image6} />
        <Cards image={image7} />
        <div
          className={`w-36 h-60 border-2 rounded-2xl border-blue-800 flex justify-center 
        items-center hover:border-white cursor-pointer overflow-hidden hover:shadow-2xl shadow-blue-800
        ${selectedImage == "input" ? "border-white shadow-2xl" : null}`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-white w-10 h-10" />
          )}
          {frontendImage && (
            <img src={frontendImage} className="h-full object-cover" />
          )}

          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputImage}
            onChange={handleImage}
          />
        </div>
      </div>
      {selectedImage && (
        <button className="w-30 mt-4 min-h-8 p-2 bg-white rounded-full font-semibold cursor-pointer"
        onClick={()=>navigate("/customize2")}>
          Next
        </button>
      )}
    </div>
  );
}
