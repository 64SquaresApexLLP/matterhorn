import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaCog, FaUserEdit } from "react-icons/fa";

const TopNav = () => {
  const [orgName, setOrgName] = useState("");

  useEffect(() => {
    const storedOrg = localStorage.getItem("selectedOrganization");
    setOrgName(storedOrg || "No Organization Selected");
  }, []);

  return (
    <div
      className="h-[10vh] bg-white text-[var(--secondary-600)] flex items-center justify-between px-6 shadow-lg border-b border-gray-200"
    >
      <div className="flex items-center space-x-4 text-lg">
        {/* Organization: &nbsp;<span className="font-medium"> {orgName}</span> */}
      </div>

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
    </div>
  );
};

export default TopNav;
