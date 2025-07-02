"use client";
import React, { useState } from "react";
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
} from "react-icons/fa";
import { MdDataArray } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Dashboard", icon: <FaChartBar />, path: "dashboard" },
  { name: "Clients", icon: <FaUser />, path: "clients" },
  { name: "Matters", icon: <FaFolderOpen />, path: "matters" },
  { name: "Entries", icon: <FaClock />, path: "entries" },
  {
    name: "Ref. Data Management",
    icon: <MdDataArray />,
    path: "reference-data-mgt",
  },
  { name: "Invoices", icon: <FaFileInvoice />, path: "invoices" },
  { name: "Payments", icon: <FaMoneyCheckAlt />, path: "payments" },
  { name: "Reports", icon: <FaChartBar />, path: "reports" },
  { name: "Users", icon: <FaUsers />, path: "users" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    navigate(`/${menuItems[index].path}`);
  };

  return (
    <div
      className="bg-gradient-to-b from-[var(--secondary-900)] to-[var(--secondary-600)] text-[var(--text)] shadow-lg flex flex-col justify-between sticky bottom-0"
      style={{ height: "100vh", width: isOpen ? 250 : 80 }}
    >
      <div className="">
        <NavLink to="/" className="flex items-center">
          <div className="flex items-center">
            <motion.div
              key={isOpen ? "logo-expand" : "logo-collapse"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center"
            >
              {isOpen ? (
                <img
                  src="./logo.png"
                  alt="logo"
                  className="p-1 h-[8vh] pl-2 pb-0"
                />
              ) : (
                <img
                  src="./favicon-2.png"
                  alt="logo"
                  className="m-2 h-[8vh] pl-1"
                />
              )}
            </motion.div>
          </div>
        </NavLink>

        <button
          onClick={toggleSidebar}
          className="cursor-pointer absolute top-20 -right-4 z-10 w-8 h-8 bg-[var(--primary)] text-[var(--secondary)] rounded-full flex items-center justify-center shadow-md"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <nav className="mt-6 flex flex-col gap-2 relative font-medium">
          <div
            className="absolute left-0 w-1 bg-[var(--primary)] rounded-r-full"
            style={{ height: "48px", top: `${activeIndex * 48}px` }}
          />

          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 px-4 py-6 cursor-pointer relative ${
                activeIndex === idx
                  ? "text-[var(--primary)]"
                  : "hover:bg-[var(--primary)]/20"
              } ${!isOpen ? "justify-center" : ""}`}
              onClick={() => handleMenuClick(idx)}
              style={{ height: "48px" }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <span className="text-sm whitespace-nowrap">{item.name}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* User Section */}
      <div className="relative">
        <div className="p-4 border-t border-[var(--primary)]/40">
          <NavLink to="/edit-profile">
            <div
              className={`flex items-center gap-2 cursor-pointer hover:bg-[var(--primary)]/20 rounded-lg ${
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
                {isOpen && (
                  <div>
                    <p className="text-sm font-semibold">Flori</p>
                    <p className="text-xs font-medium">Project Manager</p>
                  </div>
                )}
              </div>
            </div>
          </NavLink>

          <button
            className={`cursor-pointer w-full mt-4 flex items-center ${
              isOpen ? "justify-start gap-3 px-2" : "justify-center"
            } py-2 text-left bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white`}
            onClick={() => {
              console.log("Logout clicked");
            }}
          >
            <FiLogOut className="text-lg" />
            {isOpen && <span className="text-sm">Log out</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
