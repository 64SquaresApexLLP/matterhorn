import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const LegalDashboard = () => {
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    setAnimationTrigger(true);
  }, []);

  const revenueData = [
    { month: 'Jan', revenue: 125000, cases: 28, billableHours: 420 },
    { month: 'Feb', revenue: 132000, cases: 31, billableHours: 456 },
    { month: 'Mar', revenue: 148000, cases: 35, billableHours: 502 },
    { month: 'Apr', revenue: 162000, cases: 38, billableHours: 543 },
    { month: 'May', revenue: 175000, cases: 42, billableHours: 587 },
    { month: 'Jun', revenue: 189000, cases: 45, billableHours: 612 },
    { month: 'Jul', revenue: 195000, cases: 48, billableHours: 634 },
    { month: 'Aug', revenue: 203000, cases: 52, billableHours: 658 },
    { month: 'Sep', revenue: 218000, cases: 55, billableHours: 682 },
    { month: 'Oct', revenue: 235000, cases: 58, billableHours: 703 },
    { month: 'Nov', revenue: 248000, cases: 62, billableHours: 728 },
    { month: 'Dec', revenue: 267000, cases: 65, billableHours: 756 }
  ];

  const recentTransactions = [
    { id: 1, client: 'Sarah Johnson', type: 'Consultation Fee', amount: 850, status: 'completed', initials: 'SJ', color: '#8B5CF6' },
    { id: 2, client: 'Lucas Miller', type: 'Retainer Payment', amount: 3500, status: 'completed', initials: 'LM', color: '#10B981' },
    { id: 3, client: 'Walmart Corp', type: 'Corporate Legal', amount: 12500, status: 'pending', initials: 'WC', color: '#F59E0B' },
    { id: 4, client: 'Chloe Lewis', type: 'Family Law', amount: 1250, status: 'completed', initials: 'CL', color: '#EF4444' },
    { id: 5, client: 'Starbucks', type: 'Contract Review', amount: 850, status: 'completed', initials: 'SB', color: '#06B6D4' },
    { id: 6, client: 'FutureMobil', type: 'IP Consultation', amount: 2400, status: 'pending', initials: 'FM', color: '#8B5CF6' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
          <p className="text-slate-700 font-medium">{`${label}`}</p>
          <p className="text-blue-600 font-semibold">
            {`Revenue: $${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-green-600 font-semibold">
            {`Cases: ${payload[1] ? payload[1].value : 0}`}
          </p>
        </div>
      );
    }
    return null;
  };

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
        
        .animate-slide-up {
          animation: slideInUp 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .sidebar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .purple-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 sidebar rounded-2xl p-6 mr-6">
          <div className="text-white mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">⚖️</span>
              </div>
              <span className="text-xl font-bold">LawFirm Pro</span>
            </div>
          </div>

          <nav className="space-y-2 mb-8">
            {[
              { icon: '📊', label: 'Dashboard', active: true },
              { icon: '💳', label: 'Payments' },
              { icon: '👥', label: 'Clients' },
              { icon: '🏛️', label: 'Court Cases' },
              { icon: '📄', label: 'Documents' },
              { icon: '📧', label: 'Invoices' },
              { icon: '👤', label: 'Lawyers' }
            ].map((item, i) => (
              <div key={i} className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                item.active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}>
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </nav>

          <button className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg font-medium transition-all mb-4">
            New Case
          </button>

          <button className="w-full bg-white/10 hover:bg-white/20 text-white/80 py-2 px-4 rounded-lg text-sm transition-all">
            Firm Settings
          </button>

          <div className="mt-8 purple-gradient p-4 rounded-xl text-white">
            <h4 className="font-bold mb-2">Legal Updates</h4>
            <p className="text-sm text-white/90 mb-3">Stay updated with latest legal precedents</p>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-medium transition-all">
              Get Pro Plan
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className={`flex justify-between items-center ${animationTrigger ? 'animate-fade-in' : ''}`}>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Legal Practice</h1>
                <p className="text-slate-600">Financial overview and case management</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                  JM
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Revenue Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Revenue Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? 'animate-scale-in' : ''}`}>
                    <div className="mb-4">
                      <p className="text-slate-600 text-sm">Firm Revenue</p>
                      <h2 className="text-4xl font-bold text-slate-800">$2,847,250</h2>
                      <p className="text-emerald-600 text-sm font-medium">+15.2% from last month</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Cases</span>
                        <span className="font-semibold">$2,345,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Pending Fees</span>
                        <span className="font-semibold">$125,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Next Payment</span>
                        <span className="font-semibold">24 Mar 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.1s' }}>
                    <div className="mb-4">
                      <p className="text-slate-600 text-sm">Monthly Expenses</p>
                      <h2 className="text-4xl font-bold text-slate-800">$425,150</h2>
                      <p className="text-red-500 text-sm font-medium">+8.7% from last month</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Office Rent</span>
                        <span className="font-semibold">$45,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Staff Salaries</span>
                        <span className="font-semibold">$285,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Turnover</span>
                        <span className="font-semibold">$1,950,850</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Chart */}
                <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? 'animate-slide-up' : ''}`}>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Analytics</h3>
                      <p className="text-slate-600 text-sm">Revenue and case performance</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">$2,847,250</p>
                        <p className="text-sm text-emerald-600">26% ↗</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">$425,150</p>
                        <p className="text-sm text-red-500">12% ↗</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="casesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748B', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          fill="url(#revenueGradient)"
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="cases"
                          stroke="#10B981"
                          strokeWidth={3}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* My Card */}
                <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.2s' }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">My Card</h3>
                    <span className="text-slate-500 text-sm">Details →</span>
                  </div>
                  
                  <div className="purple-gradient p-4 rounded-xl text-white mb-4 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute top-4 right-8 w-6 h-6 bg-white/10 rounded-full"></div>
                    <div className="mb-8">
                      <p className="text-white/80 text-sm">Jeremy Martinez</p>
                      <p className="text-white/60 text-xs">Partner Attorney</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$2,847,250</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-white/80 text-sm">****</span>
                        <span className="text-white/80 text-sm">+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transactions */}
                <div className={`glass-card p-6 rounded-2xl card-hover ${animationTrigger ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.3s' }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Transactions</h3>
                    <span className="text-slate-500 text-sm">All →</span>
                  </div>

                  <div className="space-y-3">
                    {recentTransactions.map((transaction, index) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-white/60 rounded-lg transition-all">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                            style={{ backgroundColor: transaction.color }}
                          >
                            {transaction.initials}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 text-sm">{transaction.client}</p>
                            <p className="text-xs text-slate-500">{transaction.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold text-sm ${
                            transaction.status === 'completed' ? 'text-emerald-600' : 'text-blue-600'
                          }`}>
                            ${transaction.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`glass-card p-4 rounded-xl text-center card-hover ${animationTrigger ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.4s' }}>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-lg">📋</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">156</p>
                    <p className="text-xs text-slate-600">Active Cases</p>
                  </div>
                  
                  <div className={`glass-card p-4 rounded-xl text-center card-hover ${animationTrigger ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.5s' }}>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-lg">⚖️</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">94.2%</p>
                    <p className="text-xs text-slate-600">Win Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDashboard;