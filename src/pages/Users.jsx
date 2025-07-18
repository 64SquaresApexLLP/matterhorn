"use client";

import React, { useState } from "react";
import {
  FiPlus,
  FiChevronDown,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
} from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { motion } from "framer-motion";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const users = [
    {
      id: 1,
      firstName: "Flori",
      lastName: "Popa",
      email: "fpopa@matterhorn.global",
    },
    {
      id: 2,
      firstName: "Terri",
      lastName: "Smith",
      email: "tsmith@matterhorn.global",
    },
    {
      id: 3,
      firstName: "Seth",
      lastName: "Rodack",
      email: "srodack@lkglobal.com",
    },
    {
      id: 4,
      firstName: "Timothy",
      lastName: "Lorenz",
      email: "tlorenz@lkglobal.com",
    },
    {
      id: 5,
      firstName: "S.",
      lastName: "Pitts",
      email: "jpitts@lkglobal.com",
    },
    {
      id: 6,
      firstName: "Deborah",
      lastName: "Henscheid",
      email: "dhenscheid@lkglobal.com",
    },
    {
      id: 7,
      firstName: "Paul",
      lastName: "Amrozowicz",
      email: "pamrozowicz@lkglobal.com",
    },
    {
      id: 8,
      firstName: "Mark",
      lastName: "Takahashi",
      email: "mtakahashi@lkglobal.com",
    },
    {
      id: 9,
      firstName: "Sean",
      lastName: "Johnson",
      email: "sjohnson@lkglobal.com",
    },
    {
      id: 10,
      firstName: "Thomas",
      lastName: "Berry",
      email: "tberry@lkglobal.com",
    },
  ];

  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (<motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{
      duration: 0.5,
      ease: "easeInOut"
    }}
    >
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-full mx-auto ml-30">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FiPlus className="w-4 h-4" />
            New User
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-3 gap-4 p-4">
            {["firstName", "lastName", "email"].map((field) => (
              <div key={field} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters[field]}
                    onChange={(e) => handleFilterChange(field, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Filter by ${field}`}
                  />
                  <FiFilter className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <HiOutlineBriefcase className="w-5 h-5 text-gray-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Items per page:</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {startIndex + 1} - {endIndex} of {totalItems}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Users;
