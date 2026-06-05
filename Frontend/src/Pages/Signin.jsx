import React, { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import authBg from "../assets/authBg.png";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverURL,userdata,setUserData } = useContext(userDataContext);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverURL}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      setUserData(result.data)
      setLoading(false);
      navigate("/")
    } catch (error) {
      setUserData(null)
      setErr(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-cover  bg-[url('/authBg.png')] bg-center flex justify-center items-center" >
      <form
        onSubmit={handleSignin}
        className="w-100 h-4/5 bg-blue-900/15 shadow-lg shadow-black rounded backdrop-blur-md
         flex flex-col items-center justify-center py-8 gap-4"
      >
        <h1 className="text-white text-2xl font-semibold ">
          Sign in to <span className="text-blue-300">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email "
          className="w-4/5 p-5 outline-none text-white bg-transparent placeholder:text-white rounded-full h-8 border border-white"
        />

        <div className="w-4/5 h-8 relative rounded-full bg-transparent text-white ">
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password "
            className="w-full p-5 outline-none bg-transparent placeholder:text-white rounded-full h-full border border-white"
          />
          {!showPassword && (
            <IoEye
              onClick={() => setShowPassword(true)}
              className="absolute top-3 right-4 text-white text-xl cursor-pointer"
            />
          )}
          {showPassword && (
            <IoEyeOff
              onClick={() => setShowPassword(false)}
              className="absolute top-3 right-4 text-white text-xl cursor-pointer"
            />
          )}
        </div>
        {err.length > 0 && <p className="text-red-300"> *{err}</p>}
        <button
          className="w-2/5  mt-4 min-h-8 p-2 bg-white rounded-full font-semibold cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading .." : "Sign In"}
        </button>
        <p
          onClick={() => navigate("/signup")}
          className="text-white font-light text-sm cursor-pointer"
        >
          Want to Create new account{" "}
          <span className="text-blue-400">sign Up</span>
        </p>
      </form>
    </div>
  );
}
