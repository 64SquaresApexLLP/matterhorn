import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("fpopa@matterhorn.global");
  const [password, setPassword] = useState("password123");

  const handleLogin = () => {
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/03/18/15/42/right-4944546_1280.jpg')" }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-800/80 to-black/70 z-0"></div>

      {/* Header */}
      <div className="absolute top-10 flex flex-col items-center z-10">
        <img src="/logo-1.webp" alt="Logo" className="w-[25vw] object-cover" />
        <div className="w-full border-b-2 border-white mt-2"></div>
        <p className="text-[1.43rem] text-gray-200 mt-1 uppercase tracking-wide">
          Changing the Business of Law
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-6 z-10 mt-48">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign In
        </h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="px-3 text-gray-500">
              <FaEnvelope />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="px-3 text-gray-500">
              <FaLock />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 outline-none text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="cursor-pointer w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-md transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
