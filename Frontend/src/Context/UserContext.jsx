import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const userDataContext = createContext();
export default function UserContext({ children }) {
  const [userdata, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const serverURL = "https://vitualassistant-backend.onrender.com";
  async function geminiResponse(command) {
    try {
      const result = await axios.post(
        `${serverURL}/api/user/asktoassistant`,
        {command},
        { withCredentials: true },
      );
      return result.data;
    } catch (error) {
      console.log(error.response?.data);
    }
  }
  const value = {
    serverURL,
    userdata,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    geminiResponse,
  };
  async function handleCurrentUser() {
    try {
      const result = await axios.get(`${serverURL}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}
