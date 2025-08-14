import React, { useState } from "react";
import { FiEye, FiDownload, FiEdit2 } from "react-icons/fi";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const revenueData = [
  {
    month: "Jan",
    revenue: 2400,
    invoices: 5,
  },
  {
    month: "Feb",
    revenue: 3800,
    invoices: 9,
  },
  {
    month: "Mar",
    revenue: 3200,
    invoices: 6,
  },
  {
    month: "Apr",
    revenue: 5000,
    invoices: 10,
  },
  {
    month: "May",
    revenue: 4200,
    invoices: 8,
  },
  {
    month: "Jun",
    revenue: 4600,
    invoices: 11,
  },
];

const reportsData = [
  {
    name: "Client Billing Summary",
    date: "2025-06-10",
  },
  {
    name: "Matter Time Tracking",
    date: "2025-05-22",
  },
  {
    name: "Pending Invoices Report",
    date: "2025-05-15",
  },
  {
    name: "Quarterly Performance",
    date: "2025-04-10",
  },
  {
    name: "Monthly Revenue Report",
    date: "2025-06-01",
  },
  {
    name: "Matter Time Tracking",
    date: "2025-05-22",
  },
  {
    name: "Pending Invoices Report",
    date: "2025-05-15",
  },
  {
    name: "Quarterly Performance",
    date: "2025-04-10",
  },
];

const Reports = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="min-h-screen p-6">
        <div className="max-w-full mx-auto ml-30 space-y-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Revenue & Invoice Trend
            </h2>
            <div className="h-80">
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
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="invoiceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
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

          {/* Report Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 text-left text-sm font-medium text-gray-600 uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 bg-gray-50">Report Name</th>
                    <th className="px-6 py-3 bg-gray-50">Date</th>
                    <th className="px-6 py-3 bg-gray-50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {reportsData.map((report, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">{report.name}</td>
                      <td className="px-6 py-4">{report.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            title="View"
                          >
                            <FiEye className="h-5 w-5" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Download"
                          >
                            <FiDownload className="h-5 w-5" />
                          </button>
                          <button
                            className="text-yellow-500 hover:text-yellow-600"
                            title="Edit"
                          >
                            <FiEdit2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Fill rows if short */}
                  {reportsData.length < 8 &&
                    Array.from({ length: 8 - reportsData.length }).map(
                      (_, idx) => (
                        <tr key={`empty-${idx}`}>
                          <td colSpan={3} className="px-6 py-4">
                            &nbsp;
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;
