import React, { useState } from "react";
import {
  FiPlus,
  FiChevronDown,
  FiFilter,
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Clients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    number: "",
    name: "",
    parent: "",
    biller: "All",
  });

  const clients = [
    {
      id: 1,
      number: "014A",
      name: "Mission Systems",
      parent: "General Dynamics",
      biller: "Popa, Flori",
    },
    {
      id: 2,
      number: "014B",
      name: "IT",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 3,
      number: "014C",
      name: "AxleTech",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 4,
      number: "014D",
      name: "ATP",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 5,
      number: "014E",
      name: "Midcoast Aviation",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 6,
      number: "014F",
      name: "AIS",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 7,
      number: "014G",
      name: "OTS",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 8,
      number: "014H",
      name: "LAND SYSTEMS",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 9,
      number: "014I",
      name: "Gulfstream",
      parent: "General Dynamics",
      biller: "Popa, Flori",
    },
    {
      id: 10,
      number: "014J",
      name: "Electric Boat",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 11,
      number: "014K",
      name: "European Land Systems",
      parent: "General Dynamics",
      biller: "",
    },
    {
      id: 12,
      number: "014L",
      name: "Ordnance and Tactical Systems",
      parent: "General Dynamics",
      biller: "",
    },
  ];

  const totalItems = clients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentClients = clients.slice(startIndex, endIndex);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <motion.div
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
    >
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-full mx-auto ml-30">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FiPlus className="w-4 h-4" />
            New Client
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.number}
                  onChange={(e) => handleFilterChange("number", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Filter by number"
                />
                <FiFilter className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Filter by name"
                />
                <FiFilter className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.parent}
                  onChange={(e) => handleFilterChange("parent", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Filter by parent"
                />
                <FiFilter className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biller
              </label>
              <div className="relative">
                <select
                  value={filters.biller}
                  onChange={(e) => handleFilterChange("biller", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option>All</option>
                  <option>Popa, Flori</option>
                  <option>No Biller</option>
                </select>
                <FiChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      Number
                      <FiFilter className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      Name
                      <FiFilter className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      Parent
                      <FiFilter className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Biller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {client.number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {client.parent}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {client.biller}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <FiEdit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Items per page:</span>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
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
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default Clients;
