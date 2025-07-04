"use client";

import React, { useState } from "react";
import { Calendar, Pencil } from "lucide-react";

const Demo = () => {
  const [formData, setFormData] = useState({
    number: "500000",
    date: "4/7/2025",
    client: "0141 - General Dynamics - Gulfstream",
    matter: "9053BR - AIRCRAFT COMPONENT AND METHOD OF MAKING AN AIRCRAFT CC",
    referenceId: "REF-PA100-A101",
    status: "Paid",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mt-24 max-w-6xl mx-auto bg-white p-6 rounded-md shadow">
      {/* Top Buttons */}
      <div className="flex justify-end mb-4 gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          View PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Number and Date */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
          <input
            type="text"
            value={formData.number}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <input
              type="text"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md pr-10"
              placeholder="MM/DD/YYYY"
            />
            <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Client and Matter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <input
            type="text"
            value={formData.client}
            onChange={(e) => handleInputChange("client", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Matter</label>
          <input
            type="text"
            value={formData.matter}
            onChange={(e) => handleInputChange("matter", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Reference ID and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reference ID</label>
          <input
            type="text"
            value={formData.referenceId}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value="Paid">Paid</option>
            <option value="Invoice">Invoice</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Demo;
