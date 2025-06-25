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

const Dashboard = () => {
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("1 Month");

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
    last48hIncrease: 978
  };

  const clientData = [
    { month: "Jan", clients: 160000, revenue: 125000 },
    { month: "Feb", clients: 180000, revenue: 132000 },
    { month: "Mar", clients: 220000, revenue: 148000 },
    { month: "Apr", clients: 250000, revenue: 162000 },
    { month: "May", clients: 240000, revenue: 175000 },
    { month: "Jun", clients: 260000, revenue: 189000 },
    { month: "Jul", clients: 280000, revenue: 195000 },
    { month: "Aug", clients: 240000, revenue: 203000 },
    { month: "Sep", clients: 220000, revenue: 218000 },
    { month: "Oct", clients: 200000, revenue: 235000 },
    { month: "Nov", clients: 180000, revenue: 248000 },
    { month: "Dec", clients: 160000, revenue: 267000 },
  ];

  const mostPopular = [
    { name: "Divorce Cases...", views: 94 },
    { name: "Family Wealth Distribution...", views: 89 },
    { name: "Murder Cases...", views: 73 },
    { name: "Corporate law essentials", views: 51 },
    { name: "Family law procedures", views: 46 }
  ];

  const caseTypes = [
    { name: "Corporate", value: 35, color: "#3B82F6" },
    { name: "Family", value: 25, color: "#10B981" },
    { name: "Criminal", value: 20, color: "#F59E0B" },
    { name: "Civil", value: 15, color: "#EF4444" },
    { name: "Other", value: 5, color: "#8B5CF6" }
  ];

  const monthlyProgress = [
    { month: "Jan", value: 5 },
    { month: "Feb", value: 10 },
    { month: "Mar", value: 15 },
    { month: "Apr", value: 12 },
    { month: "May", value: 18 },
    { month: "Jun", value: 22 },
    { month: "Jul", value: 25 },
    { month: "Aug", value: 28 },
    { month: "Sep", value: 24 },
    { month: "Oct", value: 26 },
    { month: "Nov", value: 30 },
    { month: "Dec", value: 28 }
  ];

  const recentClients = [
    { id: 1, name: "Sarah Johnson", type: "Corporate Law", status: "Active", avatar: "SJ", color: "#3B82F6" },
    { id: 2, name: "Michael Chen", type: "Family Law", status: "Pending", avatar: "MC", color: "#10B981" },
    { id: 3, name: "Emma Wilson", type: "Criminal Defense", status: "Active", avatar: "EW", color: "#F59E0B" },
    { id: 4, name: "David Brown", type: "Civil Rights", status: "Completed", avatar: "DB", color: "#EF4444" },
    { id: 5, name: "Lisa Anderson", type: "IP Law", status: "Active", avatar: "LA", color: "#8B5CF6" }
  ];

  const recentCases = [
    { id: 1, title: "Contract Dispute Resolution", client: "Tech Corp", status: "In Progress", priority: "High", date: "2025-06-20" },
    { id: 2, title: "Divorce Settlement", client: "Johnson Family", status: "Review", priority: "Medium", date: "2025-06-18" },
    { id: 3, title: "Patent Application", client: "Innovation Ltd", status: "Filed", priority: "Low", date: "2025-06-15" },
    { id: 4, title: "Employment Dispute", client: "Global Industries", status: "Negotiation", priority: "High", date: "2025-06-12" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <style jsx>{`
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-slide-up { animation: slideInUp 0.6s ease-out; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out; }
        .animate-pulse-gentle { animation: pulse 2s infinite; }
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
        <div className={`flex justify-between items-center ${animationTrigger ? "animate-fade-in" : ""}`}>
          <div>
            <h1 className="text-3xl font-semibold text-slate-800 mb-2">Dashboard</h1>
            <p className="text-slate-600">Legal practice management overview</p>
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
          {/* User Today Card - Exact Match */}
          <div className={`glass-card px-8 py-6 rounded-2xl card-hover ${animationTrigger ? "animate-scale-in" : ""}`}>
            <h3 className="text-xl font-semibold text-gray-800 mb-8">User today</h3>
            
            <div className="flex items-center justify-between">
              {/* Circular Progress */}
              <div className="relative">
                <svg width="140" height="140" className="transform -rotate-90">
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
                  <span className="text-4xl font-semibold text-gray-800">{todayStats.totalMatters}</span>
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
                    <p className="text-xl font-semibold text-gray-800">{todayStats.opened} <span className="text-gray-400 font-normal text-sm">matters</span></p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-orange-200 rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Closed</p>
                    <p className="text-xl font-semibold text-gray-800">{todayStats.closed} <span className="text-gray-400 font-normal text-sm">matters</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Most Popular */}
          <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? "animate-scale-in" : ""}`} style={{ animationDelay: "0.1s" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Most Popular</h3>
              <span className="text-blue-500 text-sm font-medium">{selectedPeriod}</span>
            </div>
            <div className="space-y-3">
              {mostPopular.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1 mr-4">
                    <p className="text-sm text-slate-800 truncate">{item.name}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-600">{item.views.toLocaleString()}</span>
                </div>
              ))}
              <button className="w-full text-center text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors mt-4">
                See More ↓
              </button>
            </div>
          </div>

          {/* Statistics Card - Exact Match */}
          <div className={`glass-card px-6 py-6 rounded-2xl card-hover ${animationTrigger ? "animate-scale-in" : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Statistics</h3>
              <span className="text-blue-500 text-sm font-medium">Last 48h</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="relative mb-4">
                  <svg width="80" height="80" className="transform -rotate-90 mx-auto">
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
                <p className="text-green-500 text-lg font-semibold">+{todayStats.recentIncrease}</p>
                <p className="text-gray-500 text-sm mb-1">Pending</p>
                <p className="text-gray-800 text-lg font-semibold">{todayStats.pending.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <div className="relative mb-4">
                  <svg width="80" height="80" className="transform -rotate-90 mx-auto">
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
                <p className="text-green-500 text-lg font-semibold">+{todayStats.last48hIncrease}</p>
                <p className="text-gray-500 text-sm mb-1">Active</p>
                <p className="text-gray-800 text-lg font-semibold">{todayStats.active.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row - Main Chart & Case Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Clients Chart */}
          <div className={`lg:col-span-2 glass-card p-6 rounded-2xl card-hover ${animationTrigger ? "animate-slide-up" : ""}`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Total Clients</h3>
                <p className="text-slate-600 text-sm">Previous Month - November 2024</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">November</p>
                <p className="text-2xl font-semibold text-slate-800">892,443</p>
              </div>
            </div>
            <div className="h-100">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clientData}>
                  <defs>
                    <linearGradient id="clientGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="clients"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fill="url(#clientGradient)"
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time View & Case Distribution */}
          <div className="space-y-6">
            {/* Time View */}
            <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? "animate-scale-in" : ""}`} style={{ animationDelay: "0.3s" }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Time View</h3>
                <span className="text-blue-500 text-sm">2021 ↓</span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProgress}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#EC4899" 
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      dot={{ fill: "#EC4899", strokeWidth: 2, r: 3 }}
                    />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Case Distribution */}
            <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? "animate-scale-in" : ""}`} style={{ animationDelay: "0.4s" }}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Case Distribution</h3>
              <div className="h-30">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={caseTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {caseTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {caseTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                    <span className="text-xs text-slate-600">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Recent Clients & Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clients */}
          <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? "animate-slide-up" : ""}`} style={{ animationDelay: "0.5s" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Recent Clients</h3>
              <span className="text-blue-500 text-sm hover:text-blue-600 cursor-pointer">View All →</span>
            </div>
            <div className="space-y-3">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 hover:bg-white/60 rounded-lg transition-all">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: client.color }}
                    >
                      {client.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{client.name}</p>
                      <p className="text-xs text-slate-500">{client.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'Active' ? 'bg-green-100 text-green-800' :
                    client.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Cases */}
          <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? "animate-slide-up" : ""}`} style={{ animationDelay: "0.6s" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Recent Cases</h3>
              <span className="text-blue-500 text-sm hover:text-blue-600 cursor-pointer">View All →</span>
            </div>
            <div className="space-y-3">
              {recentCases.map((case_) => (
                <div key={case_.id} className="p-3 hover:bg-white/60 rounded-lg transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-slate-800 text-sm">{case_.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      case_.priority === 'High' ? 'bg-red-100 text-red-800' :
                      case_.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {case_.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{case_.client}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      case_.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      case_.status === 'Review' ? 'bg-purple-100 text-purple-800' :
                      case_.status === 'Filed' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {case_.status}
                    </span>
                    <span className="text-xs text-slate-400">{case_.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;