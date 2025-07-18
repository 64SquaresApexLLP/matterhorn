import React, { useState } from "react";
import {
  BarChart3,
  DollarSign,
  Users,
  Building2,
  CreditCard,
  Package,
  User,
  ChevronDown,
} from "lucide-react";

const MiniNavbar = () => {
  const [activeItem, setActiveItem] = useState("company-overview");

  const navItems = [
    { id: "company-overview", label: "Company overview", icon: Building2 },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "agents", label: "Agents", icon: Users },
    { id: "bank-accounts", label: "Bank accounts", icon: BarChart3 },
    { id: "devices", label: "Devices", icon: Package },
    { id: "packages", label: "Packages", icon: Package },
    { id: "users", label: "Users", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-sm border-r border-gray-100 z-50 flex flex-col">
        {/* Company Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Sunday Ltd.
              </h1>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`
                  w-full flex items-center px-6 py-3 text-left transition-all duration-150
                  ${
                    isActive
                      ? "bg-gray-50 text-gray-900 border-r-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={`mr-3 ${
                    isActive ? "text-gray-700" : "text-gray-500"
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {navItems.find((item) => item.id === activeItem)?.label ||
                "Company Overview"}
            </h1>
            <p className="text-gray-600">
              {activeItem === "company-overview" &&
                "Manage your company settings and overview"}
              {activeItem === "payments" &&
                "Track and manage payment transactions"}
              {activeItem === "agents" &&
                "Manage your sales agents and representatives"}
              {activeItem === "bank-accounts" &&
                "Configure and monitor bank account connections"}
              {activeItem === "devices" &&
                "Manage connected devices and hardware"}
              {activeItem === "packages" &&
                "View and configure service packages"}
              {activeItem === "users" && "Manage user accounts and permissions"}
            </p>
          </div>

          {/* Sample Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Revenue
                </h3>
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">$46,278</p>
              <p className="text-sm text-green-600 mt-1">
                +12% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Users
                </h3>
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-blue-600 mt-1">+5% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Connected Devices
                </h3>
                <Package className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">87</p>
              <p className="text-sm text-purple-600 mt-1">
                All systems operational
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {navItems.find((item) => item.id === activeItem)?.label} Details
              </h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Add New
                </button>
                <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  Export
                </button>
              </div>
            </div>

            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                {React.createElement(
                  navItems.find((item) => item.id === activeItem)?.icon ||
                    Building2,
                  {
                    className: "w-12 h-12 text-gray-400 mx-auto mb-3",
                  }
                )}
                <p className="text-gray-500">
                  {navItems.find((item) => item.id === activeItem)?.label}{" "}
                  content will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniNavbar;
