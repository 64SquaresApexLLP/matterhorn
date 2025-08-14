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
  FaCog,
  FaUserEdit,
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
  const [currentTheme, setCurrentTheme] = useState("corporate");
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRefs = useRef({});

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.themeId);
    };
    
    window.addEventListener('themeChanged', handleThemeChange);
    
    // Get initial theme and validate it
    const savedTheme = localStorage.getItem("theme") || "corporate";
    const validTheme = savedTheme === "dark" ? "corporate" : savedTheme;
    setCurrentTheme(validTheme);
    
    // Update localStorage if we had to change the theme
    if (savedTheme === "dark") {
      localStorage.setItem("theme", "corporate");
    }
    
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  // Update active index based on current location
  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");

    // Handle special cases
    if (currentPath === "entries/new") {
      setActiveIndex(2);
      return;
    }

    const foundIndex = menuItems.findIndex((item) => {
      if (item.path === currentPath) {
        return true;
      }
      if (currentPath.startsWith(item.path)) {
        return true;
      }
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
      setOpenDropdown(openDropdown === index ? null : index);
      setActiveIndex(index);
    } else {
      setOpenDropdown(null);
      setActiveIndex(index);
      navigate(`/${item.path}`);
    }
  };

  const handleDropdownItemClick = (parentIndex, subItem) => {
    setActiveIndex(parentIndex);
    navigate(`/${subItem.path}`);
    setOpenDropdown(null);
  };

  // Dynamic styles based on theme (without dark mode)
  const getNavbarStyles = () => {
    switch (currentTheme) {
      case 'corporate':
        return {
          bg: 'bg-[#062e69]',
          text: 'text-white',
          activeText: 'text-yellow-300',
          hoverBg: 'hover:bg-white/10',
          activeBg: 'bg-yellow-400/10',
          borderColor: 'border-white/20'
        };
      case 'dracula':
        return {
          bg: 'bg-[#2e2e3a]',
          text: 'text-gray-100',
          activeText: 'text-purple-300',
          hoverBg: 'hover:bg-purple-500/10',
          activeBg: 'bg-purple-500/10',
          borderColor: 'border-purple-400/20'
        };
      default:
        return {
          bg: 'bg-[#062e69]',
          text: 'text-white',
          activeText: 'text-yellow-300',
          hoverBg: 'hover:bg-white/10',
          activeBg: 'bg-yellow-400/10',
          borderColor: 'border-white/20'
        };
    }
  };

  const styles = getNavbarStyles();

  return (
    <div
      data-navbar
      className={`${styles.bg} ${styles.text} shadow-lg flex flex-col justify-between sticky bottom-0 navbar-${currentTheme}`}
      style={{ height: "100vh", width: isOpen ? 250 : 80, zIndex: 1000 }}
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
                  className="h-[8vh] pl-0"
                />
              )}
            </div>
          </div>
        </NavLink>

        <nav className="mt-4 relative font-medium">
          {/* Active indicator */}
          <div
            className={`absolute left-0 w-1 ${
              currentTheme === 'dracula' ? 'bg-purple-400' : 'bg-white'
            } rounded-r-full transition-all duration-300`}
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
                        ? `${styles.activeText} ${styles.activeBg}`
                        : styles.hoverBg
                    }
                    ${!isOpen ? "justify-center" : ""}`}
                  onClick={() => handleMenuClick(idx)}
                >
                  <span
                    className={`text-lg flex-shrink-0 transition-all duration-200
                      ${activeIndex === idx ? `${styles.activeText} scale-110` : ""}`}
                  >
                    {item.icon}
                  </span>
                  {isOpen && (
                    <span className="text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>

                {item.dropdown && openDropdown === idx && (
                  <div
                    className="absolute left-full top-0 ml-1 bg-gray-800 border-gray-600 border rounded-lg shadow-lg min-w-[180px] opacity-100"
                    style={{ zIndex: 9999 }}
                  >
                    {item.dropdown.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg text-white hover:bg-gray-700"
                        onClick={() => handleDropdownItemClick(idx, subItem)}
                      >
                        <span className="text-base">{subItem.icon}</span>
                        <span className="text-sm">{subItem.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {!isOpen && !item.dropdown && (
                  <span
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md"
                    style={{ zIndex: 9998 }}
                  >
                    {item.name}
                  </span>
                )}

                {!isOpen && item.dropdown && openDropdown !== idx && (
                  <span
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md"
                    style={{ zIndex: 9998 }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* User Section */}
      <div className="relative">
        <div className={`p-4 border-t ${styles.borderColor}`}>
          {/* User Profile Section */}
          <div
            className={`flex items-center gap-2 cursor-pointer ${styles.hoverBg} rounded-lg p-2 transition-all duration-200 mb-4 ${
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
                  <p className="text-xs font-medium opacity-80">Project Manager</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Navigation Links */}
          <div className="space-y-2 mb-4">
            <NavLink
              to="/edit-profile"
              className={`flex items-center ${styles.hoverBg} transition-colors duration-200 rounded-lg p-2 ${
                !isOpen ? "justify-center" : "gap-3"
              }`}
            >
              <FaUserEdit className="text-lg flex-shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium">Edit Profile</span>
              )}
            </NavLink>

            <NavLink
              to="/settings"
              className={`flex items-center ${styles.hoverBg} transition-colors duration-200 rounded-lg p-2 ${
                !isOpen ? "justify-center" : "gap-3"
              }`}
            >
              <FaCog className="text-lg flex-shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium">Settings</span>
              )}
            </NavLink>
          </div>

          {/* Logout Button */}
          <button
            className={`cursor-pointer w-full flex items-center ${
              isOpen ? "justify-start gap-3 px-2" : "justify-center"
            } py-2 text-left bg-white hover:bg-gray-300 rounded-lg transition-all duration-200`}
              style={{ color: 'var(--primary)' }}
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
