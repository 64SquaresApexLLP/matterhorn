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
      className="h-[10vh] bg-blue-50 text-[var(--secondary-600)] flex items-center justify-between px-6 shadow-lg border-b border-gray-200"
    >
      {/* Search Bar */}
      <div className="border border-gray-300 bg-gray-50 ml-[30vw] relative hidden md:flex items-center rounded-md overflow-hidden text-gray-800 shadow-sm w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-1 outline-none text-sm"
        />
        <div className="cursor-pointer bg-white px-3 py-2 text-[var(--secondary)]">
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
