"use client";

import React, { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";

const TimekeeperForm = () => {
  const [formData, setFormData] = useState({
    client: "014 - General Dynamics",
    timekeeper: "",
    type: "Fee",
    hoursWorked: "1",
    hoursBilled: "1",
    currency: "",
    rate: "0",
    total: "0",
    phaseTask: "",
    activity: "",
    referenceId: "",
    narrative: "",
    billCode: "Billable",
    status: "Invoice",
    matter: "",
    date: "7/1/2025",
  });

  const phaseTaskActivityPairs = {
    "PA100 - Assessment, Development, and Administration": {
      "A101 - Plan and prepare for": "REF-PA100-A101",
      "A102 - Conduct assessment": "REF-PA100-A102",
      "A103 - Review and analyze": "REF-PA100-A103",
      "A104 - Document findings": "REF-PA100-A104",
    },
    "PA200 - Legal Research and Analysis": {
      "A201 - Research applicable law": "REF-PA200-A201",
      "A202 - Analyze legal precedents": "REF-PA200-A202",
      "A203 - Prepare legal memorandum": "REF-PA200-A203",
      "A204 - Review regulatory compliance": "REF-PA200-A204",
    },
    "PA300 - Document Review and Production": {
      "A301 - Review documents": "REF-PA300-A301",
      "A302 - Organize document production": "REF-PA300-A302",
      "A303 - Prepare privilege log": "REF-PA300-A303",
      "A304 - Quality control review": "REF-PA300-A304",
    },
    "PA400 - Case Management and Strategy": {
      "A401 - Develop case strategy": "REF-PA400-A401",
      "A402 - Coordinate with team": "REF-PA400-A402",
      "A403 - Client communication": "REF-PA400-A403",
      "A404 - Status reporting": "REF-PA400-A404",
    },
    "PA500 - Trial Preparation": {
      "A501 - Prepare witness testimony": "REF-PA500-A501",
      "A502 - Draft trial exhibits": "REF-PA500-A502",
      "A503 - Conduct mock trial": "REF-PA500-A503",
      "A504 - Final trial preparation": "REF-PA500-A504",
    },
  };

  const getActivitiesForPhaseTask = (phaseTask) => {
    return phaseTaskActivityPairs[phaseTask] || {};
  };

  useEffect(() => {
    if (formData.phaseTask && formData.activity) {
      const activities = getActivitiesForPhaseTask(formData.phaseTask);
      const referenceId = activities[formData.activity] || "";
      setFormData((prev) => ({ ...prev, referenceId }));
    } else {
      setFormData((prev) => ({ ...prev, referenceId: "" }));
    }
  }, [formData.phaseTask, formData.activity]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "phaseTask") {
        newData.activity = "";
      }
      return newData;
    });
  };

  const currentActivities = getActivitiesForPhaseTask(formData.phaseTask);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Timekeeper Entry</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
            <X size={16} />
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Save
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save & New
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Row - Client and Matter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.client}
              onChange={(e) => handleInputChange("client", e.target.value)}
            >
              <option value="014 - General Dynamics">
                014 - General Dynamics
              </option>
              <option value="015 - Boeing Corporation">
                015 - Boeing Corporation
              </option>
              <option value="016 - Lockheed Martin">
                016 - Lockheed Martin
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Matter<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.matter}
              onChange={(e) => handleInputChange("matter", e.target.value)}
            >
              <option value="">Select Matter</option>
              <option value="Contract Negotiation">Contract Negotiation</option>
              <option value="Compliance Review">Compliance Review</option>
              <option value="Litigation Support">Litigation Support</option>
            </select>
          </div>
        </div>

        {/* Row - Timekeeper and Date */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timekeeper<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.timekeeper}
              onChange={(e) => handleInputChange("timekeeper", e.target.value)}
            >
              <option value="">Select Timekeeper</option>
              <option value="John Smith">John Smith</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Michael Brown">Michael Brown</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                placeholder="MM/DD/YYYY"
              />
              <Calendar
                className="absolute right-3 top-3 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Row - Phase Task & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phase Task<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phaseTask}
              onChange={(e) => handleInputChange("phaseTask", e.target.value)}
            >
              <option value="">Select Phase Task</option>
              {Object.keys(phaseTaskActivityPairs).map((phaseTask) => (
                <option key={phaseTask} value={phaseTask}>
                  {phaseTask}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.activity}
              onChange={(e) => handleInputChange("activity", e.target.value)}
              disabled={!formData.phaseTask}
            >
              <option value="">Select Activity</option>
              {Object.keys(currentActivities).map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reference ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reference ID
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            value={formData.referenceId}
            readOnly
            placeholder="Auto-generated based on Phase Task & Activity"
          />
        </div>

        {/* Row - Type + Hours Worked + Hours Billed + Currency + Rate + Total */}
        <div className="grid grid-cols-6 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            >
              <option value="Fee">Fee</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours Worked<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.hoursWorked}
              onChange={(e) => handleInputChange("hoursWorked", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours Billed<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.hoursBilled}
              onChange={(e) => handleInputChange("hoursBilled", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
            >
              <option value="">Select</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.rate}
              onChange={(e) => handleInputChange("rate", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              value={formData.total}
              readOnly
            />
          </div>
        </div>

        {/* Narrative */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Narrative
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-16 resize-none"
            value={formData.narrative}
            onChange={(e) => handleInputChange("narrative", e.target.value)}
            placeholder="Enter description of work performed..."
          />
        </div>

        {/* Bill Code and Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bill Code
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.billCode}
              onChange={(e) => handleInputChange("billCode", e.target.value)}
            >
              <option value="Billable">Billable</option>
              <option value="Non-Billable">Non-Billable</option>
              <option value="Pro Bono">Pro Bono</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <option value="Invoice">Invoice</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Reference ID Summary */}
        {formData.referenceId && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">
                Auto-Generated Reference ID:
              </span>
              <span className="text-sm font-mono text-blue-900 bg-white px-2 py-1 rounded">
                {formData.referenceId}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimekeeperForm;
