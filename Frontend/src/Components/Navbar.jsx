import { Link } from "react-router-dom";
import { useContext } from "react";
import { userDataContext } from "../Context/UserContext";
import { FaRobot } from "react-icons/fa";

export default function Navbar() {
  const { userdata } = useContext(userDataContext);

  return (
    <nav className="bg-[#0A192F] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Logo */}
        <Link
          to={userdata ? "/dashboard" : "/"}
          className="flex items-center gap-3"
        >
          <FaRobot className="text-blue-500 text-3xl" />
          <h1 className="text-white text-xl sm:text-2xl font-bold text-center">
            AI Virtual Assistant
          </h1>
        </Link>

        {/* Show only when user is NOT logged in */}
        {!userdata && (
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="text-white hover:text-blue-500 transition"
            >
              About Us
            </Link>

            <Link
              to="/signin"
              className="text-white hover:text-blue-500 transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}