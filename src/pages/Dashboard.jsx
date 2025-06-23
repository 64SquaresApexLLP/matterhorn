import React, { useState, useEffect } from 'react';

const LegalDashboard = () => {
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    setAnimationTrigger(true);
  }, []);

  const recentClients = [
    { id: 1, name: 'Sarah Johnson', case: 'Personal Injury', status: 'Active', amount: 15000, initials: 'SJ', color: '#3B82F6' },
    { id: 2, name: 'Michael Chen', case: 'Corporate Law', status: 'Pending', amount: 25000, initials: 'MC', color: '#10B981' },
    { id: 3, name: 'Emma Rodriguez', case: 'Family Law', status: 'Active', amount: 8500, initials: 'ER', color: '#F59E0B' },
    { id: 4, name: 'David Thompson', case: 'Criminal Defense', status: 'Consultation', amount: 12000, initials: 'DT', color: '#EF4444' },
    { id: 5, name: 'Lisa Anderson', case: 'Real Estate', status: 'Active', amount: 18000, initials: 'LA', color: '#8B5CF6' },
  ];

  const caseStats = [
    { type: 'Personal Injury', count: 45, color: '#3B82F6', percentage: 28.8 },
    { type: 'Corporate Law', count: 32, color: '#10B981', percentage: 20.5 },
    { type: 'Family Law', count: 28, color: '#F59E0B', percentage: 17.9 },
    { type: 'Criminal Defense', count: 25, color: '#EF4444', percentage: 16.0 },
    { type: 'Real Estate', count: 18, color: '#8B5CF6', percentage: 11.5 },
    { type: 'Tax Law', count: 8, color: '#06B6D4', percentage: 5.1 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 125000, cases: 28 },
    { month: 'Feb', revenue: 132000, cases: 31 },
    { month: 'Mar', revenue: 148000, cases: 35 },
    { month: 'Apr', revenue: 162000, cases: 38 },
    { month: 'May', revenue: 175000, cases: 42 },
    { month: 'Jun', revenue: 189000, cases: 45 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Pending': return '#F59E0B';
      case 'Consultation': return '#3B82F6';
      case 'Closed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
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
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className={`${animationTrigger ? 'animate-fade-in' : ''}`}>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Legal Practice Dashboard</h1>
          <p className="text-slate-600">Overview of your law firm's performance and client management</p>
        </div>

        {/* Main Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${animationTrigger ? 'animate-slide-up' : ''}`}>
          {[
            { title: 'Total Revenue', value: '$2,845,000', change: '+12.5%', icon: '💰', color: 'from-emerald-500 to-emerald-600' },
            { title: 'Active Cases', value: '156', change: '+8.2%', icon: '📋', color: 'from-blue-500 to-blue-600' },
            { title: 'Total Clients', value: '247', change: '+15.3%', icon: '👥', color: 'from-purple-500 to-purple-600' },
            { title: 'Win Rate', value: '94.2%', change: '+2.1%', icon: '⚖️', color: 'from-orange-500 to-orange-600' },
          ].map((stat, index) => (
            <div key={index} className={`card-hover glass-effect p-6 rounded-2xl shadow-lg animate-scale-in`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <span className="text-emerald-600 text-sm font-semibold bg-emerald-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
              <p className="text-slate-600 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className={`lg:col-span-2 glass-effect rounded-2xl shadow-lg p-6 card-hover ${animationTrigger ? 'animate-slide-up' : ''}`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">Revenue Analytics</h2>
                <p className="text-slate-600 text-sm">Monthly performance overview</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">$189,000</div>
                <div className="text-sm text-emerald-600 font-medium">+12.5% this month</div>
              </div>
            </div>

            {/* Simple Chart */}
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 600 200">
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Revenue Area Chart */}
                <path
                  d={`M50,150 ${revenueData.map((d, i) => 
                    `L${50 + i * 90},${150 - (d.revenue / 3000)}`
                  ).join(' ')}`}
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  className="animate-fade-in"
                />
                <path
                  d={`M50,180 L50,150 ${revenueData.map((d, i) => 
                    `L${50 + i * 90},${150 - (d.revenue / 3000)}`
                  ).join(' ')} L${50 + (revenueData.length - 1) * 90},180 Z`}
                  fill="url(#revenueGradient)"
                  className="animate-fade-in"
                />
                
                {/* Data points */}
                {revenueData.map((d, i) => (
                  <circle
                    key={i}
                    cx={50 + i * 90}
                    cy={150 - (d.revenue / 3000)}
                    r="4"
                    fill="#3B82F6"
                    className="animate-scale-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
                
                {/* Month labels */}
                {revenueData.map((d, i) => (
                  <text key={i} x={50 + i * 90} y="195" textAnchor="middle" fill="#64748B" fontSize="12" className="font-medium">
                    {d.month}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Case Distribution */}
          <div className={`glass-effect rounded-2xl shadow-lg p-6 card-hover ${animationTrigger ? 'animate-slide-up' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800">Case Distribution</h3>
            </div>

            {/* Donut Chart */}
            <div className="flex justify-center mb-4">
              <svg className="w-40 h-40" viewBox="0 0 160 160">
                <defs>
                  {caseStats.slice(0, 4).map((stat, i) => (
                    <linearGradient key={i} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={stat.color} stopOpacity="1"/>
                      <stop offset="100%" stopColor={stat.color} stopOpacity="0.7"/>
                    </linearGradient>
                  ))}
                </defs>
                
                {/* Donut segments */}
                {caseStats.slice(0, 4).map((stat, i) => {
                  const startAngle = caseStats.slice(0, i).reduce((sum, s) => sum + (s.percentage * 3.6), 0) - 90;
                  const endAngle = startAngle + (stat.percentage * 3.6);
                  const startX = 80 + 50 * Math.cos(startAngle * Math.PI / 180);
                  const startY = 80 + 50 * Math.sin(startAngle * Math.PI / 180);
                  const endX = 80 + 50 * Math.cos(endAngle * Math.PI / 180);
                  const endY = 80 + 50 * Math.sin(endAngle * Math.PI / 180);
                  const largeArcFlag = stat.percentage > 50 ? 1 : 0;
                  
                  return (
                    <path
                      key={i}
                      d={`M 80 80 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      fill={`url(#gradient-${i})`}
                      className="animate-scale-in"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  );
                })}
                
                {/* Center circle */}
                <circle cx="80" cy="80" r="25" fill="white" className="animate-scale-in" style={{ animationDelay: '0.4s' }} />
                <text x="80" y="75" textAnchor="middle" fill="#1F2937" fontSize="16" className="font-bold">156</text>
                <text x="80" y="88" textAnchor="middle" fill="#64748B" fontSize="10">Cases</text>
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {caseStats.slice(0, 4).map((stat, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-lg bg-white/50 animate-fade-in`} style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                    <span className="text-sm font-medium text-slate-700">{stat.type}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800">{stat.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Clients */}
        <div className={`glass-effect rounded-2xl shadow-lg p-6 card-hover ${animationTrigger ? 'animate-slide-up' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Recent Clients</h2>
              <p className="text-slate-600 text-sm">Latest client activity and case updates</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg text-sm">
              View All
            </button>
          </div>

          {/* Clients List */}
          <div className="space-y-3">
            {recentClients.map((client, index) => (
              <div key={client.id} className={`flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
                    style={{ backgroundColor: client.color }}
                  >
                    {client.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{client.name}</div>
                    <div className="text-sm text-slate-500">{client.case}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                    style={{ backgroundColor: getStatusColor(client.status) }}
                  >
                    {client.status}
                  </span>
                  <span className="font-semibold text-slate-800">${client.amount.toLocaleString()}</span>
                  <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${animationTrigger ? 'animate-fade-in' : ''}`}>
          <div className="glass-effect p-6 rounded-2xl shadow-lg card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">1,247</p>
                <p className="text-sm text-slate-600">Billable Hours</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl shadow-lg card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📁</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">1,240</p>
                <p className="text-sm text-slate-600">Documents Filed</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl shadow-lg card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">23</p>
                <p className="text-sm text-slate-600">Upcoming Appointments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDashboard;