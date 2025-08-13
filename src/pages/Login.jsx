import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("fpopa@matterhorn.global");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!organization) {
      setError("Please select an organization.");
      return;
    }

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      // Dummy check: Replace with real authentication logic
      if (email === "fpopa@matterhorn.global" && password === "password123") {
        setError(""); // Clear error
        localStorage.setItem("selectedOrganization", organization);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
      className="min-h-screen flex"
    >
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-[30vw] bg-[#062e69] flex flex-col items-center justify-center p-8 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-5 w-16 h-16 bg-white/8 rounded-full blur-lg"></div>
        </div>
        
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          src="/logo-1.webp" 
          alt="Logo" 
          className="w-[85%] mb-6 relative z-10 filter drop-shadow-lg" 
        />
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/90 text-center text-lg font-medium uppercase tracking-wider relative z-10 leading-relaxed"
        >
          Changing the Business of Law
        </motion.p>
        
        {/* Animated dots */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex space-x-2 mt-8 relative z-10"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
              className="w-2 h-2 bg-white/60 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Login Section with Background Image */}
      <div className="w-[70vw] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img1.png"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40"></div>
        </div>

        {/* Login Form */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-12">
          <motion.div 
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md space-y-6"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Sign in to access your dashboard
              </p>
            </motion.div>

            {/* Enhanced Alert box */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r-md text-sm flex items-center"
              >
                <div className="flex-shrink-0 mr-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                {error}
              </motion.div>
            )}

            {/* Organization Selector */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization
              </label>
              <select
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              >
                <option value="">Select Organization</option>
                <option value="Matterhorn Legal">Matterhorn Legal</option>
                <option value="Justice Corp">Justice Corp</option>
                <option value="Legal Edge">Legal Edge</option>
                <option value="TrialWorks Ltd">TrialWorks Ltd</option>
                <option value="Courtify Solutions">Courtify Solutions</option>
              </select>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>

            {/* Sign In Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-[#062e69] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>

            {/* Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex justify-between text-sm pt-4 border-t border-gray-200"
            >
              <button className="text-[#062e69] hover:text-blue-900 hover:underline transition-colors font-medium">
                Forgot Password?
              </button>
              <button className="text-[#062e69] hover:text-blue-900 hover:underline transition-colors font-medium">
                Create Account
              </button>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-gray-500 text-xs mt-8 text-center"
          >
            © 2025 Matterhorn Legal. All rights reserved.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;