import React, { useState } from "react";

const RefDataMgt = () => {
  const [phaseTask, setPhaseTask] = useState("PA-100 Assessment");
  const [activity, setActivity] = useState("A-101 Plan");

  return (
    <div className="h-screen bg-blue-50 flex flex-col items-center justify-start py-10 px-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-10">
        Reference Data Management
      </h1>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg px-10 py-8 w-full max-w-lg">
        {/* Client and Matter Info */}
        <div className="mb-6 text-gray-700 text-sm leading-relaxed">
          <p>
            <span className="font-semibold">Client:</span> 014 - General
            Dynamics
          </p>
          <p>
            <span className="font-semibold">Matter:</span> 03S - Methods
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Ref. ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ref. ID
            </label>
            <input
              type="text"
              value="G-100"
              readOnly
              className="w-full px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md cursor-not-allowed"
            />
          </div>

          {/* Phase Task */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phase Task
            </label>
            <select
              value={phaseTask}
              onChange={(e) => setPhaseTask(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>PA-100 Assessment</option>
              <option>PA-200 Review</option>
              <option>PA-300 Execution</option>
            </select>
          </div>

          {/* Activity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>A-101 Plan</option>
              <option>A-102 Execute</option>
              <option>A-103 Close</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            >
              Insert Reference ID
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefDataMgt;
