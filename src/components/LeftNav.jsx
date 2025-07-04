import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { MdDataArray } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

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
  const location = useLocation();

  // Update active index based on current location
  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
    
    // Handle special cases
    if (currentPath === 'entries/new') {
      setActiveIndex(3); // Entries index
      return;
    }
    
    const foundIndex = menuItems.findIndex(item => {
      if (item.path === currentPath) {
        return true;
      }
      // Handle nested routes
      if (currentPath.startsWith(item.path)) {
        return true;
      }
      return false;
    });
    
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname]);

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
                  className="m-2 h-[8vh] pl-1"
                />
              )}
            </div>
          </div>
        </NavLink>

        <button
          onClick={toggleSidebar}
          className="cursor-pointer absolute top-20 -right-4 z-10 w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-transform"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <nav className="mt-4 relative font-medium">
          {/* Active indicator */}
          <div
            className="absolute left-0 w-1 bg-[var(--primary)] rounded-r-full transition-all duration-300"
            style={{ 
              height: "45px",
              top: `${activeIndex * 55 + 6}px`
            }}
          />
          
          {/* Menu items */}
          <div className="flex flex-col gap-2">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 px-4 h-12 cursor-pointer relative transition-colors duration-200 ${
                  activeIndex === idx
                    ? "text-yellow-300 bg-[var(--primary)]/10"
                    : "hover:bg-[var(--primary)]/20"
                } ${!isOpen ? "justify-center" : ""}`}
                onClick={() => handleMenuClick(idx)}
              >
                <span 
                  className={`text-lg flex-shrink-0 ${
                    activeIndex === idx ? "text-yellow-300 scale-110" : ""
                  } transition-all duration-200`}
                >
                  {item.icon}
                </span>
                {isOpen && (
                  <span className="text-sm whitespace-nowrap">
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
            {isOpen && (
              <span className="text-sm">
                Log out
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}