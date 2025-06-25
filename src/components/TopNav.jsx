import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaCog, FaUserEdit } from "react-icons/fa";

const TopNav = () => {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="h-[10vh] bg-gradient-to-r from-[var(--secondary-900)] to-[var(--secondary-600)] text-[var(--text)] flex items-center justify-between px-6  shadow-md"
    >
      {/* Logo & Title */}
      <NavLink to="/" className="flex items-center">
        <img src="./favicon-2.png" alt="logo" className="h-[8vh] pl-1" />
        <h1 className="font-semibold text-xl sm:text-2xl pl-3 tracking-wide">
          Matterhorn Back Office Solutions
        </h1>
      </NavLink>

      {/* Search Bar */}
      <div className="ml-120 relative hidden md:flex items-center bg-white rounded-md overflow-hidden text-gray-800 shadow-sm w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-1 outline-none text-sm"
        />
        <div className="cursor-pointer bg-[var(--primary)] px-3 py-2 text-[var(--secondary)]">
          <FaSearch size={14} />
        </div>
      </div>

      {/* Right Links */}
      <div className="flex items-center space-x-4 text-sm">
        <NavLink
          to="/edit-profile"
          className="flex items-center hover:text-[var(--primary)] transition"
        >
          <FaUserEdit className="mr-1" />
          <span className="hidden sm:inline">Edit Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center hover:text-[var(--primary)] transition"
        >
          <FaCog className="mr-1" />
          <span className="hidden sm:inline">Settings</span>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default TopNav;
