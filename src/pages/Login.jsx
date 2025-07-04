import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("fpopa@matterhorn.global");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!organization) {
      setError("Please select an organization.");
      return;
    }

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // Dummy check: Replace with real authentication logic
    if (email === "fpopa@matterhorn.global" && password === "password123") {
      setError(""); // Clear error
      localStorage.setItem("selectedOrganization", organization);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-[25vw] bg-gradient-to-r from-[#0E44A4] to-[#1167CC] flex flex-col items-center justify-center p-8">
        <img src="/logo-1.webp" alt="Logo" className="w-[90%] mb-4" />
        <p className="text-gray-200 text-center text-[100%] font-medium uppercase tracking-wide">
          Changing the Business of Law
        </p>
      </div>

      {/* Login Section */}
      <div
        className="w-[75vw] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to top, white 50px,transparent 50px), url('./bg.png')",
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-12">
          <div className="border-blue-400 border-1 bg-white rounded-xl shadow-xl p-4 w-full max-w-sm space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Sign In
            </h2>

            {/* Alert box */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
                {error}
              </div>
            )}

            {/* Organization Selector */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Organization
              </label>
              <select
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm outline-none"
              >
                <option value="">Select Organization</option>
                <option value="Matterhorn Legal">Matterhorn Legal</option>
                <option value="Justice Corp">Justice Corp</option>
                <option value="Legal Edge">Legal Edge</option>
                <option value="TrialWorks Ltd">TrialWorks Ltd</option>
                <option value="Courtify Solutions">Courtify Solutions</option>
              </select>
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
            >
              Sign In
            </button>

            {/* Links */}
            <div className="flex justify-between text-sm pt-2">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
              </span>
              <span className="text-blue-600 hover:underline cursor-pointer">
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
