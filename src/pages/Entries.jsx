import React, { useState, useMemo } from "react";
import {
  FiPlus,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiEye,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";

const Entries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [timekeeperFilter, setTimekeeperFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Sample data based on the entries table
  const entriesData = [
    {
      matterNumber: "9053BR",
      client: "0141 - General Dynamics - Gulfstream",
      date: "3/4/25",
      timekeeper: "Takahashi, Mark",
      type: "fee",
      status: "Paid",
      total: "US$250.00 USD",
    },
    {
      matterNumber: "9544USC1",
      client: "0141 - General Dynamics - Gulfstream",
      date: "1/28/25",
      timekeeper: "Takahashi, Mark",
      type: "fee",
      status: "Invoiced",
      total: "US$340.00 USD",
    },
    {
      matterNumber: "9544USC1",
      client: "0141 - General Dynamics - Gulfstream",
      date: "1/30/25",
      timekeeper: "Takahashi, Mark",
      type: "fee",
      status: "Invoiced",
      total: "US$340.00 USD",
    },
    {
      matterNumber: "9544USC1",
      client: "0141 - General Dynamics - Gulfstream",
      date: "2/10/25",
      timekeeper: "Takahashi, Mark",
      type: "fee",
      status: "Invoiced",
      total: "US$136.00 USD",
    },
    {
      matterNumber: "9544USC1",
      client: "0141 - General Dynamics - Gulfstream",
      date: "2/20/25",
      timekeeper: "Takahashi, Mark",
      type: "fee",
      status: "Invoiced",
      total: "US$1,020.00 USD",
    },
    {
      matterNumber: "9544USC1",
      client: "0141 - General Dynamics - Gulfstream",
      date: "3/12/25",
      timekeeper: "Takahashi, Mark",
      type: "fee",
      status: "Invoiced",
      total: "US$414.00 USD",
    },
    {
      matterNumber: "9053BR",
      client: "0141 - General Dynamics - Gulfstream",
      date: "3/4/25",
      timekeeper: "Takahashi, Mark",
      type: "cost",
      status: "Paid",
      total: "US$323.00 USD",
    },
    {
      matterNumber: "9404EP",
      client: "0141 - General Dynamics - Gulfstream",
      date: "3/26/25",
      timekeeper: "Takahashi, Mark",
      type: "fee",
      status: "Invoiced",
      total: "US$238.00 USD",
    },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = entriesData.filter((entry) => {
      const matchesSearch =
        searchTerm === "" ||
        entry.matterNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.timekeeper.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "" || entry.status === statusFilter;
      const matchesType = typeFilter === "" || entry.type === typeFilter;
      const matchesTimekeeper =
        timekeeperFilter === "" || entry.timekeeper === timekeeperFilter;

      // Simple date filtering (in a real app, you'd parse dates properly)
      const matchesDateRange =
        (dateRange.start === "" && dateRange.end === "") || true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesTimekeeper &&
        matchesDateRange
      );
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (sortField === "total") {
          // Extract numeric value from currency strings
          aVal = parseFloat(aVal.replace(/[US$,\s]/g, ""));
          bVal = parseFloat(bVal.replace(/[US$,\s]/g, ""));
        } else if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (sortDirection === "asc") {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [
    searchTerm,
    statusFilter,
    typeFilter,
    timekeeperFilter,
    dateRange,
    sortField,
    sortDirection,
  ]);

  // Pagination
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate total amount
  const totalAmount = filteredAndSortedData.reduce((sum, entry) => {
    const amount = parseFloat(entry.total.replace(/[US$,\s]/g, ""));
    return sum + amount;
  }, 0);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortableHeader = ({ field, children }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <FiChevronDown
          className={`h-4 w-4 transform transition-transform ${
            sortField === field
              ? sortDirection === "asc"
                ? "rotate-180"
                : "rotate-0"
              : "opacity-50"
          }`}
        />
      </div>
    </th>
  );

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case "Paid":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "Invoiced":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "Draft":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTypeBadge = (type) => {
    const baseClasses =
      "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (type) {
      case "fee":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case "cost":
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Entries</h1>
            <p className="text-gray-600 mt-1">
              Total:{" "}
              <span className="font-semibold text-gray-900">
                US$
                {totalAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FiPlus className="h-5 w-5" />
            <span>New Entry</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search entries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Date Range */}
            <div className="relative">
              <input
                type="date"
                placeholder="Start date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
            </div>

            {/* Timekeeper Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={timekeeperFilter}
                onChange={(e) => setTimekeeperFilter(e.target.value)}
              >
                <option value="">All Timekeepers</option>
                <option value="Takahashi, Mark">Takahashi, Mark</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="fee">Fee</option>
                <option value="cost">Cost</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Invoiced">Invoiced</option>
                <option value="Draft">Draft</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableHeader field="matterNumber">
                    Matter Number
                  </SortableHeader>
                  <SortableHeader field="client">Client</SortableHeader>
                  <SortableHeader field="date">Date</SortableHeader>
                  <SortableHeader field="timekeeper">Timekeeper</SortableHeader>
                  <SortableHeader field="type">Type</SortableHeader>
                  <SortableHeader field="status">Status</SortableHeader>
                  <SortableHeader field="total">Total</SortableHeader>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((entry, index) => (
                  <tr
                    key={`${entry.matterNumber}-${entry.date}-${index}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.matterNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="truncate" title={entry.client}>
                        {entry.client}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.timekeeper}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getTypeBadge(entry.type)}>
                        {entry.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(entry.status)}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                          title="Download"
                        >
                          <FiDownload className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, totalItems)}
                  </span>{" "}
                  of <span className="font-medium">{totalItems}</span> results
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                          currentPage === pageNum
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
