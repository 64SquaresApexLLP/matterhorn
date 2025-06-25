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
    <div className="min-h-screen flex">
      {/* Left Side - 40% width */}
      <div className="w-[25vw] bg-blue-500 flex flex-col items-center justify-center p-8">
        <img src="/logo-1.webp" alt="Logo" className="w-[90%] mb-4" />
        <p className="text-gray-200 text-center text-[100%] font-medium uppercase tracking-wide">
          Changing the Business of Law
        </p>
      </div>

      {/* Right Side - 60% width */}
      <div
        className="w-[75vw] relative bg-cover bg-center"
        style={{
          backgroundImage: "url('./bg.png')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0"></div>

        {/* Login Form */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-12">
          <div className="border-blue-400 border-1 bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-6">
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
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
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
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
