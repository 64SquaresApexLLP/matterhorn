import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";

// Icon components (keeping your existing ones)
const ChevronDown = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronLeft = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Plus = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Search = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Filter = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
  </svg>
);

const Eye = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Download = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Matters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sample data (keeping your existing data)
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
    },
    {
      number: '0400US',
      applicationNumber: '13/234,567',
      name: 'ADVANCED WIRELESS COMMUNICATION PROTOCOLS FOR ENHANCED SECURITY',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    },
    {
      number: '0401US',
      applicationNumber: '13/345,678',
      name: 'MACHINE LEARNING ALGORITHMS FOR NETWORK OPTIMIZATION',
      client: '014A - General Dynamics - Mission Systems',
      type: 'PATENT'
    }
  ];

  // Filter and sort data (keeping your existing logic)
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

  // Pagination logic (keeping your existing logic)
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

  const SortableHeader = ({ field, children, className = "", width = "" }) => (
    <th 
      className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors ${className} ${width}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-2">
        <span className="whitespace-nowrap">{children}</span>
        <ChevronDown 
          className={`h-4 w-4 transform transition-transform flex-shrink-0 ${
            sortField === field 
              ? sortDirection === 'asc' ? 'rotate-180' : 'rotate-0'
              : 'opacity-50'
          }`}
        />
      </div>
    </th>
  );

  // Mobile Card Component (keeping your existing mobile component)
  const MobileCard = ({ matter }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{matter.number}</h3>
          <p className="text-xs text-gray-500 mb-2">{matter.applicationNumber}</p>
        </div>
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ml-2 flex-shrink-0">
          {matter.type}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-900 font-medium mb-2 line-clamp-2">{matter.name}</p>
        <p className="text-xs text-gray-500 truncate">{matter.client}</p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button 
          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button 
          className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      <div className="min-h-screen ml-30">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Matters</h1>
              <p className="text-gray-600">Manage your intellectual property matters</p>
            </div>
            <button className="w-full sm:w-auto bg-[var(--primary)] text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg font-medium">
              <Plus className="h-4 w-4" />
              <span>New Matter</span>
            </button>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filters & Search</span>
              </span>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters and Search */}
          <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search matters by name, number, or application..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Type Filter */}
                  <div className="relative min-w-48">
                    <select
                      className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="">All Types</option>
                      <option value="PATENT">Patent</option>
                      <option value="TRADEMARK">Trademark</option>
                      <option value="COPYRIGHT">Copyright</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                  </div>

                  {/* Items per page */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 whitespace-nowrap">Items per page:</span>
                    <select
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-20"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                {/* Results count */}
                <div className="text-sm text-gray-600 font-medium">
                  {totalItems} {totalItems === 1 ? 'matter' : 'matters'} found
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden">
            {paginatedData.length > 0 ? (
              <div className="space-y-4">
                {paginatedData.map((matter) => (
                  <MobileCard key={matter.number} matter={matter} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg">No matters found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <SortableHeader field="number" width="w-32">Number</SortableHeader>
                    <SortableHeader field="applicationNumber" width="w-40">Application Number</SortableHeader>
                    <SortableHeader field="name" width="w-96">Name</SortableHeader>
                    <SortableHeader field="client" width="w-72">Client</SortableHeader>
                    <SortableHeader field="type" width="w-24">Type</SortableHeader>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((matter, index) => (
                      <tr key={matter.number} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {matter.number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 font-mono">
                            {matter.applicationNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium leading-relaxed">
                            <div className="line-clamp-2" title={matter.name}>
                              {matter.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <div className="truncate" title={matter.client}>
                              {matter.client}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {matter.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <button 
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
                        <div className="text-gray-400 mb-4">
                          <Search className="h-16 w-16 mx-auto" />
                        </div>
                        <p className="text-gray-500 text-xl font-medium">No matters found</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination - keeping your existing pagination logic but with improved styling */}
          {totalPages > 1 && (
            <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-0 lg:rounded-b-xl">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    className="relative inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="hidden md:flex space-x-1">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 7) {
                        pageNum = i + 1;
                      } else {
                        if (currentPage <= 4) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 3) {
                          pageNum = totalPages - 6 + i;
                        } else {
                          pageNum = currentPage - 3 + i;
                        }
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'z-10 bg-blue-600 border-blue-600 text-white'
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
                    className="relative inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom styles */}
        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </motion.div>
  );
};

export default Matters;
