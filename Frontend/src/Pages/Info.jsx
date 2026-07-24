import { Link } from "react-router-dom";
import {
  FaRobot,
  FaLock,
  FaCloud,
  FaComments,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiGooglegemini } from "react-icons/si";
import Ai1 from "../assets/Ai1.png"
import Ai2 from "../assets/Ai2.png"

export default function Info() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm">
              MERN + Gemini AI
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
              AI Virtual Assistant
              <span className="text-blue-500"> (Jarvis Inspired)</span>
            </h1>

            <p className="text-gray-400 mt-8 text-lg leading-8">
              An intelligent AI assistant built using the MERN stack and the
              Gemini API. Ask questions, receive instant AI-powered responses,
              manage conversations, and interact naturally through a modern,
              secure, and responsive interface.
            </p>

            <div className="flex gap-4 mt-10">
              <Link
                to="/signup"
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
              >
                Get Started
              </Link>

              <Link
                to="/signin"
                className="px-7 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
              alt="AI Assistant"
              className="rounded-3xl shadow-2xl border border-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Demo Images */}

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Application Preview
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={Ai1}
            alt="Demo 1"
            className="rounded-2xl border border-gray-800"
          />

          <img
            src={Ai2}
            alt="Demo 2"
            className="rounded-2xl border border-gray-800"
          />
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center">
          Why Choose This Assistant?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          <div className="bg-[#141417] p-8 rounded-2xl border border-gray-800">
            <FaRobot className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold">
              Gemini AI Integration
            </h3>
            <p className="text-gray-400 mt-3">
              Intelligent and context-aware conversations powered by Google's
              Gemini API.
            </p>
          </div>

          <div className="bg-[#141417] p-8 rounded-2xl border border-gray-800">
            <FaComments className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">
              Real-Time Chat
            </h3>
            <p className="text-gray-400 mt-3">
              Smooth conversational interface designed for quick and natural
              interactions.
            </p>
          </div>

          <div className="bg-[#141417] p-8 rounded-2xl border border-gray-800">
            <FaLock className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold">
              Secure Authentication
            </h3>
            <p className="text-gray-400 mt-3">
              JWT authentication with HTTP-only cookies and bcrypt password
              hashing.
            </p>
          </div>

          <div className="bg-[#141417] p-8 rounded-2xl border border-gray-800">
            <FaCloud className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold">
              Cloudinary Storage
            </h3>
            <p className="text-gray-400 mt-3">
              Fast and secure image upload and cloud storage.
            </p>
          </div>

          <div className="bg-[#141417] p-8 rounded-2xl border border-gray-800">
            <FaReact className="text-4xl text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold">
              Modern Frontend
            </h3>
            <p className="text-gray-400 mt-3">
              React, Tailwind CSS, Context API, Axios, and React Router DOM.
            </p>
          </div>

          <div className="bg-[#141417] p-8 rounded-2xl border border-gray-800">
            <FaNodeJs className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold">
              Powerful Backend
            </h3>
            <p className="text-gray-400 mt-3">
              Express, MongoDB, JWT, Cloudinary, Multer, and secure APIs.
            </p>
          </div>

        </div>
      </section>

      {/* Tech Stack */}

      <section className="bg-[#111114] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Technology Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-14 text-center">

            <div>
              <FaReact className="text-6xl mx-auto text-cyan-400" />
              <p className="mt-4">React</p>
            </div>

            <div>
              <SiTailwindcss className="text-6xl mx-auto text-sky-400" />
              <p className="mt-4">Tailwind CSS</p>
            </div>

            <div>
              <FaNodeJs className="text-6xl mx-auto text-green-500" />
              <p className="mt-4">Node.js</p>
            </div>

            <div>
              <SiMongodb className="text-6xl mx-auto text-green-600" />
              <p className="mt-4">MongoDB</p>
            </div>

            <div>
              <SiGooglegemini className="text-6xl mx-auto text-blue-400" />
              <p className="mt-4">Gemini AI</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="border-t border-gray-800 py-10 text-center text-gray-500">
        <h3 className="text-2xl font-bold text-white">
          AI Virtual Assistant
        </h3>

        <p className="mt-3">
          Built with MERN Stack • Gemini AI • Cloudinary • JWT Authentication
        </p>
      </footer>
    </div>
  );
}