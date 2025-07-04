import React, { useState, useMemo } from 'react';
import { 
  FiPlus, 
  FiChevronDown, 
  FiChevronLeft, 
  FiChevronRight, 
  FiSearch,
  FiFilter,
  FiEye,
  FiDownload,
  FiMoreVertical
} from 'react-icons/fi';

const Matters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sample data based on the patent table
  const mattersData = [
    {
      number: '0003US',
      applicationNumber: '10/158,296',
      name: 'METHODS AND APPARATUS FOR GENERATING A MULTIPLEXED COMMUNICATION SIGNAL',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0011US',
      applicationNumber: '10/871,442',
      name: 'METHOD AND APPARATUS FOR DISTRIBUTED POLYPHASE SPREAD SPECTRUM COMMUNICATIONS',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0012US',
      applicationNumber: '10/853,376',
      name: 'METHOD AND APPARATUS FOR SIGNAL SEPARATION',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0025US',
      applicationNumber: '11/357,553',
      name: 'HIGH DYNAMIC RANGE ANALOG TO DIGITAL CONVERTER ARCHITECTURE',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0027US',
      applicationNumber: '11/622,585',
      name: 'SIGNAL ACQUISITION METHODS AND APPARATUS IN WIRELESS COMMUNICATION SYSTEMS',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0030US',
      applicationNumber: '11/622,587',
      name: 'METHODS AND SYSTEMS FOR ACQUIRING SIGNALS USING COHERENT MATCH FILTERING',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0281US',
      applicationNumber: '10/417,942',
      name: 'MULTI-CARRIER MODULATION WITH SOURCE INFORMATION ALLOCATED OVER VARIABLE QUALITY COMMUNICATION CHANNEL',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0281USX1',
      applicationNumber: '10/437,422',
      name: 'MULTI-CARRIER MODULATION WITH SOURCE INFORMATION ALLOCATED OVER VARIABLE QUALITY COMMUNICATION CHANNEL',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0351USX1',
      applicationNumber: '12/725,985',
      name: 'METHODS AND APPARATUS FOR MULTIPLE-ANTENNA COMMUNICATION OF WIRELESS SIGNALS WITH EMBEDDED SYNCHRONIZATION/PILOT SEQUENCES',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0355US',
      applicationNumber: '12/034,297',
      name: 'SYSTEMS AND METHODS FOR PROVIDING EFFICIENT BANDWIDTH UTILIZATION IN PACKET SWITCHED NETWORKS',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    }
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = mattersData.filter(matter => {
      const matchesSearch = searchTerm === '' || 
        matter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matter.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matter.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === '' || matter.type === typeFilter;
      
      return matchesSearch && matchesType;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [searchTerm, typeFilter, sortField, sortDirection]);

  // Pagination
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortableHeader = ({ field, children, className = "" }) => (
    <th 
      className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <FiChevronDown 
          className={`h-4 w-4 transform transition-transform ${
            sortField === field 
              ? sortDirection === 'asc' ? 'rotate-180' : 'rotate-0'
              : 'opacity-50'
          }`}
        />
      </div>
    </th>
  );

  // Mobile Card Component
  const MobileCard = ({ matter }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm mb-1">{matter.number}</h3>
          <p className="text-xs text-gray-500 mb-2">{matter.applicationNumber}</p>
        </div>
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {matter.type}
        </span>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-900 font-medium mb-1">{matter.name}</p>
        <p className="text-xs text-gray-500">{matter.client}</p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button 
          className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors"
          title="View Details"
        >
          <FiEye className="h-4 w-4" />
        </button>
        <button 
          className="text-gray-600 hover:text-gray-900 p-2 rounded hover:bg-gray-50 transition-colors"
          title="Download"
        >
          <FiDownload className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-6">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Matters</h1>
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <FiPlus className="h-5 w-5" />
            <span>New Matter</span>
          </button>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="xl:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="flex items-center space-x-2">
              <FiFilter className="h-4 w-4" />
              <span>Filters & Search</span>
            </span>
            <FiChevronDown className={`h-4 w-4 transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters and Search */}
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 ${showMobileFilters ? 'block' : 'hidden xl:block'}`}>
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search matters..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Type Filter */}
              <div className="flex-1 sm:flex-none relative">
                <select
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="PATENT">PATENT</option>
                  <option value="TRADEMARK">TRADEMARK</option>
                  <option value="COPYRIGHT">COPYRIGHT</option>
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>

              {/* Items per page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Show:</span>
                <select
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="xl:hidden">
          {paginatedData.length > 0 ? (
            paginatedData.map((matter, index) => (
              <MobileCard key={matter.number} matter={matter} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No matters found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden xl:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableHeader field="number">Number</SortableHeader>
                  <SortableHeader field="applicationNumber" className="hidden 2xl:table-cell">Application Number</SortableHeader>
                  <SortableHeader field="name">Name</SortableHeader>
                  <SortableHeader field="client" className="hidden 2xl:table-cell">Client</SortableHeader>
                  <SortableHeader field="type">Type</SortableHeader>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((matter, index) => (
                    <tr key={matter.number} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {matter.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden 2xl:table-cell">
                        {matter.applicationNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs 2xl:max-w-md">
                          <div className="truncate" title={matter.name}>
                            {matter.name}
                          </div>
                          <div className="2xl:hidden text-xs text-gray-500 mt-1">
                            {matter.applicationNumber}
                          </div>
                          <div className="2xl:hidden text-xs text-gray-500 mt-1 truncate" title={matter.client}>
                            {matter.client}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden 2xl:table-cell">
                        <div className="max-w-xs truncate" title={matter.client}>
                          {matter.client}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {matter.type}
                        </span>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No matters found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 xl:mt-0 xl:rounded-b-lg">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{' '}
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
              
              <div className="hidden md:flex space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                        currentPage === pageNum
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
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
  );
};

export default Matters;