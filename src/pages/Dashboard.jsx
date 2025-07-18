import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import MiniNavbar from "../components/MiniNavbar";

const Dashboard = () => {
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("1 Month");
  const [selectedUser, setSelectedUser] = useState("All Users");

  useEffect(() => {
    setAnimationTrigger(true);
  }, []);

  // Mock data for various metrics
  const todayStats = {
    totalMatters: 573,
    opened: 179,
    closed: 394,
    pending: 14855,
    active: 211348,
    recentIncrease: 219,
    last48hIncrease: 978,
  };

  const revenueData = [
    { month: "Jan", revenue: 245000, invoices: 125 },
    { month: "Feb", revenue: 289000, invoices: 142 },
    { month: "Mar", revenue: 315000, invoices: 158 },
    { month: "Apr", revenue: 298000, invoices: 162 },
    { month: "May", revenue: 342000, invoices: 175 },
    { month: "Jun", revenue: 378000, invoices: 189 },
    { month: "Jul", revenue: 395000, invoices: 195 },
    { month: "Aug", revenue: 412000, invoices: 203 },
    { month: "Sep", revenue: 387000, invoices: 188 },
    { month: "Oct", revenue: 425000, invoices: 215 },
    { month: "Nov", revenue: 456000, invoices: 228 },
    { month: "Dec", revenue: 489000, invoices: 245 },
  ];

  const mostPopular = [
    { name: "Corporate Law Services", amount: "$125,400" },
    { name: "Litigation Services", amount: "$98,750" },
    { name: "Family Law Consultation", amount: "$73,200" },
    { name: "Contract Review Services", amount: "$65,850" },
    { name: "IP Law Services", amount: "$54,300" },
  ];

  const invoiceStatus = [
    { name: "Paid", value: 45, color: "#10B981" },
    { name: "Pending", value: 30, color: "#F59E0B" },
    { name: "Overdue", value: 15, color: "#EF4444" },
    { name: "Draft", value: 10, color: "#6B7280" },
  ];

  const monthlyProgress = [
    { month: "Jan", value: 245 },
    { month: "Feb", value: 289 },
    { month: "Mar", value: 315 },
    { month: "Apr", value: 298 },
    { month: "May", value: 342 },
    { month: "Jun", value: 378 },
    { month: "Jul", value: 395 },
    { month: "Aug", value: 412 },
    { month: "Sep", value: 387 },
    { month: "Oct", value: 425 },
    { month: "Nov", value: 456 },
    { month: "Dec", value: 489 },
  ];

  const recentClients = [
    {
      id: 1,
      name: "TechCorp Solutions",
      type: "Corporate Client",
      status: "Paid",
      avatar: "TC",
      color: "#3B82F6",
      amount: "$15,500",
    },
    {
      id: 2,
      name: "Johnson & Associates",
      type: "Law Firm",
      status: "Pending",
      avatar: "JA",
      color: "#10B981",
      amount: "$8,750",
    },
    {
      id: 3,
      name: "Global Industries Ltd",
      type: "Corporate Client",
      status: "Paid",
      avatar: "GI",
      color: "#F59E0B",
      amount: "$22,300",
    },
    {
      id: 4,
      name: "Smith Family Trust",
      type: "Private Client",
      status: "Overdue",
      avatar: "SF",
      color: "#EF4444",
      amount: "$5,200",
    },
    {
      id: 5,
      name: "Innovation Partners",
      type: "Startup",
      status: "Paid",
      avatar: "IP",
      color: "#8B5CF6",
      amount: "$12,400",
    },
  ];

  const recentInvoices = [
    {
      id: 1,
      invoice: "INV-2025-001",
      client: "TechCorp Solutions",
      status: "Paid",
      amount: "$15,500",
      date: "2025-06-20",
    },
    {
      id: 2,
      invoice: "INV-2025-002",
      client: "Johnson & Associates",
      status: "Pending",
      amount: "$8,750",
      date: "2025-06-18",
    },
    {
      id: 3,
      invoice: "INV-2025-003",
      client: "Global Industries",
      status: "Paid",
      amount: "$22,300",
      date: "2025-06-15",
    },
    {
      id: 4,
      invoice: "INV-2025-004",
      client: "Smith Family Trust",
      status: "Overdue",
      amount: "$5,200",
      date: "2025-06-12",
    },
  ];

  // Fixed bar chart data for invoice status breakdown
  const invoiceStatusData = [
    { status: "Draft", count: 12, color: "#6B7280" },
    { status: "Pending Manager", count: 8, color: "#F59E0B" },
    { status: "Invoiced", count: 34, color: "#3B82F6" },
    { status: "Completed by Manager", count: 45, color: "#10B981" },
  ];

  // User data for dropdown and status breakdown
  const users = [
    "All Users",
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emily Davis",
    "David Wilson",
  ];

  // User-specific data based on selection
  const getUserStatusData = (user) => {
    const baseData = {
      "All Users": [
        { status: "Draft", count: 12, percentage: 12 },
        { status: "Pending Manager", count: 8, percentage: 8 },
        { status: "Invoiced", count: 34, percentage: 34 },
        { status: "Completed by Manager", count: 46, percentage: 46 },
      ],
      "John Smith": [
        { status: "Draft", count: 3, percentage: 15 },
        { status: "Pending Manager", count: 2, percentage: 10 },
        { status: "Invoiced", count: 7, percentage: 35 },
        { status: "Completed by Manager", count: 8, percentage: 40 },
      ],
      "Sarah Johnson": [
        { status: "Draft", count: 2, percentage: 10 },
        { status: "Pending Manager", count: 1, percentage: 5 },
        { status: "Invoiced", count: 8, percentage: 40 },
        { status: "Completed by Manager", count: 9, percentage: 45 },
      ],
      "Michael Brown": [
        { status: "Draft", count: 4, percentage: 20 },
        { status: "Pending Manager", count: 3, percentage: 15 },
        { status: "Invoiced", count: 6, percentage: 30 },
        { status: "Completed by Manager", count: 7, percentage: 35 },
      ],
      "Emily Davis": [
        { status: "Draft", count: 1, percentage: 5 },
        { status: "Pending Manager", count: 1, percentage: 5 },
        { status: "Invoiced", count: 8, percentage: 40 },
        { status: "Completed by Manager", count: 10, percentage: 50 },
      ],
      "David Wilson": [
        { status: "Draft", count: 2, percentage: 12 },
        { status: "Pending Manager", count: 1, percentage: 6 },
        { status: "Invoiced", count: 5, percentage: 29 },
        { status: "Completed by Manager", count: 9, percentage: 53 },
      ],
    };
    return baseData[user] || baseData["All Users"];
  };

  const currentUserData = getUserStatusData(selectedUser);
  const totalMatters = currentUserData.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Draft":
        return "#ef4444";
      case "Pending Manager":
        return "#f59e0b";
      case "Invoiced":
        return "#3b82f6";
      case "Completed by Manager":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="min-h-screen bg-blue-50 p-6">
        <style jsx>{`
          @keyframes slideInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scaleIn {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          .animate-slide-up {
            animation: slideInUp 0.6s ease-out;
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out;
          }
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
          .animate-pulse-gentle {
            animation: pulse 2s infinite;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
        `}</style>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div
            className={`flex justify-between items-center ${
              animationTrigger ? "animate-fade-in" : ""
            }`}
          >
            <div>
              <h1 className="text-3xl font-semibold text-slate-800 mb-2">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </select>
            </div>
          </div>

          {/* Top Row - User Today & Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Today Card - Keeping as requested */}
            <div
              className={`glass-card px-8 py-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-scale-in" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-8">
                User today
              </h3>

              <div className="flex items-center justify-between">
                {/* Circular Progress */}
                <div className="relative">
                  <svg
                    width="140"
                    height="140"
                    className="transform -rotate-90"
                  >
                    {/* Background circle */}
                    <circle
                      cx="70"
                      cy="70"
                      r="55"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="70"
                      cy="70"
                      r="55"
                      stroke="#F59E0B"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(65 / 100) * 345} 345`}
                      strokeLinecap="round"
                      className="transition-all duration-1500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-semibold text-gray-800">
                      {todayStats.totalMatters}
                    </span>
                    <span className="text-gray-500 text-sm">matters</span>
                  </div>
                </div>

                {/* Stats on the right */}
                <div className="space-y-6 ml-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-600 rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Opened</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {todayStats.opened}{" "}
                        <span className="text-gray-400 font-normal text-sm">
                          matters
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-orange-200 rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Closed</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {todayStats.closed}{" "}
                        <span className="text-gray-400 font-normal text-sm">
                          matters
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Revenue Generators */}
            <div
              className={`glass-card p-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-scale-in" : ""
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Top Revenue Generators
                </h3>
                <span className="text-blue-500 text-sm font-medium">
                  {selectedPeriod}
                </span>
              </div>
              <div className="space-y-3">
                {mostPopular.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex-1 mr-4">
                      <p className="text-sm text-slate-800 truncate">
                        {item.name}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {item.amount}
                    </span>
                  </div>
                ))}
                <button className="w-full text-center text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors mt-4">
                  See More ↓
                </button>
              </div>
            </div>

            {/* Revenue Statistics */}
            <div
              className={`glass-card px-6 py-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-scale-in" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Revenue Statistics
                </h3>
                <span className="text-blue-500 text-sm font-medium">
                  Last 48h
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="relative mb-4">
                    <svg
                      width="80"
                      height="80"
                      className="transform -rotate-90 mx-auto"
                    >
                      {/* Background circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#EC4899"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(75 / 100) * 188} 188`}
                        strokeLinecap="round"
                        className="transition-all duration-1500 ease-out"
                      />
                    </svg>
                  </div>
                  <p className="text-green-500 text-lg font-semibold">+$45K</p>
                  <p className="text-gray-500 text-sm mb-1">Pending</p>
                  <p className="text-gray-800 text-lg font-semibold">$125K</p>
                </div>
                <div className="text-center">
                  <div className="relative mb-4">
                    <svg
                      width="80"
                      height="80"
                      className="transform -rotate-90 mx-auto"
                    >
                      {/* Background circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#EC4899"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(85 / 100) * 188} 188`}
                        strokeLinecap="round"
                        className="transition-all duration-1500 ease-out"
                      />
                    </svg>
                  </div>
                  <p className="text-green-500 text-lg font-semibold">+$89K</p>
                  <p className="text-gray-500 text-sm mb-1">Collected</p>
                  <p className="text-gray-800 text-lg font-semibold">$456K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row - Main Chart & Invoice Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Total Revenue Chart */}
            <div
              className={`lg:col-span-2 glass-card p-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-slide-up" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Monthly Revenue
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Previous Month - November 2024
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">November</p>
                  <p className="text-2xl font-semibold text-slate-800">
                    $456,000
                  </p>
                </div>
              </div>
              <div className="h-100">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="invoiceGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#F59E0B"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#F59E0B"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748B", fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value, name) => {
                        if (name === "revenue")
                          return [`$${value.toLocaleString()}`, "Revenue"];
                        if (name === "invoices") return [value, "Invoices"];
                        return [value, name];
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="invoices"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-6">
              <div
                className={`glass-card p-6 rounded-2xl card-hover ${
                  animationTrigger ? "animate-scale-in" : ""
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Invoice Status
                </h3>
                <div className="h-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={invoiceStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={150}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {invoiceStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, `${name}`]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  {invoiceStatus.map((status, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <span className="text-xs text-slate-600">
                        {status.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className={`lg:col-span-2 glass-card p-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-slide-up" : ""
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  Invoice Status Breakdown
                </h3>
                <span className="text-blue-500 text-sm">Overall Progress</span>
              </div>
              <div className="h-70">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={invoiceStatusData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="status"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748B", fontSize: 12 }}
                      height={100}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748B", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value, _name) => [value, "Count"]}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Stats */}
            <div
              className={`glass-card p-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-scale-in" : ""
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-6">
                Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Invoices</span>
                  <span className="text-lg font-semibold text-slate-800">
                    99
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Revenue</span>
                  <span className="text-lg font-semibold text-green-600">
                    $456,000
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Pending Amount</span>
                  <span className="text-lg font-semibold text-orange-600">
                    $125,000
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Overdue Amount</span>
                  <span className="text-lg font-semibold text-red-600">
                    $23,500
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-sm text-slate-600">
                    Collection Rate
                  </span>
                  <span className="text-lg font-semibold text-blue-600">
                    85%
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Row - Recent Clients & Invoices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Clients */}
            <div
              className={`glass-card p-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-slide-up" : ""
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Recent Client Billing
                </h3>
                <span className="text-blue-500 text-sm hover:text-blue-600 cursor-pointer">
                  View All →
                </span>
              </div>
              <div className="space-y-3">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 hover:bg-white/60 rounded-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: client.color }}
                      >
                        {client.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">
                          {client.name}
                        </p>
                        <p className="text-xs text-slate-500">{client.type}</p>
                        <p className="text-xs font-medium text-green-600">
                          {client.amount}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : client.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Invoices */}
            <div
              className={`glass-card p-6 rounded-2xl card-hover ${
                animationTrigger ? "animate-slide-up" : ""
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Recent Invoices
                </h3>
                <span className="text-blue-500 text-sm hover:text-blue-600 cursor-pointer">
                  View All →
                </span>
              </div>
              <div className="space-y-3">
                {recentInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="p-3 hover:bg-white/60 rounded-lg transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-800 text-sm">
                        {invoice.invoice}
                      </h4>
                      <span className="font-semibold text-green-600 text-sm">
                        {invoice.amount}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">
                      {invoice.client}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      ></span>
                      <span className="text-xs text-slate-400">
                        {invoice.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New Horizontal Bar Chart - Overall Status Breakdown */}
          <div
            className={`glass-card p-6 rounded-2xl card-hover ${
              animationTrigger ? "animate-slide-up" : ""
            }`}
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Overall Status Breakdown
              </h3>

              {/* Dropdown for user selection */}
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 text-sm">Select User</span>
                <select className="border border-slate-300 rounded-md text-sm px-2 py-1 text-slate-700 focus:outline-none">
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Michael Lee</option>
                  <option>Emily Davis</option>
                </select>
              </div>
            </div>

            {/* Custom Horizontal Bar Chart */}
            <div className="space-y-4">
              {/* Draft */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">
                    Draft
                  </span>
                  <span className="text-sm text-slate-600">12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-red-500 h-6 rounded-full flex items-center justify-start pl-3"
                    style={{ width: "12%" }}
                  >
                    <span className="text-white text-xs font-medium">12%</span>
                  </div>
                </div>
              </div>

              {/* Pending Manager */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">
                    Pending Manager
                  </span>
                  <span className="text-sm text-slate-600">8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-orange-500 h-6 rounded-full flex items-center justify-start pl-3"
                    style={{ width: "21%" }}
                  >
                    <span className="text-white text-xs font-medium">21%</span>
                  </div>
                </div>
              </div>

              {/* Invoiced */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">
                    Invoiced
                  </span>
                  <span className="text-sm text-slate-600">34</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-blue-500 h-6 rounded-full flex items-center justify-start pl-3"
                    style={{ width: "34%" }}
                  >
                    <span className="text-white text-xs font-medium">34%</span>
                  </div>
                </div>
              </div>

              {/* Completed by Manager */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">
                    Completed by Manager
                  </span>
                  <span className="text-sm text-slate-600">45</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-green-500 h-6 rounded-full flex items-center justify-start pl-3"
                    style={{ width: "45%" }}
                  >
                    <span className="text-white text-xs font-medium">45%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">
                  Total Matters
                </span>
                <span className="text-lg font-semibold text-slate-800">99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
