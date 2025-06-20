"use client";

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaUsers,
  FaFolderOpen,
  FaClock,
  FaFileInvoice,
  FaMoneyCheckAlt,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaCog,
  FaUserEdit,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", icon: <FaChartBar />, path: "dashboard" },
  { name: "Clients", icon: <FaUser />, path: "clients" },
  { name: "Matters", icon: <FaFolderOpen />, path: "matters" },
  { name: "Entries", icon: <FaClock />, path: "entries" },
  { name: "Invoices", icon: <FaFileInvoice />, path: "invoices" },
  { name: "Payments", icon: <FaMoneyCheckAlt />, path: "payments" },
  { name: "Reports", icon: <FaChartBar />, path: "reports" },
  { name: "Users", icon: <FaUsers />, path: "users" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    navigate(`/${menuItems[index].path}`);
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 200 : 80 }}
      className="bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900 text-white shadow-lg overflow-visible flex flex-col justify-between sticky bottom-0"
      style={{ height: "90vh" }}
      transition={{ duration: 0.4, type: "spring", damping: 15 }}
    >
      <div>
        {/* Toggle Button Floating on Top-Right */}
        <motion.button
          onClick={toggleSidebar}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer absolute top-4 -right-4 z-10 w-8 h-8 bg-yellow-400 hover:bg-yellow-300 text-teal-900 rounded-full flex items-center justify-center shadow-md"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </motion.button>

        <nav className="mt-4 flex flex-col gap-1 relative">
          {/* Active indicator */}
          <motion.div
            className="absolute left-0 w-1 bg-yellow-400 rounded-r-full"
            style={{
              height: "48px", // Height of menu item
            }}
            animate={{
              y: activeIndex * 49, // 48px height + 1px gap
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
          />

          {menuItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 relative ${
                activeIndex === idx
                  ? "text-yellow-400"
                  : "hover:bg-teal-600 hover:text-white"
              } ${!isOpen ? "justify-center" : ""}`}
              onClick={() => handleMenuClick(idx)}
              style={{ height: "48px" }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="relative">
        <div className="p-4 border-t border-teal-600">
          {/* User Profile */}
          <NavLink to="/edit-profile">
            <div
              className={`flex items-center gap-2 cursor-pointer hover:bg-teal-600 rounded-lg transition-colors ${
                !isOpen ? "justify-center" : "justify-between"
              }`}
              onClick={isOpen ? toggleUserMenu : undefined}
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1170"
                  alt="user"
                  className="rounded-full w-10 h-10 object-cover flex-shrink-0"
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm font-semibold">Flori</p>
                      <p className="text-xs text-teal-200">Project Manager</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </NavLink>

          {/* Logout Button */}
          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`cursor-pointer w-full mt-3 flex items-center ${
                isOpen ? "justify-start gap-3 px-2" : "justify-center"
              } py-2 text-left hover:bg-red-600 rounded-lg transition-colors text-red-200 hover:text-white`}
              onClick={() => {
                console.log("Logout clicked");
              }}
            >
              <FiLogOut className="text-lg" />
              {isOpen && <span className="text-sm">Log out</span>}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
