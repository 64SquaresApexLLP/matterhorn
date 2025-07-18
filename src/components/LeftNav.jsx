import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  FaDatabase,
} from "react-icons/fa";
import { MdDataArray } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", icon: <FaChartBar />, path: "dashboard" },
  {
    name: "Clients & Users",
    icon: <FaUser />,
    path: "clients-users",
    dropdown: [
      { name: "Clients", icon: <FaUser />, path: "clients" },
      { name: "Users", icon: <FaUsers />, path: "users" },
    ],
  },
  {
    name: "Data",
    icon: <FaDatabase />,
    path: "data",
    dropdown: [
      { name: "Matters", icon: <FaFolderOpen />, path: "matters" },
      { name: "Entries", icon: <FaClock />, path: "entries" },
    ],
  },
  {
    name: "Ref. Data Management",
    icon: <MdDataArray />,
    path: "reference-data-mgt",
  },
  { name: "Invoices", icon: <FaFileInvoice />, path: "invoices" },
  { name: "Payments", icon: <FaMoneyCheckAlt />, path: "payments" },
  { name: "Reports", icon: <FaChartBar />, path: "reports" },
];

export default function Nav() {
  const [isOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRefs = useRef({});

  // Update active index based on current location
  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");

    // Handle special cases
    if (currentPath === "entries/new") {
      setActiveIndex(2); // Data index (contains entries)
      return;
    }

    const foundIndex = menuItems.findIndex((item) => {
      if (item.path === currentPath) {
        return true;
      }
      // Handle nested routes
      if (currentPath.startsWith(item.path)) {
        return true;
      }
      // Check dropdown items
      if (item.dropdown) {
        return item.dropdown.some(
          (subItem) =>
            currentPath === subItem.path || currentPath.startsWith(subItem.path)
        );
      }
      return false;
    });

    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown !== null &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const handleMenuClick = (index) => {
    const item = menuItems[index];

    if (item.dropdown) {
      // Toggle dropdown
      setOpenDropdown(openDropdown === index ? null : index);
      setActiveIndex(index);
    } else {
      // Navigate directly
      setActiveIndex(index);
      navigate(`/${item.path}`);
      setOpenDropdown(null);
    }
  };

  const handleDropdownItemClick = (parentIndex, subItem) => {
    setActiveIndex(parentIndex);
    navigate(`/${subItem.path}`);
    setOpenDropdown(null);
  };

  return (
    <div
      className="bg-gradient-to-b from-[var(--secondary-900)] to-[var(--secondary-600)] text-[var(--text)] shadow-lg flex flex-col justify-between sticky bottom-0"
      style={{ height: "100vh", width: isOpen ? 250 : 80 }}
    >
      <div>
        <NavLink to="/" className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-center">
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
                  className="m-2 h-[8vh] pl-0"
                />
              )}
            </div>
          </div>
        </NavLink>

        <nav className="mt-4 relative font-medium">
          {/* Active indicator */}
          <div
            className="absolute left-0 w-1 bg-[var(--primary)] rounded-r-full transition-all duration-300"
            style={{
              height: "45px",
              top: `${activeIndex * 55 + 6}px`,
            }}
          />

          {/* Menu items */}
          <div className="flex flex-col gap-2">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative"
                ref={(el) => (dropdownRefs.current[idx] = el)}
              >
                <div
                  className={`flex items-center gap-4 px-4 h-12 cursor-pointer transition-colors duration-200
      ${
        activeIndex === idx
          ? "text-yellow-300 bg-[var(--primary)]/10"
          : "hover:bg-[var(--primary)]/20"
      }
      ${!isOpen ? "justify-center" : ""}`}
                  onClick={() => handleMenuClick(idx)}
                >
                  <span
                    className={`text-lg flex-shrink-0 transition-all duration-200
        ${activeIndex === idx ? "text-yellow-300 scale-110" : ""}`}
                  >
                    {item.icon}
                  </span>
                  {isOpen && (
                    <span className="text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>

                {/* Dropdown menu */}
                {item.dropdown && openDropdown === idx && (
                  <div className="absolute left-full top-0 ml-1 bg-gradient-to-b from-[var(--secondary-800)] to-[var(--secondary-700)] border border-[var(--primary)]/20 rounded-lg shadow-lg z-30 min-w-[180px]">
                    {item.dropdown.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--primary)]/20 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleDropdownItemClick(idx, subItem)}
                      >
                        <span className="text-base">{subItem.icon}</span>
                        <span className="text-sm">{subItem.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tooltip when collapsed */}
                {!isOpen && !item.dropdown && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-md">
                    {item.name}
                  </span>
                )}

                {/* Dropdown tooltip when collapsed */}
                {!isOpen && item.dropdown && (
                  <div className="absolute left-full top-0 ml-1 bg-gray-700 rounded-lg shadow-lg z-30 min-w-[140px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 text-xs text-white font-medium border-b border-gray-600">
                      {item.name}
                    </div>
                    {item.dropdown.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200 text-white text-xs last:rounded-b-lg"
                        onClick={() => handleDropdownItemClick(idx, subItem)}
                      >
                        <span className="text-xs">{subItem.icon}</span>
                        <span>{subItem.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* User Section */}
      <div className="relative">
        <div className="p-4 border-t border-[var(--primary)]/40">
          <NavLink to="/edit-profile">
            <div
              className={`flex items-center gap-2 cursor-pointer hover:bg-[var(--primary)]/20 rounded-lg p-2 transition-all duration-200 ${
                !isOpen ? "justify-center" : "justify-between"
              }`}
              onClick={isOpen ? toggleUserMenu : undefined}
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1170"
                  alt="user"
                  className="rounded-full w-10 h-10 object-cover flex-shrink-0 hover:scale-110 transition-transform"
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
            } py-2 text-left bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white transition-all duration-200`}
            onClick={() => {
              console.log("Logout clicked");
              navigate("/");
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
